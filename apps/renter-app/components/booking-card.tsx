"use client"
import {useState} from "react"
import {Calendar, Clock, Heart, MessageCircle, Shield} from "lucide-react"
import type {ProductVariant} from "@/types/domain"

interface BookingCardProps {
  variant: ProductVariant
}

export function BookingCard({ variant }: BookingCardProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [days, setDays] = useState(1)

  const calculateTotal = () => {
    const dailyRate = variant.price.dailyRate.amount
    let rate = dailyRate

    // Use weekly rate if available and rental is 7+ days
    if (days >= 7 && variant.price.weeklyRate) {
      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7
      rate = weeks * variant.price.weeklyRate.amount + remainingDays * dailyRate
    } else if (days >= 30 && variant.price.monthlyRate) {
      // Use monthly rate if available and rental is 30+ days
      const months = Math.floor(days / 30)
      const remainingDays = days % 30
      rate = months * variant.price.monthlyRate.amount + remainingDays * dailyRate
    } else {
      rate = dailyRate * days
    }

    const serviceFee = rate * 0.1
    const total = rate + serviceFee
    return { subtotal: rate, serviceFee, total }
  }

  const { subtotal, serviceFee, total } = calculateTotal()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border dark:border-gray-700 shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            UZS {variant.price.dailyRate.amount.toLocaleString()}
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">/day</span>
        </div>
        {variant.price.weeklyRate && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Weekly: UZS {variant.price.weeklyRate.amount.toLocaleString()}
          </div>
        )}
        {variant.price.monthlyRate && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Monthly: UZS {variant.price.monthlyRate.amount.toLocaleString()}
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            {[1, 2, 3, 4, 5, 6, 7, 14, 30].map((day) => (
              <option key={day} value={day}>
                {day} {day === 1 ? "day" : "days"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-4 border-t dark:border-gray-700">
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600 dark:text-gray-400">
            UZS {variant.price.dailyRate.amount.toLocaleString()} × {days} days
          </span>
          <span className="text-gray-900 dark:text-gray-100">UZS {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-600 dark:text-gray-400">Service fee</span>
          <span className="text-gray-900 dark:text-gray-100">UZS {serviceFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t dark:border-gray-700">
          <span className="text-gray-900 dark:text-gray-100">Total</span>
          <span className="text-gray-900 dark:text-gray-100">
            UZS {total.toLocaleString()} {variant.price.dailyRate.currencyCode}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => {
            // In a real app, this would navigate to booking flow
            alert(`Reserving ${variant.product.title} for ${days} days. Total: $${total.toFixed(2)}`)
          }}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
          Reserve Now
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              // In a real app, this would add to favorites
              alert("Added to favorites!")
            }}
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm text-gray-700 dark:text-gray-300"
          >
            <Heart className="h-4 w-4" />
            <span>Save</span>
          </button>

          <button
            onClick={() => {
              // In a real app, this would open chat or contact form
              alert("Opening chat with lender...")
            }}
            className="border border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat</span>
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-3 pt-4 border-t dark:border-gray-700">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <Shield className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
          <span>Protected by RentHub Guarantee</span>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span>Free cancellation up to 24 hours</span>
        </div>
      </div>
    </div>
  )
}
