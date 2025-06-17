import {
  FindProductCategoryRdosRntQuery,
  FindProductCategoryRdoRntQuery,
  FindProductRdosRntQuery,
  FindProductRdoRntQuery
} from '~/apis';
import {QueryResponse, ProductCategoryRdo, ProductRdo, FirstParameter, Offset} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/rnt/item/${path}`;

// Product Category Queries
const findProductCategoryRdos = (variables: {
  searchKeyword?: string;
  offset?: Offset;
}) => {
  const query = <FindProductCategoryRdosRntQuery>{...variables};
  return axios.post<QueryResponse<ProductCategoryRdo[]>>(url('find-product-category-rdos/query'), query);
};

const findProductCategoryRdo = (variables: {
  categoryId: string;
}) => {
  const query = <FindProductCategoryRdoRntQuery>{...variables};
  return axios.post<QueryResponse<ProductCategoryRdo>>(url('find-product-category-rdo/query'), query);
};

// Product Queries
const findProductRdos = (variables: {
  searchKeyword?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  lenderId?: string;
  availability?: string;
  offset?: Offset;
}) => {
  const query = <FindProductRdosRntQuery>{...variables};
  return axios.post<QueryResponse<ProductRdo[]>>(url('find-product-rdos/query'), query);
};

const findProductRdo = (variables: {
  productId: string;
}) => {
  const query = <FindProductRdoRntQuery>{...variables};
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
      queryKey: ['feature/rnt/item', 'findProductCategoryRdos', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductCategoryRdos(queryKey.slice().pop()))?.data,
    }),

    findProductCategoryRdo: (params: FirstParameter<typeof findProductCategoryRdo>) => ({
      queryKey: ['feature/rnt/item', 'findProductCategoryRdo', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductCategoryRdo(queryKey.slice().pop()))?.data,
    }),

    // Product query keys
    findProductRdos: (params: FirstParameter<typeof findProductRdos>) => ({
      queryKey: ['feature/rnt/item', 'findProductRdos', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductRdos(queryKey.slice().pop()))?.data,
    }),

    findProductRdo: (params: FirstParameter<typeof findProductRdo>) => ({
      queryKey: ['feature/rnt/item', 'findProductRdo', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) =>
        (await findProductRdo(queryKey.slice().pop()))?.data,
    }),
  }
};
