import { DomainEntity } from '~/models';
import { Period, ReservationStatus } from './vo';

export interface Reservation extends DomainEntity {
  productVariantId: string;
  requesterId: string;
  period: Period;
  status: ReservationStatus;
  note?: string;
}