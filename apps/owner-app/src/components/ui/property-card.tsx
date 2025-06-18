import type { Product, ProductVariant } from "../../lib/types"
import { PlaceholderImage } from "~/assets"

interface PropertyCardProps {
  product: Product & { variants: ProductVariant[] }
  onEdit?: () => void
  onDelete?: () => void
}

export function PropertyCard({ product, onEdit, onDelete }: PropertyCardProps) {
  const mainVariant = product.variants[0]
  const mainImage = mainVariant?.images[0]

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-40 sm:h-48">
        <img
          src={mainImage?.url || PlaceholderImage}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              mainVariant?.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {mainVariant?.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        {mainVariant && (
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">
              <span className="font-medium">{mainVariant.brand}</span> • {mainVariant.model}
            </div>
            <div className="text-lg font-bold text-blue-600">${mainVariant.price.daily}/day</div>
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="flex-1 px-3 py-2 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-3 py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
