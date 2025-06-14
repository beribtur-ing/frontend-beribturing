import { CreationDataObject } from '~/models/core';

export interface ProductCdo extends CreationDataObject {
  ownerId: string; // Reference to User (Lender)
  title: string;
  description: string;
  categoryId: string; // Reference to ProductCategory
  sequence: number;
}