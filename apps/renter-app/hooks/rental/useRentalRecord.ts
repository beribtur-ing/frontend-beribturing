import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindRentalRecordRntQuery, RentalRntSeekApi, RentalRecord, QueryResponse} from '@beribturing/api-stub';

export const useRentalRecord = (rentalRecordId: string) => {
  //
  const query: FindRentalRecordRntQuery = {
    rentalRecordId
  };

  const {queryKey, queryFn} = RentalRntSeekApi.query.findRentalRecord(query);

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