import { UserMeAdmQuery } from '~/apis';
import { FirstParameter, QueryResponse, UserMeRdo } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/user/${path}`;


const userMe = <T = UserMeRdo>(params: {}) => {
  //
  const query = <UserMeAdmQuery>{ ...params };
  return axios.post<QueryResponse<T>>(url('me/query'), query);
};

export default {
  userMe,

  query: {
    userMe: (params: FirstParameter<typeof userMe>) => ({
      queryKey: ['feature/admin/user', 'userMe', params],
      queryFn: async ({ queryKey }: {
        queryKey: readonly any[]
      }) => (await userMe(queryKey.slice().pop()))?.data,
    }),
  },
};
