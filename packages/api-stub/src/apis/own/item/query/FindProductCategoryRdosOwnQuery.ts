import {OffsetQueryRequest, ProductCategoryRdo} from "~/models";

export interface FindProductCategoryRdosOwnQuery extends OffsetQueryRequest<ProductCategoryRdo[]> {
  searchKeyword?: string;
}
