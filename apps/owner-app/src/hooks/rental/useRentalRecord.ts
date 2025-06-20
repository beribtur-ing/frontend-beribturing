import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindRentalRecordOwnQuery, RentalOwnSeekApi, RentalRecord, QueryResponse} from '@beribturing/api-stub';

export const useRentalRecord = (rentalRecordId: string) => {
  //
  const query: FindRentalRecordOwnQuery = {
    rentalRecordId
  };

  const {queryKey, queryFn} = RentalOwnSeekApi.query.findRentalRecord(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<RentalRecord>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!rentalRecordId,
    }
  );

  return {
    rentalRecord: data?.result,
    refetch,
    isLoading,
  };
};