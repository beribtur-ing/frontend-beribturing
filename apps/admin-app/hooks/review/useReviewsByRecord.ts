import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReviewsByRecordAdmQuery, ReviewAdmSeekApi, Review, QueryResponse} from '@beribturing/api-stub';

export const useReviewsByRecord = (recordId: string) => {
  //
  const query: FindReviewsByRecordAdmQuery = {
    recordId
  };

  const {queryKey, queryFn} = ReviewAdmSeekApi.query.findReviewsByRecord(query);

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