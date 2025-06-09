import {ProductCard} from "@/components/product-card"
import {mockProductVariants} from "@/data/mock-data"


interface CategoryPageProps {
  params: {
    slug: string[]
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryPath = params.slug.join(" / ")
  const categoryName = params.slug[params.slug.length - 1].replace(/-/g, " ")

  // Filter products based on category - in a real app, this would be a backend query
  // For now, just return all mock products to avoid the error
  const categoryProducts = mockProductVariants

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600 overflow-x-auto">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <a href="/" className="hover:text-purple-600">
                Home
              </a>
              {params.slug.map((segment, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-400">/</span>
                  <span className={index === params.slug.length - 1 ? "text-gray-900" : "hover:text-purple-600"}>
                    {segment.replace(/-/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Category Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-4">Filters</h3>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">UZS 0 - UZS 312,500</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">UZS 312,500 - UZS 625,000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">UZS 625,000 - UZS 1,250,000</span>
                  </label>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Location</h4>
                <input
                  type="text"
                  placeholder="Enter city or zip code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium mb-2">Rating</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">4.5+ stars</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">4.0+ stars</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{categoryName}</h1>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((variant) => (
                <ProductCard key={variant.id} variant={variant} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
