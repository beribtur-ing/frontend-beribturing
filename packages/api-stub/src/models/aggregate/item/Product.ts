import { DomainEntity } from '~/models/core';
import { Lender, ProductCategory, ProductVariant } from '~/models';

export interface Product extends DomainEntity {
  ownerId: string; // Reference to User (Lender)
  title: string;
  description: string;
  active: boolean;
  categoryId: string; // Reference to ProductCategory
  variantSequence: number;
  owner: Lender;
  category: ProductCategory;
  variants: ProductVariant[];
}
