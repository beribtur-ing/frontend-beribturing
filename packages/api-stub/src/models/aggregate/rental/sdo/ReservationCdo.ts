import { CreationDataObject } from '~/models';
import { Period, ReservationStatus } from '../vo';

export interface ReservationCdo extends CreationDataObject {
  productVariantId: string;
  requesterId: string;
  period: Period;
  status: ReservationStatus;
  note?: string;
  reservationSequence: number;
}