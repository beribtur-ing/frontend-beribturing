import {
  FindReviewAdmQuery,
  FindReviewsByRecordAdmQuery
} from '~/apis';
import {FirstParameter, QueryResponse, Review} from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/review/${path}`;

const findReview = (variables: {
  reviewId: string;
}) => {
  const query = <FindReviewAdmQuery>{...variables};
  return axios.post<QueryResponse<Review>>(url('find-review/query'), query);
};

const findReviewsByRecord = (variables: {
  recordId: string;
}) => {
  const query = <FindReviewsByRecordAdmQuery>{...variables};
  return axios.post<QueryResponse<Review[]>>(url('find-reviews-by-record/query'), query);
};

export default {
  findReview,
  findReviewsByRecord,

  query: {
    findReview: (params: FirstParameter<typeof findReview>) => ({
      queryKey: ['feature/admin/review', 'findReview', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findReview(queryKey.slice().pop()))?.data,
    }),
    findReviewsByRecord: (params: FirstParameter<typeof findReviewsByRecord>) => ({
      queryKey: ['feature/admin/review', 'findReviewsByRecord', params],
      queryFn: async ({ queryKey }: { queryKey: readonly any[] }) => (await findReviewsByRecord(queryKey.slice().pop()))?.data,
    }),
  }
};
