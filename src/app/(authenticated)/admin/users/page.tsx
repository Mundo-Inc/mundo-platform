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
import DataTable from "@/components/dataTable";

export default function Page() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

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

      <DataTable table={table} isPending={isPending} columns={columns} />
    </DashboardMainContent>
  );
}
