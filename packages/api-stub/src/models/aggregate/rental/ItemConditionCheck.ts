import { DomainEntity } from '~/models';
import { ConditionCheckType } from './vo';

export interface ItemConditionCheck extends DomainEntity {
  rentalRecordId: string;
  variantId: string;
  checkedBy: string;
  checkType: ConditionCheckType;
  photoSequence: number;
}
