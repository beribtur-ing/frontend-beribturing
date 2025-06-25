import {UserMeRntQuery} from "~/apis";
import {FirstParameter, QueryResponse, UserMeRdo} from "~/models";
import axios from "axios";

const url = (path: string) => `/api/feature/renter/user/${path}`;


const userMe = <T = UserMeRdo>(params: {}) => {
  //
  const query = <UserMeRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('me/query'), query);
};

export default {
  userMe,

  query: {
    userMe: (params: FirstParameter<typeof userMe>) => ({
      queryKey: ['feature/renter/user', 'userMe', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await userMe(queryKey.slice().pop()))?.data,
    }),
  }
}