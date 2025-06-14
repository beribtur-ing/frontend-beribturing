import { NameValueList } from '~/models';

export interface ModifyProductImageAdmCommand {
  imageId: string;
  nameValueList: NameValueList;
}