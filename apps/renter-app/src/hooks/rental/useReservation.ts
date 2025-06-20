import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {FindReservationRntQuery, RentalRntSeekApi, Reservation, QueryResponse} from '@beribturing/api-stub';

export const useReservation = (reservationId: string) => {
  //
  const query: FindReservationRntQuery = {
    reservationId
  };

  const {queryKey, queryFn} = RentalRntSeekApi.query.findReservation(query);

  const {data, refetch, isLoading}: UseQueryResult<QueryResponse<Reservation>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!reservationId,
    }
  );

  return {
    reservation: data?.result,
    refetch,
    isLoading,
  };
};