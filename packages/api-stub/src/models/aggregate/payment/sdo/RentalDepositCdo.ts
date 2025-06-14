import { CreationDataObject } from '~/models';
import { Currency, DepositStatus } from '../vo';

export interface RentalDepositCdo extends CreationDataObject {
  rentalRecordId: string;
  payerId: string;
  amount: Currency;
  status: DepositStatus;
  paidAt: Date;
  resolvedAt: Date;
  notes: string;
}