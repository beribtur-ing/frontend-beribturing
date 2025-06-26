import { ProductVariant, ProductImage } from '~/models';


export interface ProductVariantRdo {
  variant: ProductVariant;
  images: ProductImage[];
}
