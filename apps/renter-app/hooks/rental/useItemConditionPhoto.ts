import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindItemConditionPhotoRntQuery, RentalRntSeekApi, ItemConditionPhoto, QueryResponse} from '@beribturing/api-stub';

export const useItemConditionPhoto = (itemConditionPhotoId: string) => {
  //
  const query: FindItemConditionPhotoRntQuery = {
    itemConditionPhotoId
  };

  const {queryKey, queryFn} = RentalRntSeekApi.query.findItemConditionPhoto(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<ItemConditionPhoto>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!itemConditionPhotoId,
    }
  );

  return {
    itemConditionPhoto: data?.result,
    refetch,
    isLoading,
  };
};