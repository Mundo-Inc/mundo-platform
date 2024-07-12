export interface CustomError extends Error {
  statusCode?: number;
  data?: any;
}

export async function handleResponseError(response: Response) {
  try {
    const contentType = response.headers.get("Content-Type") || "";

    let errorMessage: string;
    if (contentType.includes("application/json")) {
      const errorData = await response.json();
      errorMessage = errorData.error?.message || "Unknown error occurred";
    } else {
      errorMessage = await response.text();
    }

    return new Error(`${response.status} - ${errorMessage}`);
  } catch (error) {
    return new Error(`${response.status} - ${response.statusText}`);
  }
}
