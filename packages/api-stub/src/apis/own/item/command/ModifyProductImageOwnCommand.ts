import { NameValueList } from '~/models';

export interface ModifyProductImageOwnCommand {
  imageId: string;
  nameValueList: NameValueList;
}