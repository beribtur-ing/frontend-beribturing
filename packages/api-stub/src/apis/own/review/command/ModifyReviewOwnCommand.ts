import { NameValueList } from '~/models';

export interface ModifyReviewOwnCommand {
  reviewId: string;
  nameValueList: NameValueList;
}