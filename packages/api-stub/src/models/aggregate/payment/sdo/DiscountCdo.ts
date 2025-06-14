import { CreationDataObject } from '~/models';
import { DiscountType, DiscountScope } from '../vo';

export interface DiscountCdo extends CreationDataObject {
  name: string;
  type: DiscountType;
  amount: number;
  scope: DiscountScope;
  targetId: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}