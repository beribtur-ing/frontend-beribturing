import { CreationDataObject } from '~/models/core';

export interface ProductCategoryCdo extends CreationDataObject {
  name: string;
  description: string;
  iconUrl?: string;
  parentId?: string; // Reference to parent category, if any
}