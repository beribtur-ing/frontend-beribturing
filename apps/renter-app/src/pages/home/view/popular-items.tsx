import { ChevronRight } from 'lucide-react';
import type { ProductVariant } from '~/types/domain';
import { ProductCard } from '~/components/product-card';
import { usePopularProductRdos } from '~/pages/home/hooks/usePopularProductRdos';
import { PopularProductCard } from '~/components/popular-product-card';

interface PopularItemsProps {
  variants: ProductVariant[];
  onFavoriteToggle?: (variantId: string) => void;
  favoriteIds?: string[];
}

export function PopularItems({ variants, onFavoriteToggle, favoriteIds = [] }: PopularItemsProps) {
  const { popularProductRdos } = usePopularProductRdos({ maxCount: 10 });
  console.log(popularProductRdos);

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

        {popularProductRdos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularProductRdos.map((product) => (
              <PopularProductCard
                key={product?.id}
                product={product}
                onFavoriteToggle={onFavoriteToggle}
                isFavorite={favoriteIds.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">No popular items found.</div>
        )}
      </div>
    </section>
  );
}
