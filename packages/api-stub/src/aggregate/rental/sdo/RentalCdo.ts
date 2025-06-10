import { CreationDataObject } from '../../../core';
import { RentalStatus } from '../vo';

export interface RentalCdo extends CreationDataObject {
  itemId: string;
  renterId: string;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: RentalStatus;
  paymentId: string;
  notes: string;
} 