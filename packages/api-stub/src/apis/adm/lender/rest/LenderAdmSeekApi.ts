import {FindDisabledLendersAdmQuery} from '~/apis';
import {FirstParameter, Lender, QueryResponse} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/lender/${path}`;

const findDisabledLenders = (variables: {
  page: number;
  size: number;
  sort: string;
}) => {
  const query = <FindDisabledLendersAdmQuery>{...variables};
  return axios.post<QueryResponse<Lender[]>>(url('find-disabled-lenders/query'), query);
};

export default {
  findDisabledLenders,

  query: {
    findDisabledLenders: (params: FirstParameter<typeof findDisabledLenders>) => ({
      queryKey: ['feature/admin/lender', 'findDisabledLenders', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findDisabledLenders(queryKey.slice().pop()))?.data,
    }),
  }
};
