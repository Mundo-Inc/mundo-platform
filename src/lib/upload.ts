import { auth } from "@/firebase/config";
import { APIResponse } from "@/interfaces/APIResponse";
import env from "@env";
import { handleResponseError } from "./errors";

type UseCase = "prize" | "review";

export async function uploadImage(file: File, usecase: UseCase) {
  const formData = new FormData();
  formData.append("usecase", usecase);
  formData.append("image", file);

  const token = await auth.currentUser?.getIdToken();

  if (!token) {
    throw new Error("Unauthorized - No token found");
  }

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/upload/`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  if (!res.ok) {
    throw await handleResponseError(res);
  }

  const data: APIResponse<{
    _id: string;
    src: string;
    caption: string;
    type: "image" | "video";
  }> = await res.json();
  return data;
}
