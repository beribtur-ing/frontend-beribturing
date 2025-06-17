import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReviewsByRecordOwnQuery, ReviewOwnSeekApi, Review, QueryResponse} from '@beribturing/api-stub';

export const useReviewsByRecord = (recordId: string) => {
  //
  const query: FindReviewsByRecordOwnQuery = {
    recordId
  };

  const {queryKey, queryFn} = ReviewOwnSeekApi.query.findReviewsByRecord(query);

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