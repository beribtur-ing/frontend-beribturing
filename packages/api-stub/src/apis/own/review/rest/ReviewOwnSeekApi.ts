import {
  FindReviewOwnQuery,
  FindReviewsByRecordOwnQuery
} from '~/apis';
import { FirstParameter, QueryResponse, Review } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/owner/review/${path}`;

const findReview = <T = Review>(params: { reviewId: string; }) => {
  const query = <FindReviewOwnQuery>{...params};
  return axios.post<QueryResponse<T>>(url('find-review/query'), query);
};

const findReviewsByRecord = <T = Review[]>(params: { recordId: string; }) => {
  const query = <FindReviewsByRecordOwnQuery>{...params};
  return axios.post<QueryResponse<T>>(url('find-reviews-by-record/query'), query);
};

export default {
  findReview,
  findReviewsByRecord,

  query: {
    findReview: (params: FirstParameter<typeof findReview>) => ({
      queryKey: ['feature/owner/review', 'findReview', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReview(queryKey.slice().pop()))?.data,
    }),
    findReviewsByRecord: (params: FirstParameter<typeof findReviewsByRecord>) => ({
      queryKey: ['feature/owner/review', 'findReviewsByRecord', params],
      queryFn: async ({queryKey}: {
        queryKey: readonly any[]
      }) => (await findReviewsByRecord(queryKey.slice().pop()))?.data,
    }),
  }
}
