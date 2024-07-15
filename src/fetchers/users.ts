import { type PaginationState } from "@tanstack/react-table";

import env from "@env";
import { IAdminUser } from "@/interfaces/User";
import { fetchWithToken } from "@/lib/fetcher";

export async function adminFetchUsers(pagination: PaginationState) {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/users`);
  url.searchParams.set("page", (pagination.pageIndex + 1).toString());
  url.searchParams.set("limit", pagination.pageSize.toString());

  const data = await fetchWithToken<IAdminUser[]>(url.href);

  return data;
}

export async function adminFetchBots(page: number, limit: number) {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/users`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("signupMethod", "bot");

  const data = await fetchWithToken(url.href);

  return data;
}

export async function adminFetchBot(id: string) {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/bots/${id}`);

  const data = await fetchWithToken(url.href);

  return data;
}
