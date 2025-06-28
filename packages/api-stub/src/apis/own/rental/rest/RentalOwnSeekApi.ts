import {
  FindItemConditionCheckOwnQuery,
  FindItemConditionPhotoOwnQuery,
  FindRentalRecordOwnQuery,
  FindRentalRecordsOwnQuery, FindReservationsOwnQuery,
} from '~/apis';
import {QueryResponse, RentalRecord, ItemConditionCheck, ItemConditionPhoto, FirstParameter, Offset} from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/owner/rental/${path}`;

const findRentalRecord = (variables: {
    rentalRecordId: string;
}) => {
    const query = <FindRentalRecordOwnQuery>{...variables};
    return axios.post<QueryResponse<RentalRecord>>(url('find-rental-record/query'), query);
};

const findRentalRecords = (variables: {
    status?: string;
    searchKeyword?: string;
    offset?: Offset;
}) => {
    const query = <FindRentalRecordsOwnQuery>{...variables};
    return axios.post<QueryResponse<RentalRecord[]>>(url('find-rental-records/query'), query);
};

const findReservations = (variables: {
    status?: string;
    offset?: Offset;
}) => {
    const query = <FindReservationsOwnQuery>{...variables};
    return axios.post<QueryResponse<RentalRecord[]>>(url('find-reservations/query'), query);
};

const findItemConditionCheck = (variables: {
    itemConditionCheckId: string;
}) => {
    const query = <FindItemConditionCheckOwnQuery>{...variables};
    return axios.post<QueryResponse<ItemConditionCheck>>(url('find-item-condition-check/query'), query);
};

const findItemConditionPhoto = (variables: {
    itemConditionPhotoId: string;
}) => {
    const query = <FindItemConditionPhotoOwnQuery>{...variables};
    return axios.post<QueryResponse<ItemConditionPhoto>>(url('find-item-condition-photo/query'), query);
};

export default {
    findRentalRecord,
    findRentalRecords,
    findItemConditionCheck,
    findItemConditionPhoto,

    query: {
        findRentalRecord: (params: FirstParameter<typeof findRentalRecord>) => ({
            queryKey: ['feature/owner/rental', 'findRentalRecord', params],
            queryFn: async ({queryKey}: {
                queryKey: readonly any[]
            }) => (await findRentalRecord(queryKey.slice().pop()))?.data,
        }),
        findRentalRecords: (params: FirstParameter<typeof findRentalRecords>) => ({
            queryKey: ['feature/owner/rental', 'findRentalRecords', params],
            queryFn: async ({queryKey}: {
                queryKey: readonly any[]
            }) => (await findRentalRecords(queryKey.slice().pop()))?.data,
        }),
      findReservations: (params: FirstParameter<typeof findReservations>) => ({
            queryKey: ['feature/owner/rental', 'findReservations', params],
            queryFn: async ({queryKey}: {
                queryKey: readonly any[]
            }) => (await findReservations(queryKey.slice().pop()))?.data,
        }),
        findItemConditionCheck: (params: FirstParameter<typeof findItemConditionCheck>) => ({
            queryKey: ['feature/owner/rental', 'findItemConditionCheck', params],
            queryFn: async ({queryKey}: {
                queryKey: readonly any[]
            }) => (await findItemConditionCheck(queryKey.slice().pop()))?.data,
        }),
        findItemConditionPhoto: (params: FirstParameter<typeof findItemConditionPhoto>) => ({
            queryKey: ['feature/owner/rental', 'findItemConditionPhoto', params],
            queryFn: async ({queryKey}: {
                queryKey: readonly any[]
            }) => (await findItemConditionPhoto(queryKey.slice().pop()))?.data,
        }),
    }
};