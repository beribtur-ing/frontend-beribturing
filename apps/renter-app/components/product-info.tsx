"use client"
import {useState} from "react"
import {CheckCircle, MapPin, Shield, Star, X} from "lucide-react"
import type {ProductVariant} from "@/types/domain"

interface ProductInfoProps {
  variant: ProductVariant
}

export function ProductInfo({ variant }: ProductInfoProps) {
  const [showContactModal, setShowContactModal] = useState(false)
  const location = `${variant.product.owner.profile.city}, ${variant.product.owner.profile.state}`

  const features = [
    `Brand: ${variant.brand}`,
    `Model: ${variant.model}`,
    `Year: ${variant.producedYear}`,
    `Made in: ${variant.madeIn}`,
    `Material: ${variant.material}`,
  ]

  const included = [variant.product.title, "User Manual", "All Original Accessories", "Protective Case (if applicable)"]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {variant.product.title} - {variant.brand} {variant.model}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 sm:h-5 w-4 sm:w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">4.9</span>
            <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">(127 reviews)</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm sm:text-base">{location}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Description</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          {variant.product.description}
        </p>
        {variant.notes && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base mt-2 italic">
            Owner's note: {variant.notes}
          </p>
        )}
      </div>

      {/* Specifications */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Specifications</h2>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{feature}</span>
            </li>
          ))}
          {variant.size && (
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                Dimensions: {variant.size.length}×{variant.size.width}×{variant.size.height} {variant.size.unit}
              </span>
            </li>
          )}
          {variant.size?.weight && (
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                Weight: {variant.size.weight}g
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* What's Included */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{"What's Included"}</h2>
        <ul className="space-y-2">
          {included.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lender Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Meet Your Lender</h2>
        <div className="flex items-start space-x-3 sm:space-x-4">
          <img
            src={variant.product.owner.profile.profilePictureUrl || "/placeholder.svg"}
            alt={variant.product.owner.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-base sm:text-lg truncate text-gray-900 dark:text-gray-100">
                {variant.product.owner.profile.firstName} {variant.product.owner.profile.lastName}
              </h3>
              <Shield className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-3 sm:h-4 w-3 sm:w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8 (89 reviews)</span>
              </div>
              <span>Responds within 1 hour</span>
            </div>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
            >
              Contact Lender
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Lender</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img
                src={variant.product.owner.profile.profilePictureUrl || "/placeholder.svg"}
                alt={variant.product.owner.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {variant.product.owner.profile.firstName} {variant.product.owner.profile.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Usually responds within 1 hour</p>
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                alert("Message sent to lender!")
                setShowContactModal(false)
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="Hi! I'm interested in renting this item. Is it available for the dates I need?"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
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
          </div>
        </div>
      )}
    </div>
  )
}
