import {AdminOverviewRdo, FirstParameter, QueryResponse} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/statistics/${path}`;


const adminOverview = <T = AdminOverviewRdo>(params: NonNullable<unknown>) => {
  //
  const query = {...params};
  return axios.post<QueryResponse<T>>(url('find-overview/query'));
};

export default {
  adminOverview,
  
  query: {
    adminOverview: (params: FirstParameter<typeof adminOverview>) => ({
      queryKey: ['feature/admin/statistics', 'adminOverview', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await adminOverview(queryKey.slice().pop()))?.data,
    }),
  },
};
