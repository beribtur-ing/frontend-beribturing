import { NameValueList } from '~/models';

export interface ModifyRentalRecordOwnCommand {
  rentalRecordId: string;
  nameValueList: NameValueList;
}