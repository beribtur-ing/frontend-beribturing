import {OffsetQueryRequest, ProductCategoryRdo} from "~/models";

export interface FindProductCategoryRdosAdmQuery extends OffsetQueryRequest<ProductCategoryRdo[]>{
  searchKeyword?: string;
}
