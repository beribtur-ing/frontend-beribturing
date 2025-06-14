import {
  RegisterProductCategoryAdmCommand,
  ModifyProductCategoryAdmCommand,
  RemoveProductCategoryAdmCommand,
  RegisterProductAdmCommand,
  ModifyProductAdmCommand,
  RemoveProductAdmCommand,
  RegisterProductImageAdmCommand,
  ModifyProductImageAdmCommand,
  RemoveProductImageAdmCommand,
  RegisterProductVariantAdmCommand,
  ModifyProductVariantAdmCommand,
  RemoveProductVariantAdmCommand
} from '~/apis';
import { CommandResponse, ProductCategoryCdo, ProductCdo, ProductImageCdo, ProductVariantCdo, NameValueList } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/admin/item/${path}`;

const registerProductCategory = (variables: {
  productCategoryCdo: ProductCategoryCdo;
}) => {
  const command = <RegisterProductCategoryAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-product-category/command'), command);
};

const modifyProductCategory = (variables: {
  categoryId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductCategoryAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-product-category/command'), command);
};

const removeProductCategory = (variables: {
  categoryId: string;
}) => {
  const command = <RemoveProductCategoryAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-product-category/command'), command);
};

const registerProduct = (variables: {
  productCdo: ProductCdo;
}) => {
  const command = <RegisterProductAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-product/command'), command);
};

const modifyProduct = (variables: {
  productId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-product/command'), command);
};

const removeProduct = (variables: {
  productId: string;
}) => {
  const command = <RemoveProductAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-product/command'), command);
};

const registerProductImage = (variables: {
  productImageCdo: ProductImageCdo;
}) => {
  const command = <RegisterProductImageAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-product-image/command'), command);
};

const modifyProductImage = (variables: {
  imageId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductImageAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-product-image/command'), command);
};

const removeProductImage = (variables: {
  imageId: string;
}) => {
  const command = <RemoveProductImageAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-product-image/command'), command);
};

const registerProductVariant = (variables: {
  productVariantCdo: ProductVariantCdo;
}) => {
  const command = <RegisterProductVariantAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-product-variant/command'), command);
};

const modifyProductVariant = (variables: {
  variantId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductVariantAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-product-variant/command'), command);
};

const removeProductVariant = (variables: {
  variantId: string;
}) => {
  const command = <RemoveProductVariantAdmCommand>{...variables};
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
