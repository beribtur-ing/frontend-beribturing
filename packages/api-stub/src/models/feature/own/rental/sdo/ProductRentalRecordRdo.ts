import { PriceUnit } from '~/models';

export interface ProductRentalRecordRdo {
//from Currency of Price
  amount: number;
  currency: string;
  //from product;
  productId: string;
  title: string;
  description: string;
  //from productCategory
  categoryId: string;
  name: string;
  //from productVariant
  productVariantId: string;
  model: string;
  unit: PriceUnit;
}