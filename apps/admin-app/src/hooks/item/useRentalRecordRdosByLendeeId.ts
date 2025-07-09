import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindRentalRecordsAdmQuery, RentalAdmSeekApi, RentalRecordRdo, QueryResponse } from '@beribturing/api-stub';
import { useState } from 'react';

export const useRentalRecordRdosByLendeeId = ({ lendeeId, limit = 10 }: { lendeeId?: string; limit?: number }) => {
  const initialQuery: FindRentalRecordsAdmQuery = {
    lendeeId: lendeeId,
    offset: {
      offset: 0,
      limit,
    },
  };

  const [query, setQuery] = useState(initialQuery);

  const { queryKey, queryFn } = RentalAdmSeekApi.query.findRentalRecords({ ...query });

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<RentalRecordRdo[]>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!lendeeId,
    },
  );

  const changeCurrentPage = (offset: number) => {
    setQuery((prev) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: { ...prev.offset, offset },
        };
      }
      return prev;
    });
  };

  const changePageLimit = (limit: number) => {
    setQuery((prev) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: { offset: 0, limit },
        };
      }
      return prev;
    });
  };

  return {
    rentalRecords: data?.result || [],
    total: data?.offset?.totalCount || 0,
    offset: data?.offset?.offset || 0,
    limit: data?.offset?.limit || 10,
    changeCurrentPage,
    changePageLimit,
    refetch,
    isLoading,
  };
};