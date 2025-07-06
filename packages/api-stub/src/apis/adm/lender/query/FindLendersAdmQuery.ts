export interface FindLendersAdmQuery {
  searchKeyword?: string;
  status?: string;
  offset?: {
    offset?: number;
    limit?: number;
  };
}