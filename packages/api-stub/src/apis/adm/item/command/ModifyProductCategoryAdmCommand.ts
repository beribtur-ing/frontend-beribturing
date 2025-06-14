import { NameValueList } from '~/models';

export interface ModifyProductCategoryAdmCommand {
  categoryId: string;
  nameValueList: NameValueList;
}