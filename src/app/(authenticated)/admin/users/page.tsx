"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import DashboardMainContent from "@/components/dashboardMainContent";
import DataTablePagination from "@/components/dataTablePagination";
import Spinner from "@/components/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminFetchUsers } from "@/fetchers/users";
import { columns } from "./columns";

export default function Page() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const [selected, setSelected] = useState(false);

  const { isPending, isError, error, data } = useQuery({
    queryKey: [
      "admin",
      "users",
      {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      },
    ],
    queryFn: () => adminFetchUsers(pagination),
    placeholderData: keepPreviousData,
  });

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data?.data ?? defaultData,
    columns,
    rowCount: data?.pagination?.totalCount ?? 0,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    columnResizeMode: "onChange",
  });

  return (
    <DashboardMainContent className="gap-y-4 p-4">
      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <DataTablePagination
        className="w-full justify-end"
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        nextPage={table.nextPage}
        pageCount={table.getPageCount()}
        pageIndex={pagination.pageIndex}
        previousPage={table.previousPage}
        setPageIndex={table.setPageIndex}
      />

      <Separator orientation="horizontal" />

      <Table
        isLoading={isPending}
        loadingComponent={
          <div className="absolute inset-0 flex size-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  rowSpan={header.rowSpan}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DashboardMainContent>
  );
}
