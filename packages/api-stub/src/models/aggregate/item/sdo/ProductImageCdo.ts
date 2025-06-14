import { CreationDataObject } from '~/models/core';

export interface ProductImageCdo extends CreationDataObject {
  variantId: string; // Reference to the product variant this image belongs to
  url: string;
  order: number;
  sequence: number;
}