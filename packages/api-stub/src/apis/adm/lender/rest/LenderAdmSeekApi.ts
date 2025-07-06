import {FindLendersAdmQuery} from '~/apis';
import {FirstParameter, Lender, QueryResponse} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/lender/${path}`;

const findLenders = (variables: {
  searchKeyword?: string;
  status?: string;
  offset?: number;
  limit?: number;
}) => {
  const query = <FindLendersAdmQuery>{
    searchKeyword: variables.searchKeyword,
    status: variables.status,
    offset: {
      offset: variables.offset || 0,
      limit: variables.limit || 10,
    }
  };
  return axios.post<QueryResponse<Lender[]>>(url('find-lenders/query'), query);
};

export default {
  findLenders,

  query: {
    findLenders: (params: FirstParameter<typeof findLenders>) => ({
      queryKey: ['feature/admin/lender', 'findLenders', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findLenders(queryKey.slice().pop()))?.data,
    }),
  }
};
