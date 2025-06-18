import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindItemConditionCheckOwnQuery, RentalOwnSeekApi, ItemConditionCheck, QueryResponse} from '@beribturing/api-stub';

export const useItemConditionCheck = (itemConditionCheckId: string) => {
  //
  const query: FindItemConditionCheckOwnQuery = {
    itemConditionCheckId
  };

  const {queryKey, queryFn} = RentalOwnSeekApi.query.findItemConditionCheck(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<ItemConditionCheck>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!itemConditionCheckId,
    }
  );

  return {
    itemConditionCheck: data?.result,
    refetch,
    isLoading,
  };
};