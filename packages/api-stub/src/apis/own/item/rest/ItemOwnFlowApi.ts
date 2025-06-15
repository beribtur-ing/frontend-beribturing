import {
  RegisterProductOwnCommand,
  ModifyProductOwnCommand,
  RemoveProductOwnCommand,
  ModifyProductImageOwnCommand,
  RemoveProductImageOwnCommand,
  RegisterProductVariantOwnCommand,
  ModifyProductVariantOwnCommand,
  RemoveProductVariantOwnCommand
} from '~/apis';
import { CommandResponse, ProductOwnRegCdo, NameValueList, ProductVariantRegCdo } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/owner/item/${path}`;

// Product Commands
const registerProduct = (variables: {
  productOwnRegCdo: ProductOwnRegCdo;
}) => {
  const command = <RegisterProductOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('register-product/command'), command);
};

const modifyProduct = (variables: {
  productId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('modify-product/command'), command);
};

const removeProduct = (variables: {
  productId: string;
}) => {
  const command = <RemoveProductOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('remove-product/command'), command);
};

// Product Image Commands
const modifyProductImage = (variables: {
  imageId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductImageOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('modify-product-image/command'), command);
};

const removeProductImage = (variables: {
  imageId: string;
}) => {
  const command = <RemoveProductImageOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('remove-product-image/command'), command);
};

// Product Variant Commands
const registerProductVariant = (variables: {
  productVariantRegCdo: ProductVariantRegCdo;
}, images?: File[]) => {
  const command = <RegisterProductVariantOwnCommand>{...variables};
  const formData = new FormData();
  formData.append('command', JSON.stringify(command));
  if (images) {
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  }
  return axios.post<CommandResponse<string>>(url('register-product-variant/command'), formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

const modifyProductVariant = (variables: {
  variantId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyProductVariantOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('modify-product-variant/command'), command);
};

const removeProductVariant = (variables: {
  variantId: string;
}) => {
  const command = <RemoveProductVariantOwnCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('remove-product-variant/command'), command);
};

export default {
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