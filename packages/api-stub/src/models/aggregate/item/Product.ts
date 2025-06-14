import { DomainEntity } from '~/models/core';

export interface Product extends DomainEntity {
  ownerId: string; // Reference to User (Lender)
  title: string;
  description: string;
  categoryId: string; // Reference to ProductCategory
  variantSequence: number;
}
