import {FindLendeesAdmQuery} from '~/apis';
import {FirstParameter, Lendee, QueryResponse} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/lendee/${path}`;

const findLendees = (variables: {
  searchKeyword?: string;
  status?: string;
  offset?: number;
  limit?: number;
}) => {
  const query = <FindLendeesAdmQuery>{
    searchKeyword: variables.searchKeyword,
    status: variables.status,
    offset: {
      offset: variables.offset || 0,
      limit: variables.limit || 10,
    }
  };
  return axios.post<QueryResponse<Lendee[]>>(url('find-lendees/query'), query);
};

export default {
  findLendees,

  query: {
    findLendees: (params: FirstParameter<typeof findLendees>) => ({
      queryKey: ['feature/admin/lendee', 'findLendees', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findLendees(queryKey.slice().pop()))?.data,
    }),
  }
};