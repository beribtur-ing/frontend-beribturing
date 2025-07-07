import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { LenderAdmSeekApi, QueryResponse, Lender } from '@beribturing/api-stub';

export const useLenderDetail = (lenderId?: string) => {
  const { queryKey, queryFn } = LenderAdmSeekApi.query.findLender({ lenderId: lenderId || '' });
  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<Lender>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!lenderId,
    },
  );

  return {
    user: data?.result,
    refetch,
    isLoading,
  };
};