export interface FindLendeesAdmQuery {
  searchKeyword?: string;
  status?: string;
  offset?: {
    offset?: number;
    limit?: number;
  };
}