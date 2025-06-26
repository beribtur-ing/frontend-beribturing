import {OffsetQueryRequest, RentalRecord} from "~/models";

export interface FindRentalRecordsOwnQuery extends OffsetQueryRequest<RentalRecord[]> {
    status?: string;
    searchKeyword?: string;
}