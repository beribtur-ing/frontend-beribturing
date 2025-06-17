import {
  FindProductCategoryRdoOwnQuery,
  FindProductCategoryRdosOwnQuery,
  FindProductRdoOwnQuery,
  FindProductRdosOwnQuery
} from '~/apis';
import {QueryResponse, ProductCategoryRdo, ProductRdo, FirstParameter, Offset} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/owner/item/${path}`;

// Product Category Queries
const findProductCategoryRdos = (variables: {
  searchKeyword?: string;
  offset?: Offset;
}) => {
  const query = <FindProductCategoryRdosOwnQuery>{...variables};
  return axios.post<QueryResponse<ProductCategoryRdo[]>>(url('find-product-category-rdos/query'), query);
};

const findProductCategoryRdo = (variables: {
  categoryId: string;
}) => {
  const query = <FindProductCategoryRdoOwnQuery>{...variables};
  return axios.post<QueryResponse<ProductCategoryRdo>>(url('find-product-category-rdo/query'), query);
};

// Product Queries
const findProductRdos = (variables: {
  searchKeyword?: string;
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
  const query = <FindProductRdosOwnQuery>{...variables};
  return axios.post<QueryResponse<ProductRdo[]>>(url('find-product-rdos/query'), query);
};

const findProductRdo = (variables: {
  productId: string;
}) => {
  const query = <FindProductRdoOwnQuery>{...variables};
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
      queryKey: ['feature/owner/item', 'findProductCategoryRdos', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductCategoryRdos(queryKey.slice().pop()))?.data,
    }),

    findProductCategoryRdo: (params: FirstParameter<typeof findProductCategoryRdo>) => ({
      queryKey: ['feature/owner/item', 'findProductCategoryRdo', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductCategoryRdo(queryKey.slice().pop()))?.data,
    }),

    // Product query keys
    findProductRdos: (params: FirstParameter<typeof findProductRdos>) => ({
      queryKey: ['feature/owner/item', 'findProductRdos', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductRdos(queryKey.slice().pop()))?.data,
    }),

    findProductRdo: (params: FirstParameter<typeof findProductRdo>) => ({
      queryKey: ['feature/owner/item', 'findProductRdo', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductRdo(queryKey.slice().pop()))?.data,
    }),
  }
};
