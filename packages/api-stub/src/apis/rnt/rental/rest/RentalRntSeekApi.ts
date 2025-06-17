import {
  FindItemConditionCheckRntQuery,
  FindItemConditionPhotoRntQuery,
  FindRentalRecordRntQuery,
  FindReservationRntQuery
} from '~/apis';
import {
  FirstParameter,
  QueryResponse,
  RentalRecord,
  Reservation,
  ItemConditionCheck,
  ItemConditionPhoto
} from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/renter/rental/${path}`;

const findRentalRecord = <T = RentalRecord>(params: { rentalRecordId: string; }) => {
  const query = <FindRentalRecordRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('find-rental-record/query'), query);
};

const findReservation = <T = Reservation>(params: { reservationId: string; }) => {
  const query = <FindReservationRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('find-reservation/query'), query);
};

const findItemConditionCheck = <T = ItemConditionCheck>(params: { itemConditionCheckId: string; }) => {
  const query = <FindItemConditionCheckRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('find-item-condition-check/query'), query);
};

const findItemConditionPhoto = <T = ItemConditionPhoto>(params: { itemConditionPhotoId: string; }) => {
  const query = <FindItemConditionPhotoRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('find-item-condition-photo/query'), query);
};

export default {
  findRentalRecord,
  findReservation,
  findItemConditionCheck,
  findItemConditionPhoto,

  query: {
    findRentalRecord: (params: FirstParameter<typeof findRentalRecord>) => ({
      queryKey: ['feature/renter/rental', 'findRentalRecord', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findRentalRecord(queryKey.slice().pop()))?.data,
    }),
    findReservation: (params: FirstParameter<typeof findReservation>) => ({
      queryKey: ['feature/renter/rental', 'findReservation', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReservation(queryKey.slice().pop()))?.data,
    }),
    findItemConditionCheck: (params: FirstParameter<typeof findItemConditionCheck>) => ({
      queryKey: ['feature/renter/rental', 'findItemConditionCheck', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findItemConditionCheck(queryKey.slice().pop()))?.data,
    }),
    findItemConditionPhoto: (params: FirstParameter<typeof findItemConditionPhoto>) => ({
      queryKey: ['feature/renter/rental', 'findItemConditionPhoto', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findItemConditionPhoto(queryKey.slice().pop()))?.data,
    }),
  }
}
