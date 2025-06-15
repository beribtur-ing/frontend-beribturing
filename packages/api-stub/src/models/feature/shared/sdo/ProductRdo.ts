import {Product, ProductCategory} from '~/models';
import {ProductVariantRdo} from './ProductVariantRdo';

export interface ProductRdo {
  product: Product;
  category: ProductCategory;
  variantRdos: ProductVariantRdo[];
}
