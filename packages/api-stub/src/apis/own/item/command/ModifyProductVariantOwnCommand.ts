import { NameValueList } from '~/models';

export interface ModifyProductVariantOwnCommand {
  variantId: string;
  nameValueList: NameValueList;
}