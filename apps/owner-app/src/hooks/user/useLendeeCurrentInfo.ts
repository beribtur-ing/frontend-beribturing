import {useQuery, UseQueryResult} from '@tanstack/react-query';
import { UserOwnSeekApi, LendeeCurrentInfoRdo, QueryResponse } from '@beribturing/api-stub';

export const useLendeeCurrentInfo = () => {
  const { queryKey, queryFn } = UserOwnSeekApi.query.getCurrentInfo({});
  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<LendeeCurrentInfoRdo>> = useQuery({
    queryKey,
    queryFn,
  });
  
  return {
    ownerCurrentInfo: data?.result,
    refetch,
    isLoading,
  };
};
