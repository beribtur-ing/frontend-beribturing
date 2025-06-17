import { AccountSignInAdmQuery } from '~/apis';
import {QueryResponse, AccountSignInTokenRdo, FirstParameter} from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/admin/auth/${path}`;

const accountSignIn = (variables: {
  phoneNumber: string;
  password: string;
}) => {
  const query = <AccountSignInAdmQuery>{...variables};
  return axios.post<QueryResponse<AccountSignInTokenRdo>>(url('sign-in/query'), query);
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
