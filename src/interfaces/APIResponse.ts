export interface APIResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    totalCount: number;
    page: number;
    limit: number;
  };
}
