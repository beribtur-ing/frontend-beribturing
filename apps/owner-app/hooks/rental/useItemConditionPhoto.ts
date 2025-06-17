import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindItemConditionPhotoOwnQuery, RentalOwnSeekApi, ItemConditionPhoto, QueryResponse} from '@beribturing/api-stub';

export const useItemConditionPhoto = (itemConditionPhotoId: string) => {
  //
  const query: FindItemConditionPhotoOwnQuery = {
    itemConditionPhotoId
  };

  const {queryKey, queryFn} = RentalOwnSeekApi.query.findItemConditionPhoto(query);

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