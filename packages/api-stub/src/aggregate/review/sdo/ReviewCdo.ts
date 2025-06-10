import { CreationDataObject } from '../../../core';

export interface ReviewCdo extends CreationDataObject {
  reviewerId: string;
  reviewedId: string;
  rating: number;
  comment: string;
  createdAt: Date;
} 