import { NameValueList } from '~/models';

export interface ModifyRentalRecordRntCommand {
  rentalRecordId: string;
  nameValueList: NameValueList;
}