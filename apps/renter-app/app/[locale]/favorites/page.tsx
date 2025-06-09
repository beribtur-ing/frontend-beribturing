"use client"
import {useState} from "react"
import {Heart, MapPin, DollarSign, Star, Trash2} from "lucide-react"

interface FavoriteItem {
  id: number
  title: string
  price: number
  originalPrice: number
  period: string
  rating: number
  reviews: number
  location: string
  image: string
  discount: number
  badge: string
  badgeColor: string
  dateAdded: string
}

const initialFavorites: FavoriteItem[] = [
  {
    id: 1,
    title: "Professional DSLR Camera Canon EOS R5",
    price: 562500,
    originalPrice: 750000,
    period: "day",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=200&width=200",
    discount: 25,
    badge: "Super deal",
    badgeColor: "bg-purple-600",
    dateAdded: "2 days ago",
  },
  {
    id: 2,
    title: "Power Drill Set Complete with Case",
    price: 312500,
    originalPrice: 437500,
    period: "day",
    rating: 4.8,
    reviews: 89,
    location: "Austin, TX",
    image: "/placeholder.svg?height=200&width=200",
    discount: 29,
    badge: "Original",
    badgeColor: "bg-green-600",
    dateAdded: "1 week ago",
  },
  {
    id: 3,
    title: "4-Person Camping Tent Waterproof",
    price: 437500,
    originalPrice: 625000,
    period: "day",
    rating: 4.7,
    reviews: 156,
    location: "Denver, CO",
    image: "/placeholder.svg?height=200&width=200",
    discount: 30,
    badge: "Super deal",
    badgeColor: "bg-purple-600",
    dateAdded: "3 days ago",
  },
  {
    id: 4,
    title: "Mountain Bike Premium Carbon Frame",
    price: 500000,
    originalPrice: 687500,
    period: "day",
    rating: 4.9,
    reviews: 203,
    location: "Portland, OR",
    image: "/placeholder.svg?height=200&width=200",
    discount: 27,
    badge: "Bestseller",
    badgeColor: "bg-orange-600",
    dateAdded: "5 days ago",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites)

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  const reserve = (item: FavoriteItem) => {
    //
    console.log("Reserved:", item.title)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <a href="/" className="hover:text-purple-600">
                Home
              </a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Favorites</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">
              {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Sort by: Recently Added</option>
                <option>Sort by: Price Low to High</option>
                <option>Sort by: Price High to Low</option>
                <option>Sort by: Rating</option>
              </select>
            </div>
          )}
        </div>

        {favorites.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start browsing and save items you love to see them here. Click the heart icon on any item to add it to
              your favorites.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Start Browsing
            </a>
          </div>
        ) : (
          // Favorites Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-2 right-2 h-8 w-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                  {item.badge && (
                    <span
                      className={`absolute top-2 left-2 ${item.badgeColor} text-white text-xs px-2 py-1 rounded-md font-medium`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{item.title}</h3>

                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{item.location}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">UZS {item.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">/{item.period}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400 line-through">UZS {item.originalPrice.toLocaleString()}</span>
                      <span className="text-sm text-green-600 font-medium">-{item.discount}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Added {item.dateAdded}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => reserve(item)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1 text-sm"
                    >
                      <DollarSign className="h-4 w-4" />
                      <span>Reserve</span>
                    </button>
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
