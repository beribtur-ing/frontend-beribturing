import {
  RegisterProductCategoryAdmCommand,
  ModifyProductCategoryAdmCommand,
  RemoveProductCategoryAdmCommand,
  RegisterProductAdmCommand,
  ModifyProductAdmCommand,
  RemoveProductAdmCommand,
  ModifyProductImageAdmCommand,
  RemoveProductImageAdmCommand,
  RegisterProductVariantAdmCommand,
  ModifyProductVariantAdmCommand,
  RemoveProductVariantAdmCommand,
} from '~/apis';
import { CommandResponse, ProductCategoryRegCdo, ProductAdmRegCdo, NameValueList, ProductVariantRegCdo } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/item/${path}`;

// Product Category Commands
const registerProductCategory = (variables: {
  productCategoryRegCdo: ProductCategoryRegCdo;
}) => {
  const command = <RegisterProductCategoryAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('register-product-category/command'), command);
};

const modifyProductCategory = (variables: {
  categoryId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductCategoryAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('modify-product-category/command'), command);
};

const removeProductCategory = (variables: {
  categoryId: string;
}) => {
  const command = <RemoveProductCategoryAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('remove-product-category/command'), command);
};

// Product Commands
const registerProduct = (variables: {
  productAdmRegCdo: ProductAdmRegCdo;
}) => {
  const command = <RegisterProductAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('register-product/command'), command);
};

const modifyProduct = (variables: {
  productId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('modify-product/command'), command);
};

const removeProduct = (variables: {
  productId: string;
}) => {
  const command = <RemoveProductAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('remove-product/command'), command);
};

// Product Image Commands
const modifyProductImage = (variables: {
  imageId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductImageAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('modify-product-image/command'), command);
};

const removeProductImage = (variables: {
  imageId: string;
}) => {
  const command = <RemoveProductImageAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('remove-product-image/command'), command);
};

// Product Variant Commands
const registerProductVariant = (variables: {
  productVariantRegCdo: ProductVariantRegCdo;
}, images?: File[]) => {
  const command = <RegisterProductVariantAdmCommand>{ ...variables };
  const formData = new FormData();
  formData.append('command', JSON.stringify(command));
  if (images) {
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  }
  return axios.post<CommandResponse<string>>(url('register-product-variant/command'), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const modifyProductVariant = (variables: {
  variantId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductVariantAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('modify-product-variant/command'), command);
};

const removeProductVariant = (variables: {
  variantId: string;
}) => {
  const command = <RemoveProductVariantAdmCommand>{ ...variables };
  return axios.post<CommandResponse<string>>(url('remove-product-variant/command'), command);
};

export default {
  // Product Category commands
  registerProductCategory,
  modifyProductCategory,
  removeProductCategory,
  
  // Product commands
  registerProduct,
  modifyProduct,
  removeProduct,
  
  // Product Image commands
  modifyProductImage,
  removeProductImage,
  
  // Product Variant commands
  registerProductVariant,
  modifyProductVariant,
  removeProductVariant,
};