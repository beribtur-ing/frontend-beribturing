import {
  FindProductCategoryAdmQuery,
  FindProductAdmQuery,
  FindProductImageAdmQuery,
  FindProductVariantAdmQuery
} from '~/apis';
import { QueryResponse, ProductCategory, Product, ProductImage, ProductVariant, FirstParameter } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/admin/item/${path}`;

const findProductCategory = (variables: {
  categoryId: string;
}) => {
  const query = <FindProductCategoryAdmQuery>{...variables};
  return axios.post<QueryResponse<ProductCategory>>(url('/find-product-category/query'), query);
};

const findProduct = (variables: {
  productId: string;
}) => {
  const query = <FindProductAdmQuery>{...variables};
  return axios.post<QueryResponse<Product>>(url('/find-product/query'), query);
};

const findProductImage = (variables: {
  imageId: string;
}) => {
  const query = <FindProductImageAdmQuery>{...variables};
  return axios.post<QueryResponse<ProductImage>>(url('/find-product-image/query'), query);
};

const findProductVariant = (variables: {
  variantId: string;
}) => {
  const query = <FindProductVariantAdmQuery>{...variables};
  return axios.post<QueryResponse<ProductVariant>>(url('/find-product-variant/query'), query);
};

export default {
  findProductCategory,
  findProduct,
  findProductImage,
  findProductVariant,

  query: {
    findProductCategory: (params: FirstParameter<typeof findProductCategory>) => ({
      queryKey: ['feature/admin/item', 'findProductCategory', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findProductCategory(queryKey.slice().pop()))?.data,
    }),
    findProduct: (params: FirstParameter<typeof findProduct>) => ({
      queryKey: ['feature/admin/item', 'findProduct', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findProduct(queryKey.slice().pop()))?.data,
    }),
    findProductImage: (params: FirstParameter<typeof findProductImage>) => ({
      queryKey: ['feature/admin/item', 'findProductImage', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findProductImage(queryKey.slice().pop()))?.data,
    }),
    findProductVariant: (params: FirstParameter<typeof findProductVariant>) => ({
      queryKey: ['feature/admin/item', 'findProductVariant', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findProductVariant(queryKey.slice().pop()))?.data,
    }),
  }
};
