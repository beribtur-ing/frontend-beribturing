import { ProductVariant } from '../../../aggregate/item/ProductVariant';
import { ProductImage } from '../../../aggregate/item/ProductImage';

export interface ProductVariantRdo {
  variant: ProductVariant;
  images: ProductImage[];
}
