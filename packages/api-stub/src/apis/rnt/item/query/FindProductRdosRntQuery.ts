import {OffsetQueryRequest, ProductRdo} from "~/models";

export interface FindProductRdosRntQuery extends OffsetQueryRequest<ProductRdo[]>{
  searchKeyword?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  lenderId?: string;
  availability?: string;
}
