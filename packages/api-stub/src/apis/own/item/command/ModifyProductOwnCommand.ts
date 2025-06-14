import { NameValueList } from '~/models';

export interface ModifyProductOwnCommand {
  productId: string;
  nameValueList: NameValueList;
}