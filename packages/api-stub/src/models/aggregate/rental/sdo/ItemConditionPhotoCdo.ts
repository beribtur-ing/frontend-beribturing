import { CreationDataObject } from '~/models';

export interface ItemConditionPhotoCdo extends CreationDataObject {
  checkId: string;
  url: string;
  photoSequence: number;
}
