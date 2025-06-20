import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReviewRntQuery, ReviewRntSeekApi, Review, QueryResponse} from '@beribturing/api-stub';

export const useReview = (reviewId: string) => {
  //
  const query: FindReviewRntQuery = {
    reviewId
  };

  const {queryKey, queryFn} = ReviewRntSeekApi.query.findReview(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Review>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!reviewId,
    }
  );

  return {
    review: data?.result,
    refetch,
    isLoading,
  };
};