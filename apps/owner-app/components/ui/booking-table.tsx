import type { Reservation, RentalRecord } from "@/lib/types"

type BookingItem = (Reservation | RentalRecord) & { type: "reservation" | "rental" }

interface BookingTableProps {
  bookings: BookingItem[]
}

export function BookingTable({ bookings }: BookingTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {"requester" in booking ? booking.requester.name : booking.lendee.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                    {"requester" in booking ? booking.requester.phoneNumber : booking.lendee.phoneNumber}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.productVariant.brand} {booking.productVariant.model}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                    {booking.productVariant.color} • {booking.productVariant.size}
                  </div>
                </td>
                <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(booking.period.startDate)} - {formatDate(booking.period.endDate)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {booking.type}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {"fee" in booking ? `$${booking.fee}` : `$${booking.productVariant.price.daily}/day`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
