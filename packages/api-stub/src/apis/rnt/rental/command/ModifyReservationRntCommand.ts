import { NameValueList } from '~/models';

export interface ModifyReservationRntCommand {
  reservationId: string;
  nameValueList: NameValueList;
}