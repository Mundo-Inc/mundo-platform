import { type PaginationState } from "@tanstack/react-table";
import { cache } from "react";

import type { AuthUser, IAdminUser } from "@/interfaces/User";
import { fetchWithToken } from "@/lib/fetcher";
import env from "@env";

export const adminFetchUsers = cache(async (pagination: PaginationState) => {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/users`);
  url.searchParams.set("page", (pagination.pageIndex + 1).toString());
  url.searchParams.set("limit", pagination.pageSize.toString());

  const data = await fetchWithToken<IAdminUser[]>(url.href);

  return data.data;
});

export const adminFetchBots = cache(async (pagination: PaginationState) => {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/bots`);
  url.searchParams.set("page", (pagination.pageIndex + 1).toString());
  url.searchParams.set("limit", pagination.pageSize.toString());

  const data = await fetchWithToken<IAdminUser[]>(url.href);

  return data.data;
});

export const adminFetchBot = cache(async (id: string) => {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/bots/${id}`);

  const data = await fetchWithToken<IAdminUser[]>(url.href);

  return data.data;
});

export const getCurrentUser = cache(async () => {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/users/me`);

  const data = await fetchWithToken<AuthUser>(url.href).catch(() => ({
    data: null,
  }));

  return data.data;
});
