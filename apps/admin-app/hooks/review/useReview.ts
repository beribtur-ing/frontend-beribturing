import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReviewAdmQuery, ReviewAdmSeekApi, Review, QueryResponse} from '@beribturing/api-stub';

export const useReview = (reviewId: string) => {
  //
  const query: FindReviewAdmQuery = {
    reviewId
  };

  const {queryKey, queryFn} = ReviewAdmSeekApi.query.findReview(query);

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