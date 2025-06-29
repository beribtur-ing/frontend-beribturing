import { OffsetQueryRequest, RentalRecordRdo } from "~/models";

export interface FindRentalRecordsOwnQuery extends OffsetQueryRequest<RentalRecordRdo[]> {
    status?: string;
    searchKeyword?: string;
}