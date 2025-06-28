import { ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ProductCard } from '../../../components/product-card';
import type { ProductVariant } from '~/types/domain';

interface RecentItemsProps {
  variants: ProductVariant[];
  onFavoriteToggle?: (variantId: string) => void;
  favoriteIds?: string[];
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
}

export function RecentItems({ 
  variants, 
  onFavoriteToggle, 
  favoriteIds = [], 
  onLoadMore,
  hasMore = true 
}: RecentItemsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (!onLoadMore || isLoading) return;
    
    setIsLoading(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* View More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
            >
              <span>View More</span>
              {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
