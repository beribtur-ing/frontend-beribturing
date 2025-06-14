import {
  RegisterProductCategoryOwnCommand,
  ModifyProductCategoryOwnCommand,
  RemoveProductCategoryOwnCommand,
  RegisterProductOwnCommand,
  ModifyProductOwnCommand,
  RemoveProductOwnCommand,
  RegisterProductImageOwnCommand,
  ModifyProductImageOwnCommand,
  RemoveProductImageOwnCommand,
  RegisterProductVariantOwnCommand,
  ModifyProductVariantOwnCommand,
  RemoveProductVariantOwnCommand
} from '~/apis';
import { CommandResponse, ProductCategoryCdo, ProductCdo, ProductImageCdo, ProductVariantCdo, NameValueList } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/owner/item/${path}`;

const registerProductCategory = (variables: {
  productCategoryCdo: ProductCategoryCdo;
}) => {
  const command = <RegisterProductCategoryOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-product-category/command'), command);
};

const modifyProductCategory = (variables: {
  categoryId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductCategoryOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-product-category/command'), command);
};

const removeProductCategory = (variables: {
  categoryId: string;
}) => {
  const command = <RemoveProductCategoryOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-product-category/command'), command);
};

const registerProduct = (variables: {
  productCdo: ProductCdo;
}) => {
  const command = <RegisterProductOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-product/command'), command);
};

const modifyProduct = (variables: {
  productId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-product/command'), command);
};

const removeProduct = (variables: {
  productId: string;
}) => {
  const command = <RemoveProductOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-product/command'), command);
};

const registerProductImage = (variables: {
  productImageCdo: ProductImageCdo;
}) => {
  const command = <RegisterProductImageOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-product-image/command'), command);
};

const modifyProductImage = (variables: {
  imageId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductImageOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-product-image/command'), command);
};

const removeProductImage = (variables: {
  imageId: string;
}) => {
  const command = <RemoveProductImageOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-product-image/command'), command);
};

const registerProductVariant = (variables: {
  productVariantCdo: ProductVariantCdo;
}) => {
  const command = <RegisterProductVariantOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-product-variant/command'), command);
};

const modifyProductVariant = (variables: {
  variantId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductVariantOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-product-variant/command'), command);
};

const removeProductVariant = (variables: {
  variantId: string;
}) => {
  const command = <RemoveProductVariantOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-product-variant/command'), command);
};

export default {
  registerProductCategory,
  modifyProductCategory,
  removeProductCategory,
  registerProduct,
  modifyProduct,
  removeProduct,
  registerProductImage,
  modifyProductImage,
  removeProductImage,
  registerProductVariant,
  modifyProductVariant,
  removeProductVariant,
};