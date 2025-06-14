import {
  FindReviewRntQuery,
  FindReviewsByRecordRntQuery
} from '~/apis';
import { FirstParameter, QueryResponse, Review } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/renter/review/${path}`;

const findReview = <T = Review>(params: { reviewId: string; }) => {
  const query = <FindReviewRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('/find-review/query'), query);
};

const findReviewsByRecord = <T = Review[]>(params: { recordId: string; }) => {
  const query = <FindReviewsByRecordRntQuery>{...params};
  return axios.post<QueryResponse<T>>(url('/find-reviews-by-record/query'), query);
};

export default {
  findReview,
  findReviewsByRecord,

  query: {
    findReview: (params: FirstParameter<typeof findReview>) => ({
      queryKey: ['feature/renter/review', 'findReview', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReview(queryKey.slice().pop()))?.data,
    }),
    findReviewsByRecord: (params: FirstParameter<typeof findReviewsByRecord>) => ({
      queryKey: ['feature/renter/review', 'findReviewsByRecord', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReviewsByRecord(queryKey.slice().pop()))?.data,
    }),
  }
}
