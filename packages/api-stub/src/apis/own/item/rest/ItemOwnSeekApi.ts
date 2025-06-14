import {
  FindProductCategoryOwnQuery,
  FindProductOwnQuery,
  FindProductImageOwnQuery,
  FindProductVariantOwnQuery
} from '~/apis';
import { QueryResponse, ProductCategory, Product, ProductImage, ProductVariant, FirstParameter } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/owner/item/${path}`;

const findProductCategory = (variables: {
  categoryId: string;
}) => {
  const query = <FindProductCategoryOwnQuery>{...variables};
  return axios.post<QueryResponse<ProductCategory>>(url('/find-product-category/query'), query);
};

const findProduct = (variables: {
  productId: string;
}) => {
  const query = <FindProductOwnQuery>{...variables};
  return axios.post<QueryResponse<Product>>(url('/find-product/query'), query);
};

const findProductImage = (variables: {
  imageId: string;
}) => {
  const query = <FindProductImageOwnQuery>{...variables};
  return axios.post<QueryResponse<ProductImage>>(url('/find-product-image/query'), query);
};

const findProductVariant = (variables: {
  variantId: string;
}) => {
  const query = <FindProductVariantOwnQuery>{...variables};
  return axios.post<QueryResponse<ProductVariant>>(url('/find-product-variant/query'), query);
};

export default {
  findProductCategory,
  findProduct,
  findProductImage,
  findProductVariant,

  query: {
    findProductCategory: (params: FirstParameter<typeof findProductCategory>) => ({
      queryKey: ['feature/owner/item', 'findProductCategory', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findProductCategory(queryKey.slice().pop()))?.data,
    }),
    findProduct: (params: FirstParameter<typeof findProduct>) => ({
      queryKey: ['feature/owner/item', 'findProduct', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findProduct(queryKey.slice().pop()))?.data,
    }),
    findProductImage: (params: FirstParameter<typeof findProductImage>) => ({
      queryKey: ['feature/owner/item', 'findProductImage', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findProductImage(queryKey.slice().pop()))?.data,
    }),
    findProductVariant: (params: FirstParameter<typeof findProductVariant>) => ({
      queryKey: ['feature/owner/item', 'findProductVariant', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findProductVariant(queryKey.slice().pop()))?.data,
    }),
  }
};