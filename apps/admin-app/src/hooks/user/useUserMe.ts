import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserAdmSeekApi, UserMeRdo, QueryResponse } from '@beribturing/api-stub';

export const useUserMe = () => {
  const { queryKey, queryFn } = UserAdmSeekApi.query.userMe({});
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