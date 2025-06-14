import { CreationDataObject } from '~/models/core';
import { Price, Size, ProductAvailability } from '../vo';

export interface ProductVariantCdo extends CreationDataObject {
  productId: string;
  price?: Price;
  size?: Size; // For clothing/accessories
  color?: string;
  brand?: string;
  model?: string;
  manufacturer?: string;
  madeIn?: string; // country
  producedYear?: string;
  material?: string;
  manual?: string;
  availability?: ProductAvailability;
  active: boolean;
  sequence: number;
}