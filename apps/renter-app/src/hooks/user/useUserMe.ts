import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserRntSeekApi, UserMeRdo, QueryResponse } from '@beribturing/api-stub';

export const useUserMe = () => {
  const { queryKey, queryFn } = UserRntSeekApi.query.userMe({});
  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<UserMeRdo>> = useQuery({
    queryKey,
    queryFn,
  });

  return {
    userMe: data?.result,
    refetch,
    isLoading,
  };
};