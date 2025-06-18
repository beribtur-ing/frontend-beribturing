import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReviewsByRecordRntQuery, ReviewRntSeekApi, Review, QueryResponse} from '@beribturing/api-stub';

export const useReviewsByRecord = (recordId: string) => {
  //
  const query: FindReviewsByRecordRntQuery = {
    recordId
  };

  const {queryKey, queryFn} = ReviewRntSeekApi.query.findReviewsByRecord(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Review[]>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!recordId,
    }
  );

  return {
    reviews: data?.result || [],
    refetch,
    isLoading,
  };
};