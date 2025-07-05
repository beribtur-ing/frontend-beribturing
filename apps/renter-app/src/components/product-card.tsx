import type React from 'react';

import { Heart, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductRdo } from '@beribturing/api-stub';

interface ProductCardProps {
  productRdo: ProductRdo;
  onFavoriteToggle?: (variantId: string) => void;
  isFavorite?: boolean;
}

export function ProductCard({ productRdo, onFavoriteToggle, isFavorite = false }: ProductCardProps) {
  // Add null checks to prevent errors
  if (!productRdo) {
    return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">Product data unavailable</div>;
  }

  // Safely access images with null checks
  const images: string[] =
    productRdo?.variantRdos
      ?.flatMap((rdo) => rdo.images || [])
      .filter((image) => image.url)
      .map((image) => image.url) || [];

  // Safely access nested properties with optional chaining
  const location = 'Location unavailable';
  const selectedVariant = productRdo?.variantRdos?.[0]?.variant;

  // Calculate discount if available
  const originalPrice = selectedVariant?.price?.currency || 0;
  const currentPrice = selectedVariant?.price?.currency || 0;
  const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  const badge = { text: 'Available', color: 'bg-green-600' };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(selectedVariant?.id);
  };

  return (
    <Link to={`/product/${productRdo?.product?.id}`} className="block h-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border dark:border-gray-700 h-full flex flex-col">
        <div className="relative">
          <img src={images[0]} alt={productRdo?.product?.title || 'Product'} className="w-full h-48 object-cover" />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center transition-colors z-10 ${
              isFavorite ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-white/80 hover:bg-white text-gray-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <span className={`absolute top-2 left-2 ${badge.color} text-white text-xs px-2 py-1 rounded-md font-medium`}>
            {badge.text}
          </span>
        </div>

        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2 line-clamp-2">
            {productRdo?.product?.title || 'Unnamed Product'}
            {selectedVariant?.brand && selectedVariant?.model
              ? ` - ${selectedVariant?.brand} ${selectedVariant?.model}`
              : ''}
          </h3>

          <div className="flex items-center space-x-1 mb-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              4.8 (127) {/* This would come from aggregated reviews */}
            </span>
          </div>

          <div className="flex items-center space-x-1 mb-3">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{location}</span>
          </div>

          <div className="space-y-1 mt-auto">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                UZS {currentPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/day</span>
            </div>
            {discountPercentage > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 line-through">UZS {originalPrice.toLocaleString()}</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">-{discountPercentage}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
