import { DomainEntity } from '../../core';
import { RentalStatus } from './vo';

export interface Rental extends DomainEntity {
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