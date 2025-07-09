import {
  FindRentalRecordsAdmQuery,
} from '~/apis';
import {
  QueryResponse,
  FirstParameter,
  Offset,
  RentalRecordRdo,
} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/rental/${path}`;

const findRentalRecords = (variables: {
  lendeeId?: string;
  offset?: Offset;
}) => {
  const query = <FindRentalRecordsAdmQuery>{ ...variables };
  return axios.post<QueryResponse<RentalRecordRdo[]>>(url('find-rental-record-rdos/query'), query);
};

export default {
  findRentalRecords,

  query: {
    findRentalRecords: (params: FirstParameter<typeof findRentalRecords>) => ({
      queryKey: ['feature/admin/rental', 'findRentalRecords', params],
      queryFn: async ({ queryKey }: {
        queryKey: readonly any[]
      }) => (await findRentalRecords(queryKey.slice().pop()))?.data,
    }),
  },
};
