import { Currency, Lendee, Period, RentalDeposit, ProductRentalRecordRdo } from '~/models';

export interface RentalRecordRdo {
  //from RentalRecord
  id: string;
  //from Lendee
  lendee: Lendee;
  //from ProductVariant
  period: Period;
  rentedAt: string;
  returnedAt: string;
  //from Product
  productRentalRecordRdo: ProductRentalRecordRdo;
  //from RentalRecord
  fee: Currency;
  //from RentalDeposit
  rentalDeposit: RentalDeposit;
  //from RentalRecord
  status: string;
}
