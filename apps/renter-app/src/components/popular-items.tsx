import { ChevronRight } from 'lucide-react';
import { ProductCard } from './product-card';
import type { ProductVariant } from "~/types/domain";

interface PopularItemsProps {
  variants: ProductVariant[]
  onFavoriteToggle?: (variantId: string) => void
  favoriteIds?: string[]
}

export function PopularItems({ variants, onFavoriteToggle, favoriteIds = [] }: PopularItemsProps) {
  return (
    <section id="popular-items" className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            Popular Items
            <ChevronRight className="h-5 w-5 ml-1" />
          </h2>
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {variants.map((variant) => (
            <ProductCard
              key={variant.id}
              variant={variant}
              onFavoriteToggle={onFavoriteToggle}
              isFavorite={favoriteIds.includes(variant.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
