interface PaginatedResponse<T> {
  content: T[];
  currentPage: 1;
  hasNext: boolean;
  payloadSize: number;
  skippedRecords: number;
  totalPages: number;
  totalRecords: number;
}

export default PaginatedResponse;
