import { NameValueList } from '~/models';

export interface ModifyReviewRntCommand {
  reviewId: string;
  nameValueList: NameValueList;
}