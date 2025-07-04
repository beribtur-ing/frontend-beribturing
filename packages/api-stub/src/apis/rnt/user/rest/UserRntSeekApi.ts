import {UserMeRntQuery} from "~/apis";
import {FirstParameter, QueryResponse, UserMeRdo, LendeeAllSettingsRdo} from "~/models";
import axios from "axios";

const url = (path: string) => `/api/feature/renter/user/${path}`;

const userMe = <T = UserMeRdo>(params: {}) => {
  const query = <UserMeRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('me/query'), query);
};

const getAllSettings = <T = LendeeAllSettingsRdo>() => {
  return axios.post<QueryResponse<T>>(url('find-all-settings/query'), {});
};

export default {
  userMe,
  getAllSettings,

  query: {
    userMe: (params: FirstParameter<typeof userMe>) => ({
      queryKey: ['feature/renter/user', 'userMe', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await userMe(queryKey.slice().pop()))?.data,
    }),
    getAllSettings: () => ({
      queryKey: ['feature/renter/user', 'getAllSettings'],
      queryFn: async () => (await getAllSettings())?.data,
    }),
  }
}