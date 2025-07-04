import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindRentalRecordOwnQuery, RentalOwnSeekApi, RentalRecordRdo, QueryResponse } from '@beribturing/api-stub';

const mockRentalRecord: RentalRecordRdo = {
  id: 'mock-rental-1',
  lendee: {
    id: 'lendee-123',
    name: 'John Doe',
    phoneNumber: '+1234567890',
    email: 'john.doe@example.com',
  },
  period: {
    startDateTime: new Date('2024-01-20T00:00:00Z').toISOString(),
    endDateTime: new Date('2024-01-25T00:00:00Z').toISOString(),
  },
  rentedAt: new Date('2024-01-20T10:00:00Z').toISOString(),
  returnedAt: new Date('2024-01-25T15:00:00Z').toISOString(),
  productRentalRecordRdo: {
    amount: 30.00,
    currency: 'USD',
    productId: 'mock-product-1',
    title: 'Professional Camera Kit',
    description: 'High-quality camera kit for professional photography',
    categoryId: 'mock-category-1',
    name: 'Photography Equipment',
    productVariantId: 'mock-variant-1',
    model: 'Standard Kit',
    unit: 'DAILY',
  },
  fee: {
    amount: 150.00,
    currency: 'USD',
  },
  rentalDeposit: {
    id: 'deposit-123',
    amount: 100.00,
    currency: 'USD',
  },
  status: 'ACTIVE',
};

export const useRentalRecord = (rentalRecordId: string) => {
  //
  const query: FindRentalRecordOwnQuery = {
    rentalRecordId,
  };

  const { queryKey, queryFn } = RentalOwnSeekApi.query.findRentalRecord(query);

  const { data, refetch, isLoading }: UseQueryResult<QueryResponse<RentalRecordRdo>> = useQuery(
    {
      queryKey,
      queryFn,
      enabled: !!rentalRecordId,
    },
  );

  return {
    rentalRecord: (data?.result || mockRentalRecord) as RentalRecordRdo,
    refetch,
    isLoading,
  };
};
