import { CreationDataObject } from '~/models';
import { Currency } from '../../payment/vo';
import { Period, RentalStatus } from '../vo';

export interface RentalRecordCdo extends CreationDataObject {
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
  reservationId: string;
}
