export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
};