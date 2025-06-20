import { BookingTable } from "../components/admin/booking-table";
import { BookingFilters } from "../components/admin/booking-filters";
import { Button, Typography, Box } from "@mui/material";
import { Calendar } from "lucide-react";

export default function BookingsPage() {
  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, justifyContent: 'space-between', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Booking Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage all rental bookings across the platform.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Calendar size={16} />}>
          Export Bookings
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <BookingFilters />
      </Box>
      <BookingTable />
    </Box>
  );
}