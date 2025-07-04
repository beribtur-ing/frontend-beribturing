import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserRntSeekApi, LendeeAllSettingsRdo, QueryResponse } from '@beribturing/api-stub';

export const useSettings = () => {
  const { queryKey, queryFn } = UserRntSeekApi.query.getAllSettings();
  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<LendeeAllSettingsRdo>> = useQuery({
    queryKey,
    queryFn,
  });

  return {
    settings: data?.result,
    refetchSettings: refetch,
    isLoading,
  };
};