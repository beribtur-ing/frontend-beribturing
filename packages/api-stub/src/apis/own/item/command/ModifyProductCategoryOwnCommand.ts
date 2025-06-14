import { NameValueList } from '~/models';

export interface ModifyProductCategoryOwnCommand {
  categoryId: string;
  nameValueList: NameValueList;
}