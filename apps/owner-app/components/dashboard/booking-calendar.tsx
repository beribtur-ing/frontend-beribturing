"use client"

import { useState, useEffect } from "react"

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  status: string
  type: "reservation" | "rental"
}

export function BookingCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week">("month")

  useEffect(() => {
    // Fetch bookings and convert to calendar events
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((bookings) => {
        const calendarEvents: CalendarEvent[] = bookings.map((booking: any) => ({
          id: booking.id,
          title: `${booking.productVariant.brand} ${booking.productVariant.model}`,
          start: new Date(booking.period.startDate),
          end: new Date(booking.period.endDate),
          status: booking.status,
          type: booking.type,
        }))
        setEvents(calendarEvents)
      })
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getEventsForDay = (date: Date | null) => {
    if (!date) return []
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      return date >= eventStart && date <= eventEnd
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const days = getDaysInMonth(currentDate)

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex space-x-1">
              <button
                onClick={() => setView("month")}
                className={`px-2 py-1 text-xs md:text-sm rounded ${
                  view === "month" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-2 py-1 text-xs md:text-sm rounded ${
                  view === "week" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                Week
              </button>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-1 text-gray-600 hover:text-gray-900"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-2 py-1 text-xs md:text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-1 text-gray-600 hover:text-gray-900"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 md:p-6 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-7 gap-1 mb-2 md:mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-1 md:p-2 text-center text-xs md:text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const dayEvents = getEventsForDay(date)
              const isToday = date && date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`min-h-[80px] md:min-h-[100px] p-1 border border-gray-200 ${
                    date ? "bg-white" : "bg-gray-50"
                  } ${isToday ? "bg-blue-50 border-blue-200" : ""}`}
                >
                  {date && (
                    <>
                      <div
                        className={`text-xs md:text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}
                      >
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate ${getStatusColor(event.status)}`}
                            title={`${event.title} - ${event.status}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Confirmed/Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  )
}
