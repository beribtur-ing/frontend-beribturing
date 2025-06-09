"use client"

import { useEffect, useState } from "react"
import { BookingTable } from "@/components/ui/booking-table"
import type { Reservation, RentalRecord } from "@/lib/types"
import Link from "next/link"

type BookingItem = (Reservation | RentalRecord) & { type: "reservation" | "rental" }

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "active" | "completed">("all")

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data)
        setLoading(false)
      })
  }, [])

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true
    return booking.status.toLowerCase() === filter
  })

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow h-96"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-sm md:text-base text-gray-600">Manage your rental bookings and reservations</p>
        </div>
        <Link
          href="/dashboard/bookings/calendar"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center sm:text-left"
        >
          Calendar View
        </Link>
      </div>

      <div className="mb-6 overflow-x-auto">
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "confirmed", "active", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 py-2 text-xs md:text-sm font-medium rounded-lg capitalize ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <BookingTable bookings={filteredBookings} />

      {filteredBookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">
            {filter === "all" ? "You don't have any bookings yet." : `No ${filter} bookings at the moment.`}
          </p>
        </div>
      )}
    </div>
  )
}
