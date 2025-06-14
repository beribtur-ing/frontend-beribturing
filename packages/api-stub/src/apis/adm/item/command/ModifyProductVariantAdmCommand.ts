import { NameValueList } from '~/models';

export interface ModifyProductVariantAdmCommand {
  variantId: string;
  nameValueList: NameValueList;
}