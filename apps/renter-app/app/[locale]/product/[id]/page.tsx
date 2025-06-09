import {ProductGallery} from "@/components/product-gallery"
import {ProductInfo} from "@/components/product-info"
import {BookingCard} from "@/components/booking-card"
import {ProductReviews} from "@/components/product-reviews"
import {SimilarProducts} from "@/components/similar-products"
import {mockProductVariants} from "@/data/mock-data"
import {notFound} from "next/navigation"

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({params}: ProductDetailPageProps) {
  // Find the product variant by ID
  const productVariant = mockProductVariants.find((variant) => variant.id === params.id)

  // If product not found, show 404
  if (!productVariant) {
    notFound()
  }

  // Get similar products (excluding current product)
  const similarVariants = mockProductVariants.filter((variant) => variant.id !== params.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <a href="/" className="hover:text-purple-600 dark:hover:text-purple-400">
                Home
              </a>
              <span className="text-gray-400">/</span>
              <a
                href={`/category/${productVariant.product.category.name.toLowerCase()}`}
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                {productVariant.product.category.name}
              </a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-gray-100 truncate">{productVariant.product.title}</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Images and Info */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <ProductGallery images={productVariant.images.map((img) => img.url)}/>
            <ProductInfo variant={productVariant}/>
            <div className="text-lg font-bold text-gray-900">
              UZS {productVariant.price.toLocaleString()}
            </div>
            <ProductReviews productId={productVariant.id} rating={4.9} totalReviews={127}/>
          </div>

          {/* Right Column - Booking */}
          <div className="xl:col-span-1 order-first xl:order-last">
            <div className="xl:sticky xl:top-24">
              <BookingCard variant={productVariant}/>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts variants={similarVariants}/>
      </div>
    </div>
  )
}
