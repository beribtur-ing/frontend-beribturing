import { NameValueList } from '~/models';

export interface ModifyProductAdmCommand {
  productId: string;
  nameValueList: NameValueList;
}