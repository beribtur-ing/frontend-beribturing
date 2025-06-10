import { CreationDataObject } from '../../../core';
import { PaymentStatus, PaymentMethod } from '../vo';

export interface PaymentCdo extends CreationDataObject {
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId: string;
  paymentDate: Date;
  description: string;
  userId: string;
  rentalId: string;
} 