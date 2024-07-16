import type { PaginationState } from "@tanstack/react-table";

import type { IPrize } from "@/interfaces/Prize";
import type { IPrizeRedemption } from "@/interfaces/redemption";
import { fetchWithToken } from "@/lib/fetcher";
import env from "@env";

export async function adminGetAllRedemptions(pagination: PaginationState) {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/rewards/redemptions/all`);
  url.searchParams.set("page", (pagination.pageIndex + 1).toString());
  url.searchParams.set("limit", pagination.pageSize.toString());

  const data = await fetchWithToken<IPrizeRedemption[]>(url.href);

  return data;
}

export async function getAllMissions(pagination: PaginationState) {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/rewards/missions/all`);
  url.searchParams.set("page", (pagination.pageIndex + 1).toString());
  url.searchParams.set("limit", pagination.pageSize.toString());

  const data = await fetchWithToken(url.href);

  return data;
}

export async function getPrizes(pagination: PaginationState) {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/rewards/prizes`);
  url.searchParams.set("page", (pagination.pageIndex + 1).toString());
  url.searchParams.set("limit", pagination.pageSize.toString());

  const data = await fetchWithToken<IPrize[]>(url.href);

  return data;
}
