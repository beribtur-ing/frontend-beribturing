import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindLatestActivitiesQuery, ActivitySeekApi, Activity, QueryResponse} from '@beribturing/api-stub'

export const useActivities = (limit: number) => {
  //
  const query: FindLatestActivitiesQuery = {
    limit: limit,
  };
  
  const {queryKey, queryFn} = ActivitySeekApi.query.findLatestActivities(query);
  
  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Activity[]>> = useQuery(
    {
      queryKey,
      queryFn,
    },
  );
  
  return {
    activities: data?.result,
    refetch,
    isLoading,
  };
};
