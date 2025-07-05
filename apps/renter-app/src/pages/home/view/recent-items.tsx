import { ChevronRight, Loader2 } from 'lucide-react';
import { useRecentProducts } from '../hooks/useRecentProducts';
import { Empty } from '~/components/Empty';
import { useState } from 'react';
import { ProductCard } from '~/components/product-card';

export function RecentItems() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRecentProducts();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const handleFavorite = (variantId: string) => {};

  const variants = data?.pages.flatMap((page) => page.result) ?? [];

  return (
    <section id="recent-items" className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            Recent Items
            <ChevronRight className="h-5 w-5 ml-1" />
          </h2>
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm">
            View All
          </button>
        </div>

        {variants.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {variants.map((productRdo) => (
              <ProductCard
                key={productRdo?.product?.id}
                productRdo={productRdo}
                onFavoriteToggle={handleFavorite}
                isFavorite={favoriteIds.includes(productRdo?.product?.id)}
              />
            ))}
          </div>
        ) : (
          <Empty message="No recent items found." />
        )}

        {hasNextPage && variants.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
            >
              <span>{isFetchingNextPage ? 'Loading...' : 'Load More'}</span>
              {isFetchingNextPage && <Loader2 className="h-3 w-3 animate-spin" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
