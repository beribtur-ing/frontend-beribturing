import { DomainEntity } from '../../core';
import { PaymentStatus, PaymentMethod } from './vo';

export interface Payment extends DomainEntity {
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