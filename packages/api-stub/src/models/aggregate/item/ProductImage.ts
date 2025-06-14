import { DomainEntity } from '~/models/core';

export interface ProductImage extends DomainEntity {
  variantId: string; // Reference to the product variant this image belongs to
  url: string;
  order: number;
}
