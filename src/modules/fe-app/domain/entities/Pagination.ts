export interface PaginationItems<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  cached?: boolean;
  status: string;
  message: string;
}
export interface PaginationParams {
  page: number;
  pageSize: number;
  securityState?: string;
  type?: string;
  search?: string;
}
