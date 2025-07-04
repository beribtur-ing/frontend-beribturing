import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReviewOwnQuery, ReviewOwnSeekApi, Review, QueryResponse} from '@beribturing/api-stub';

export const useReview = (reviewId: string) => {
  //
  const query: FindReviewOwnQuery = {
    reviewId
  };

  const {queryKey, queryFn} = ReviewOwnSeekApi.query.findReview(query);

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