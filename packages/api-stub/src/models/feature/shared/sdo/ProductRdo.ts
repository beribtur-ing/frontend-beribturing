import { Product, ProductCategory, ProductVariantRdo } from '~/models';


export interface ProductRdo {
  product: Product;
  category: ProductCategory;
  variantRdos: ProductVariantRdo[];
}
