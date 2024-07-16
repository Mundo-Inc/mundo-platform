"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import DashboardMainContent from "@/components/dashboardMainContent";
import DataTable from "@/components/dataTable";
import { adminGetAllRedemptions } from "@/fetchers/missions";
import { columns } from "./columns";

export default function Page() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const { isPending, data } = useQuery({
    queryKey: [
      "rewards",
      "prizes",
      {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      },
    ],
    queryFn: () => adminGetAllRedemptions(pagination),
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
      <h1 className="flex h-9 shrink-0 items-center text-xl font-bold">
        Redemption Inquiries (WIP)
      </h1>
      <DataTable table={table} isPending={isPending} columns={columns} />
    </DashboardMainContent>
  );
}
