import {
  ModifyReviewRntCommand,
  RegisterReviewRntCommand,
  RemoveReviewRntCommand
} from '~/apis';
import { CommandResponse, NameValueList, ReviewCdo } from '~/models';
import axios from "axios";

const url = (path: string) => `/api/feature/renter/review/${path}`;

const registerReview = (variables: {
  reviewCdo: ReviewCdo;
}) => {
  const command = <RegisterReviewRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/register-review/command'), command);
};

const modifyReview = (variables: {
  reviewId: string;
  nameValueList: NameValueList;
}) => {
  const command = <ModifyReviewRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/modify-review/command'), command);
};

const removeReview = (variables: {
  reviewId: string;
}) => {
  const command = <RemoveReviewRntCommand>{...variables};
  return axios.post<CommandResponse<string>>(url('/remove-review/command'), command);
};

export default {
  registerReview,
  modifyReview,
  removeReview,
}
