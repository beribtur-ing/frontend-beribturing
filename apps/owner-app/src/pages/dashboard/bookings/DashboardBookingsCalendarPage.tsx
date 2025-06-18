import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BookingCalendar } from "../../../components/dashboard/booking-calendar";

export default function DashboardBookingsCalendarPage() {
  const { locale } = useParams();

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <Link
          to={`/${locale}/dashboard/bookings`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2 md:mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Bookings
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Calendar View</h1>
        <p className="text-sm md:text-base text-gray-600">Visual overview of your bookings and reservations</p>
      </div>

      <BookingCalendar />
    </div>
  );
}