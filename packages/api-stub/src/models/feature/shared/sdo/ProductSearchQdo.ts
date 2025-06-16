import { PriceUnit } from '../../../aggregate/item/vo/PriceUnit';

export interface ProductSearchQdo {
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
  minPrice?: number;                // Minimum price (BigDecimal -> number)
  maxPrice?: number;                // Maximum price (BigDecimal -> number)
  priceUnit?: PriceUnit;            // Filter by price unit (HOURLY, DAILY, WEEKLY)

  // Availability filters
  active?: boolean;                 // Filter by active status
  availableFrom?: string;           // Available from date (LocalDateTime -> string)
  availableUntil?: string;          // Available until date (LocalDateTime -> string)
  isAvailable?: boolean;            // Filter by current availability

  // Date filters
  createdAfter?: string;            // Products created after date (LocalDateTime -> string)
  createdBefore?: string;           // Products created before date (LocalDateTime -> string)
  updatedAfter?: string;            // Products updated after date (LocalDateTime -> string)
  updatedBefore?: string;           // Products updated before date (LocalDateTime -> string)

  // Administrative filters
  hasImages?: boolean;              // Filter products with/without images
  hasVariants?: boolean;            // Filter products with/without variants
}
