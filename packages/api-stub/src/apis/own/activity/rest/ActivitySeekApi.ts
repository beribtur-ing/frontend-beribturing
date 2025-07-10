import {Activity, FirstParameter, QueryResponse} from '~/models';
import axios from 'axios';
import {FindLatestActivitiesQuery} from '~/apis/own/activity';


const url = (path: string) => `/api/feature/owner/activity/${path}`;

const findLatestActivities = <T = Activity[]>(params: { limit: number }) => {
  //
  const query = <FindLatestActivitiesQuery>{...params};
  return axios.post<QueryResponse<T>>(url('find-latest-activities/query'), query);
};

export default {
  findLatestActivities,
  
  query: {
    findLatestActivities: (params: FirstParameter<typeof findLatestActivities>) => ({
      queryKey: ['feature/owner/activity', 'findLatestActivities', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findLatestActivities(queryKey.slice().pop()))?.data,
    }),
  },
};
