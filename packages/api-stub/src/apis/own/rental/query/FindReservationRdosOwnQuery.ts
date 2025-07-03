import { OffsetQueryRequest, ReservationRdo } from '~/models';

export interface FindReservationRdosOwnQuery extends OffsetQueryRequest<ReservationRdo[]> {
  status?: string;
}
