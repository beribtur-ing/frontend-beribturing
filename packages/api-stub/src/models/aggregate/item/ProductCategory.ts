import { DomainEntity } from '~/models/core';

export interface ProductCategory extends DomainEntity {
  name: string;
  description: string;
  iconUrl?: string;
  parentId?: string; // Reference to parent category, if any
  active: boolean;
}
