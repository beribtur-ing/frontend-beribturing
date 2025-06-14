import {AccountSignInOwnQuery} from "~/apis";
import {AccountSignInTokenRdo, FirstParameter, QueryResponse} from "~/models";
import axios from "axios";

const url = (path: string) => `/api/feature/owner/auth/${path}`;


const accountSignIn = <T = AccountSignInTokenRdo>(params: { phoneNumber: string; password: string; }) => {
  //
  const query = <AccountSignInOwnQuery>{...params};
  return axios.post<QueryResponse<T>>(url('/sign-in/query'), query);
};

export default {
  accountSignIn,

  query: {
    accountSignIn: (params: FirstParameter<typeof accountSignIn>) => ({
      queryKey: ['feature/owner/auth', 'accountSignIn', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await accountSignIn(queryKey.slice().pop()))?.data,
    }),
  }
}
