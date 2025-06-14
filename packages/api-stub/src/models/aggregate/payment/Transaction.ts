import { DomainEntity } from '~/models';
import { Currency, PaymentStatus } from './vo';

export interface Transaction extends DomainEntity {
  rentalRecordId: string;
  payerId: string;
  payeeId: string;
  totalAmount: Currency;
  commissionAmount: Currency;
  payeeAmount: Currency;
  status: PaymentStatus;
  initiatedAt: Date;
  completedAt: Date;
  paymentProvider: string;
}