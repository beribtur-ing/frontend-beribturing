import { OffsetQueryRequest, RentalRecord, Reservation, ReservationStatus } from '~/models';

export interface FindReservationsOwnQuery extends OffsetQueryRequest<Reservation[]> {
    status?: string;
}