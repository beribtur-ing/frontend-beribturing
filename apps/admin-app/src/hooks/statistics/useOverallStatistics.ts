import {useQuery, UseQueryResult} from '@tanstack/react-query';
import { StatisticsSeekApi, AdminOverviewRdo, QueryResponse } from '@beribturing/api-stub';

export const useOverallStatistics = () => {
  //
  const { queryKey, queryFn } = StatisticsSeekApi.query.adminOverview({});
  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<AdminOverviewRdo>> = useQuery({
    queryKey,
    queryFn,
  });
  
  return {
    adminStatistics: data?.result,
    refetch,
    isLoading,
  };
};
