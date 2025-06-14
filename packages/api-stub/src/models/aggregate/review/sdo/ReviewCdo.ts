import { CreationDataObject } from '~/models';

export interface ReviewCdo extends CreationDataObject {
  reviewerId: string;
  rating: number;
  comment: string;
  recordId: string;
}
