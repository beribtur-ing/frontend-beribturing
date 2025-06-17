import {
  FindProductCategoryRdoAdmQuery,
  FindProductCategoryRdosAdmQuery,
  FindProductRdoAdmQuery,
  FindProductRdosAdmQuery
} from '~/apis';
import {QueryResponse, ProductCategoryRdo, ProductRdo, FirstParameter, PriceUnit, Offset} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/item/${path}`;

// Product Category Queries
const findProductCategoryRdos = (variables: {
  searchKeyword?: string;
  offset?: Offset;
}) => {
  const query = <FindProductCategoryRdosAdmQuery>{...variables};
  return axios.post<QueryResponse<ProductCategoryRdo[]>>(url('find-product-category-rdos/query'), query);
};

const findProductCategoryRdo = (variables: {
  categoryId: string;
}) => {
  const query = <FindProductCategoryRdoAdmQuery>{...variables};
  return axios.post<QueryResponse<ProductCategoryRdo>>(url('find-product-category-rdo/query'), query);
};

// Product Queries
const findProductRdos = (variables: {
  searchKeyword?: string;
  ownerIds?: string[];
  categoryIds?: string[];
  brands?: string[];
  models?: string[];
  manufacturers?: string[];
  colors?: string[];
  materials?: string[];
  madeInCountries?: string[];
  producedYears?: string[];
  minPrice?: number;
  maxPrice?: number;
  priceUnit?: PriceUnit;
  active?: boolean;
  availableFrom?: string;
  availableUntil?: string;
  isAvailable?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;
  hasImages?: boolean;
  hasVariants?: boolean;
  offset?: Offset;
}) => {
  const query = <FindProductRdosAdmQuery>{...variables};
  return axios.post<QueryResponse<ProductRdo[]>>(url('find-product-rdos/query'), query);
};

const findProductRdo = (variables: {
  productId: string;
}) => {
  const query = <FindProductRdoAdmQuery>{...variables};
  return axios.post<QueryResponse<ProductRdo>>(url('find-product-rdo/query'), query);
};

export default {
  // Product Category queries
  findProductCategoryRdos,
  findProductCategoryRdo,

  // Product queries
  findProductRdos,
  findProductRdo,

  query: {
    // Product Category query keys
    findProductCategoryRdos: (params: FirstParameter<typeof findProductCategoryRdos>) => ({
      queryKey: ['feature/admin/item', 'findProductCategoryRdos', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductCategoryRdos(queryKey.slice().pop()))?.data,
    }),

    findProductCategoryRdo: (params: FirstParameter<typeof findProductCategoryRdo>) => ({
      queryKey: ['feature/admin/item', 'findProductCategoryRdo', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductCategoryRdo(queryKey.slice().pop()))?.data,
    }),

    // Product query keys
    findProductRdos: (params: FirstParameter<typeof findProductRdos>) => ({
      queryKey: ['feature/admin/item', 'findProductRdos', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductRdos(queryKey.slice().pop()))?.data,
    }),

    findProductRdo: (params: FirstParameter<typeof findProductRdo>) => ({
      queryKey: ['feature/admin/item', 'findProductRdo', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductRdo(queryKey.slice().pop()))?.data,
    }),
  }
};
