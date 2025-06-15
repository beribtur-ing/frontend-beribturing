export interface FindProductRdosRntQuery {
  searchKeyword?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  lenderId?: string;
  availability?: string;
  offset?: number;
  limit?: number;
}