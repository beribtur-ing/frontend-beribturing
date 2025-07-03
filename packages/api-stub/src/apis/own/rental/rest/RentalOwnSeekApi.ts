import {
  FindItemConditionCheckOwnQuery,
  FindItemConditionPhotoOwnQuery,
  FindRentalRecordOwnQuery,
  FindRentalRecordsOwnQuery, FindReservationRdosOwnQuery,
} from '~/apis';
import {
  QueryResponse,
  RentalRecord,
  ItemConditionCheck,
  ItemConditionPhoto,
  FirstParameter,
  Offset,
  RentalRecordRdo,
  ReservationRdo,
} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/owner/rental/${path}`;

const findRentalRecord = (variables: {
  rentalRecordId: string;
}) => {
  const query = <FindRentalRecordOwnQuery>{ ...variables };
  return axios.post<QueryResponse<RentalRecordRdo>>(url('find-rental-record/query'), query);
};

const findRentalRecords = (variables: {
  status?: string;
  searchKeyword?: string;
  offset?: Offset;
}) => {
  const query = <FindRentalRecordsOwnQuery>{ ...variables };
  return axios.post<QueryResponse<RentalRecordRdo[]>>(url('find-rental-record-rdos/query'), query);
};

const findReservationRdos = (variables: {
  status?: string;
  offset?: Offset;
}) => {
  const query = <FindReservationRdosOwnQuery>{ ...variables };
  return axios.post<QueryResponse<ReservationRdo[]>>(url('find-reservation-rdos/query'), query);
};

const findItemConditionCheck = (variables: {
  itemConditionCheckId: string;
}) => {
  const query = <FindItemConditionCheckOwnQuery>{ ...variables };
  return axios.post<QueryResponse<ItemConditionCheck>>(url('find-item-condition-check/query'), query);
};

const findItemConditionPhoto = (variables: {
  itemConditionPhotoId: string;
}) => {
  const query = <FindItemConditionPhotoOwnQuery>{ ...variables };
  return axios.post<QueryResponse<ItemConditionPhoto>>(url('find-item-condition-photo/query'), query);
};

export default {
  findRentalRecord,
  findRentalRecords,
  findItemConditionCheck,
  findItemConditionPhoto,
  findReservationRdos,

  query: {
    findRentalRecord: (params: FirstParameter<typeof findRentalRecord>) => ({
      queryKey: ['feature/owner/rental', 'findRentalRecord', params],
      queryFn: async ({ queryKey }: {
        queryKey: readonly any[]
      }) => (await findRentalRecord(queryKey.slice().pop()))?.data,
    }),
    findRentalRecords: (params: FirstParameter<typeof findRentalRecords>) => ({
      queryKey: ['feature/owner/rental', 'findRentalRecords', params],
      queryFn: async ({ queryKey }: {
        queryKey: readonly any[]
      }) => (await findRentalRecords(queryKey.slice().pop()))?.data,
    }),
    findReservationRdos: (params: FirstParameter<typeof findReservationRdos>) => ({
      queryKey: ['feature/owner/rental', 'findReservations', params],
      queryFn: async ({ queryKey }: {
        queryKey: readonly any[]
      }) => (await findReservationRdos(queryKey.slice().pop()))?.data,
    }),
    findItemConditionCheck: (params: FirstParameter<typeof findItemConditionCheck>) => ({
      queryKey: ['feature/owner/rental', 'findItemConditionCheck', params],
      queryFn: async ({ queryKey }: {
        queryKey: readonly any[]
      }) => (await findItemConditionCheck(queryKey.slice().pop()))?.data,
    }),
    findItemConditionPhoto: (params: FirstParameter<typeof findItemConditionPhoto>) => ({
      queryKey: ['feature/owner/rental', 'findItemConditionPhoto', params],
      queryFn: async ({ queryKey }: {
        queryKey: readonly any[]
      }) => (await findItemConditionPhoto(queryKey.slice().pop()))?.data,
    }),
  },
};
