"use client"
import {useState} from "react"

import {useAuth} from "@/hooks"
import {Calendar, CheckCircle, Clock, MapPin, MessageCircle, Package, RotateCcw, Star, X} from "lucide-react"
import {useRouter} from "@/i18n/navigation"

// Mock rental data
const mockRentals = [
  {
    id: "rental-1",
    productTitle: "Professional DSLR Camera Canon EOS R5",
    productImage: "/placeholder.svg?height=200&width=200",
    lenderName: "Alex Photography",
    lenderAvatar: "/placeholder.svg?height=40&width=40",
    startDate: "2024-02-15",
    endDate: "2024-02-18",
    status: "active",
    totalAmount: 1687500, // 135 USD * 12,500
    location: "San Francisco, CA",
    rating: null,
  },
  {
    id: "rental-2",
    productTitle: "Power Drill Set Complete with Case",
    productImage: "/placeholder.svg?height=200&width=200",
    lenderName: "Mike's Tools",
    lenderAvatar: "/placeholder.svg?height=40&width=40",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    status: "completed",
    totalAmount: 625000, // 50 USD * 12,500
    location: "Austin, TX",
    rating: 5,
  },
  {
    id: "rental-3",
    productTitle: "4-Person Camping Tent Waterproof",
    productImage: "/placeholder.svg?height=200&width=200",
    lenderName: "Outdoor Adventures",
    lenderAvatar: "/placeholder.svg?height=40&width=40",
    startDate: "2024-02-20",
    endDate: "2024-02-23",
    status: "upcoming",
    totalAmount: 1312500, // 105 USD * 12,500
    location: "Denver, CO",
    rating: null,
  },
]

export default function RentalsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [rentals] = useState(mockRentals)
  const [contactModalRental, setContactModalRental] = useState<string | null>(null)

  // Redirect if not authenticated
  if (!user) {
    router.push("/auth/signin")
    return null
  }

  const filteredRentals = rentals.filter((rental) => {
    if (activeTab === "all") return true
    return rental.status === activeTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return { text: "Active", color: "bg-green-100 text-green-800" }
      case "completed":
        return { text: "Completed", color: "bg-gray-100 text-gray-800" }
      case "upcoming":
        return { text: "Upcoming", color: "bg-blue-100 text-blue-800" }
      default:
        return { text: "Unknown", color: "bg-gray-100 text-gray-800" }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "upcoming":
        return <Calendar className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <a href="/" className="hover:text-purple-600 dark:hover:text-purple-400">
                Home
              </a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-gray-100">My Rentals</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">My Rentals</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6 overflow-x-auto">
          {[
            { id: "all", label: "All Rentals" },
            { id: "active", label: "Active" },
            { id: "upcoming", label: "Upcoming" },
            { id: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Rentals List */}
        {filteredRentals.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No rentals found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {activeTab === "all" ? "You haven't rented any items yet." : `You don't have any ${activeTab} rentals.`}
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Start Browsing
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRentals.map((rental) => {
              const statusBadge = getStatusBadge(rental.status)
              const statusIcon = getStatusIcon(rental.status)

              return (
                <div
                  key={rental.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={rental.productImage || "/placeholder.svg"}
                        alt={rental.productTitle}
                        className="w-full lg:w-32 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Rental Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {rental.productTitle}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span
                              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}
                            >
                              {statusIcon}
                              <span>{statusBadge.text}</span>
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            UZS {rental.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                        </div>
                      </div>

                      {/* Rental Period */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(rental.startDate).toLocaleDateString()} -{" "}
                            {new Date(rental.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{rental.location}</span>
                        </div>
                      </div>

                      {/* Lender Info */}
                      <div className="flex items-center space-x-3">
                        <img
                          src={rental.lenderAvatar || "/placeholder.svg"}
                          alt={rental.lenderName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {rental.lenderName}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setContactModalRental(rental.id)}
                          className="flex items-center space-x-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Contact Lender</span>
                        </button>

                        {rental.status === "completed" && !rental.rating && (
                          <button className="flex items-center space-x-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                            <Star className="h-4 w-4" />
                            <span>Leave Review</span>
                          </button>
                        )}

                        {rental.status === "completed" && (
                          <button className="flex items-center space-x-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                            <RotateCcw className="h-4 w-4" />
                            <span>Rent Again</span>
                          </button>
                        )}

                        {rental.rating && (
                          <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
                            <Star className="h-4 w-4 fill-current" />
                            <span>Rated {rental.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Contact Lender Modal */}
      {contactModalRental && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Lender</h3>
              <button
                onClick={() => setContactModalRental(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {(() => {
              const rental = rentals.find((r) => r.id === contactModalRental)
              if (!rental) return null

              return (
                <>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <img
                      src={rental.lenderAvatar || "/placeholder.svg?height=40&width=40"}
                      alt={rental.lenderName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{rental.lenderName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Usually responds within 1 hour</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Rental:</strong> {rental.productTitle}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      {new Date(rental.startDate).toLocaleDateString()} -{" "}
                      {new Date(rental.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert("Message sent to lender!")
                      setContactModalRental(null)
                    }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Hi! I have a question about my rental..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setContactModalRental(null)}
                        className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
