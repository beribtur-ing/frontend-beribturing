import { OffsetQueryRequest, RentalRecordRdo } from "~/models";

export interface FindRentalRecordsAdmQuery extends OffsetQueryRequest<RentalRecordRdo[]> {
  lendeeId?: string;
}