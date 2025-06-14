import { CreationDataObject } from '~/models';
import { ConditionCheckType } from '../vo';

export interface ItemConditionCheckCdo extends CreationDataObject {
  rentalRecordId: string;
  variantId: string;
  checkedBy: string;
  checkType: ConditionCheckType;
}
