import {ProductCard} from "./product-card"
import type {ProductVariant} from "../types/domain"

interface SimilarProductsProps {
  variants: ProductVariant[]
}

export function SimilarProducts({ variants }: SimilarProductsProps) {
  return (
    <div className="mt-12 sm:mt-16">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Similar Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {variants.map((variant) => (
          <ProductCard key={variant.id} variant={variant} />
        ))}
      </div>
    </div>
  )
}
