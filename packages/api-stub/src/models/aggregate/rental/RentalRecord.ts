import { DomainEntity } from '~/models';
import { Currency } from '../payment/vo';
import { RentalStatus, Period } from './vo';

export interface RentalRecord extends DomainEntity {
  period: Period;
  rentedAt?: Date;
  returnedAt?: Date;
  cancelledAt?: Date;
  productVariantId: string;
  status: RentalStatus;
  lendeeId: string;
  fee: Currency;
  discountId?: string;
  depositId?: string;
}
