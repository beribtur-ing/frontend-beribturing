import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { LendeeAdmSeekApi, QueryResponse, Lendee } from '@beribturing/api-stub';

export const useLendeeDetail = (lendeeId?: string) => {
  const { queryKey, queryFn } = LendeeAdmSeekApi.query.findLendee({ lendeeId: lendeeId || '' });
  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<Lendee>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!lendeeId,
    },
  );

  return {
    user: data?.result,
    refetch,
    isLoading,
  };
};