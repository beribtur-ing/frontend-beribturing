import type React from 'react';

import { Heart, MapPin, Star } from 'lucide-react';
import { ProductAvailability, type ProductVariant, PopularProductRdo } from '../types/domain';
import { Link } from 'react-router-dom';
import Camera from '~/assets/camera.png';
import Drill from '~/assets/drill.png';
import Tent from '~/assets/tent.png';
import Bike from '~/assets/bike.png';
import PS5 from '~/assets/ps5.png';

interface ProductCardProps {
  product: PopularProductRdo;
  onFavoriteToggle?: (variantId: string) => void;
  isFavorite?: boolean;
}

export function PopularProductCard({ product, onFavoriteToggle, isFavorite = false }: ProductCardProps) {
  // Add null checks to prevent errors
  if (!product) {
    return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">Product data unavailable</div>;
  }

  // Safely access nested properties with optional chaining
  const location = product?.address || 'Location unavailable';

  // Calculate discount if available
  const originalPrice = product?.priceAmount; // Simulate original price
  const currentPrice = product?.priceAmount;
  const discountPercentage = 0;

  // const getAvailabilityBadge = () => {
  //   switch (product.availability) {
  //     case ProductAvailability.AVAILABLE:
  //       return { text: 'Available', color: 'bg-green-600' };
  //     case ProductAvailability.RENTED:
  //       return { text: 'Rented', color: 'bg-red-600' };
  //     case ProductAvailability.MAINTENANCE:
  //       return { text: 'Maintenance', color: 'bg-yellow-600' };
  //     default:
  //       return { text: 'Unavailable', color: 'bg-gray-600' };
  //   }
  // };

  // const badge = getAvailabilityBadge();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border dark:border-gray-700 h-full flex flex-col">
        <div className="relative">
          <img src={product.url} alt={product?.title || 'Product'} className="w-full h-48 object-cover" />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center transition-colors z-10 ${
              isFavorite ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-white/80 hover:bg-white text-gray-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-3 flex-1 flex flex-col">
          {/*<h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2 line-clamp-2">*/}
          {/*  {variant.product?.title || 'Unnamed Product'}*/}
          {/*  {variant.brand && variant.model ? ` - ${variant.brand} ${variant.model}` : ''}*/}
          {/*</h3>*/}

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
                UZS {currentPrice?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/day</span>
            </div>
            {discountPercentage > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 line-through">UZS {originalPrice?.toLocaleString()}</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">-{discountPercentage}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
