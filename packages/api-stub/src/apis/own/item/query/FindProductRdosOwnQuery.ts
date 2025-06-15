import { ProductSearchQdo } from '~/models';

export interface FindProductRdosOwnQuery {
  // Text search fields
  searchKeyword?: string;           // Search in title, description, brand, model

  // Product filters (Note: ownerId will be set from authentication context)
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

  // Availability filters
  active?: boolean;                 // Filter by active status
  availableFrom?: string;           // Available from date (ISO string)
  availableUntil?: string;          // Available until date (ISO string)
  isAvailable?: boolean;            // Filter by current availability

  // Date filters
  createdAfter?: string;            // Products created after date (ISO string)
  createdBefore?: string;           // Products created before date (ISO string)
  updatedAfter?: string;            // Products updated after date (ISO string)
  updatedBefore?: string;           // Products updated before date (ISO string)

  // Administrative filters
  hasImages?: boolean;              // Filter products with/without images
  hasVariants?: boolean;            // Filter products with/without variants

  // Pagination
  offset?: number;
  limit?: number;
}