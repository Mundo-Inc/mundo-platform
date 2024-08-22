import { type APIResponse } from "@/interfaces/APIResponse";
import { auth } from "../firebase/config";
import { handleResponseError } from "./errors";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: BodyInit | null;
};

export async function fetchWithToken<T>(url: string, options?: RequestOptions) {
  const token = await auth.currentUser?.getIdToken();

  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  const res = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: options?.body,
  });

  if (!res.ok) {
    throw await handleResponseError(res);
  }

  const data: APIResponse<T> = await res.json().catch(() => res);

  return data;
}

export async function fetchWithOptionalToken<T>(
  url: string,
  options?: RequestOptions,
) {
  const token = await auth.currentUser?.getIdToken();

  const res = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: token,
      }),
    },
    body: options?.body,
  });

  if (!res.ok) {
    throw await handleResponseError(res);
  }

  const data: APIResponse<T> = await res.json().catch(() => res);

  return data;
}

export async function fetchWithoutToken<T>(
  url: string,
  options?: RequestOptions,
) {
  const res = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body,
  });

  if (!res.ok) {
    throw await handleResponseError(res);
  }

  const data: APIResponse<T> = await res.json().catch(() => res);

  return data;
}
