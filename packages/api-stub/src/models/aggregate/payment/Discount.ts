import { DomainEntity } from '~/models';
import { DiscountType, DiscountScope } from './vo';

export interface Discount extends DomainEntity {
  name: string;
  type: DiscountType;
  amount: number;
  scope: DiscountScope;
  targetId: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}