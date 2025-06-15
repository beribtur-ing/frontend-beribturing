import { DomainEntity } from '~/models/core';

export interface Product extends DomainEntity {
  ownerId: string; // Reference to User (Lender)
  title: string;
  description: string;
  active: boolean;
  categoryId: string; // Reference to ProductCategory
  variantSequence: number;
}
