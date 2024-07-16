import { type PaginationState } from "@tanstack/react-table";

import { fetchWithToken } from "@/lib/fetcher";
import env from "@env";

export async function getFlags(pagination: PaginationState) {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/flags`);
  url.searchParams.set("page", (pagination.pageIndex + 1).toString());
  url.searchParams.set("limit", pagination.pageSize.toString());

  const data = await fetchWithToken<any[]>(url.href);

  return data;
}

export async function resovleFlag(
  id: string,
  action: "DELETE" | "IGNORE",
  note?: string | null,
) {
  const url = new URL(`${env.NEXT_PUBLIC_API_URL}/admin/flags/${id}`);

  const data = await fetchWithToken(url.href, {
    method: "POST",
    body: JSON.stringify({
      action,
      note,
    }),
  });

  return data;
}
