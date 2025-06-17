import {OffsetQueryRequest, PriceUnit, ProductRdo} from '~/models';

export interface FindProductRdosAdmQuery extends OffsetQueryRequest<ProductRdo[]>{
  // Text search fields
  searchKeyword?: string;           // Search in title, description, brand, model

  // Product filters
  ownerIds?: string[];              // Filter by multiple owners
  categoryIds?: string[];           // Filter by multiple categories

  // Product variant filters
  brands?: string[];                // Filter by multiple brands
  models?: string[];                // Filter by multiple models
  manufacturers?: string[];         // Filter by multiple manufacturers
  colors?: string[];                // Filter by multiple colors
  materials?: string[];             // Filter by multiple materials
  madeInCountries?: string[];       // Filter by multiple countries of origin
  producedYears?: string[];         // Filter by multiple years

  // Price filters
  minPrice?: number;                // Minimum price
  maxPrice?: number;                // Maximum price
  priceUnit?: PriceUnit;            // Filter by price unit (HOURLY, DAILY, WEEKLY)

  // Availability filters
  active?: boolean;                 // Filter by active status
  availableFrom?: string;           // Available from date
  availableUntil?: string;          // Available until date
  isAvailable?: boolean;            // Filter by current availability

  // Date filters
  createdAfter?: string;            // Products created after date
  createdBefore?: string;           // Products created before date
  updatedAfter?: string;            // Products updated after date
  updatedBefore?: string;           // Products updated before date

  // Administrative filters
  hasImages?: boolean;              // Filter products with/without images
  hasVariants?: boolean;            // Filter products with/without variants
}
