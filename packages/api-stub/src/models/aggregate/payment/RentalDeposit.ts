import { DomainEntity } from '~/models';
import { Currency, DepositStatus } from './vo';

export interface RentalDeposit extends DomainEntity {
  rentalRecordId: string;
  payerId: string;
  amount: Currency;
  status: DepositStatus;
  paidAt: Date;
  resolvedAt: Date;
  notes: string;
}