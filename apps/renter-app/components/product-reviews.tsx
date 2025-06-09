import {Star, ThumbsUp} from "lucide-react"

interface ProductReviewsProps {
  productId: string
  rating: number
  totalReviews: number
}

const reviews = [
  {
    id: 1,
    user: "Sarah M.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Amazing camera! Perfect for my wedding shoot. Alex was super responsive and the equipment was in pristine condition.",
    helpful: 12,
  },
  {
    id: 2,
    user: "Mike R.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "1 month ago",
    comment:
      "Professional grade equipment at a great price. The lens quality is outstanding and everything worked flawlessly.",
    helpful: 8,
  },
  {
    id: 3,
    user: "Jennifer L.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great camera for video work. Only minor issue was the battery life, but Alex provided extra batteries which solved it.",
    helpful: 5,
  },
]

export function ProductReviews({ productId, rating, totalReviews }: ProductReviewsProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-semibold">Reviews</h2>
        <div className="flex items-center space-x-2">
          <Star className="h-4 sm:h-5 w-4 sm:w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-sm sm:text-base">{rating}</span>
          <span className="text-gray-600 text-sm sm:text-base">({totalReviews} reviews)</span>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="mb-6 sm:mb-8">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-xs sm:text-sm w-4 sm:w-8">{stars}</span>
              <Star className="h-3 sm:h-4 w-3 sm:w-4 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-yellow-400 h-1.5 sm:h-2 rounded-full"
                  style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">
                {stars === 5 ? 89 : stars === 4 ? 25 : stars === 3 ? 8 : stars === 2 ? 3 : 2}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4 sm:space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 sm:pb-6 last:border-b-0">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <img
                src={review.avatar || "/placeholder.svg"}
                alt={review.user}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
                  <span className="font-medium text-sm sm:text-base">{review.user}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 sm:h-4 w-3 sm:w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 mb-3 text-sm sm:text-base">{review.comment}</p>
                <button className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 hover:text-purple-600">
                  <ThumbsUp className="h-3 sm:h-4 w-3 sm:w-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <button className="w-full mt-4 sm:mt-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
        Show All {totalReviews} Reviews
      </button>
    </div>
  )
}
