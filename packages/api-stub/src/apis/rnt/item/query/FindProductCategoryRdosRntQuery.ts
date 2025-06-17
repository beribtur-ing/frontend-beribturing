import {OffsetQueryRequest, ProductCategoryRdo} from "~/models";

export interface FindProductCategoryRdosRntQuery extends OffsetQueryRequest<ProductCategoryRdo[]> {
  searchKeyword?: string;
}
