import {
  FindItemConditionCheckOwnQuery,
  FindItemConditionPhotoOwnQuery,
  FindRentalRecordOwnQuery
} from '~/apis';
import { QueryResponse, RentalRecord, ItemConditionCheck, ItemConditionPhoto, FirstParameter } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/owner/rental/${path}`;

const findRentalRecord = (variables: {
  rentalRecordId: string;
}) => {
  const query = <FindRentalRecordOwnQuery>{...variables};
  return axios.post<QueryResponse<RentalRecord>>(url('find-rental-record/query'), query);
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
  findItemConditionCheck,
  findItemConditionPhoto,

  query: {
    findRentalRecord: (params: FirstParameter<typeof findRentalRecord>) => ({
      queryKey: ['feature/owner/rental', 'findRentalRecord', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findRentalRecord(queryKey.slice().pop()))?.data,
    }),
    findItemConditionCheck: (params: FirstParameter<typeof findItemConditionCheck>) => ({
      queryKey: ['feature/owner/rental', 'findItemConditionCheck', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findItemConditionCheck(queryKey.slice().pop()))?.data,
    }),
    findItemConditionPhoto: (params: FirstParameter<typeof findItemConditionPhoto>) => ({
      queryKey: ['feature/owner/rental', 'findItemConditionPhoto', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findItemConditionPhoto(queryKey.slice().pop()))?.data,
    }),
  }
};