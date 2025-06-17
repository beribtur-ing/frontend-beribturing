import { AccountSignInAdmQuery } from '~/apis';
import {QueryResponse, AccountSignInTokenRdo, FirstParameter} from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/admin/auth/${path}`;

const accountSignIn = <T = AccountSignInTokenRdo>(params: { phoneNumber: string; password: string; }) => {
  const query = <AccountSignInAdmQuery>{...params};
  return axios.post<QueryResponse<T>>(url('sign-in/query'), query);
};

export default {
  accountSignIn,

  query: {
    accountSignIn: (params: FirstParameter<typeof accountSignIn>) => ({
      queryKey: ['feature/admin/auth', 'accountSignIn', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await accountSignIn(queryKey.slice().pop()))?.data,
    }),
  }
};
