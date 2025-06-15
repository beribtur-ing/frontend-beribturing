import { ProductCategory } from '~/models';

export interface ProductCategoryRdo {
  category: ProductCategory;
  subCategories?: ProductCategoryRdo[];
}
