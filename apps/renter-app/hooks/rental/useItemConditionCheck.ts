import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindItemConditionCheckRntQuery, RentalRntSeekApi, ItemConditionCheck, QueryResponse} from '@beribturing/api-stub';

export const useItemConditionCheck = (itemConditionCheckId: string) => {
  //
  const query: FindItemConditionCheckRntQuery = {
    itemConditionCheckId
  };

  const {queryKey, queryFn} = RentalRntSeekApi.query.findItemConditionCheck(query);

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