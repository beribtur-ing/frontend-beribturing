import { BookingTable } from "../components/admin/booking-table";
import { BookingFilters } from "../components/admin/booking-filters";
import { Button } from "../components/ui/button";
import { Calendar } from "lucide-react";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
          <p className="text-muted-foreground">Monitor and manage all rental bookings across the platform.</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Export Bookings
        </Button>
      </div>

      <BookingFilters />
      <BookingTable />
    </div>
  );
}