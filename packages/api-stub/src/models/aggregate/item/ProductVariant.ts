import { DomainEntity } from '~/models/core';
import { Price, Size, ProductAvailability } from './vo';

export interface ProductVariant extends DomainEntity {
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
  imageSequence: number;
  notes?: string; // Optional extra info
}
