import { HideReviewAdmCommand } from '~/apis';
import { CommandResponse } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/admin/review/${path}`;

const hideReview = (variables: {
  reviewId: string;
}) => {
  const command = <HideReviewAdmCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('hide-review/command'), command);
};

export default {
  hideReview,
};
