import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
} from '@mui/material';
import { ArrowLeft, Check, X, Calendar, DollarSign, Clock } from 'lucide-react';
import { mockBookings } from '../lib/mock-data';
import { useState } from 'react';

export default function BookingDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const booking = mockBookings.find((b) => b.id === id) || mockBookings[0];
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleCancel = () => {
    setShowCancelDialog(false);
    // In a real app, this would call an API to cancel the booking
    navigate(`/bookings`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: { sm: 'space-between' },
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => navigate(`/bookings`)}>
            <ArrowLeft size={20} />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Booking #{booking?.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Booking details and management.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {booking?.status === 'pending' && (
            <Button variant="default">
              <Check className="mr-2 h-4 w-4" />
              Approve Booking
            </Button>
          )}
          {booking?.status !== 'cancelled' && booking?.status !== 'completed' && (
            <Button color="error" onClick={() => setShowCancelDialog(true)} startIcon={<X size={16} />}>
              Cancel Booking
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Card>
          <CardHeader title="Booking Information" subheader="Details about this booking." />
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Status:</span>
              </div>
              <Chip
                label={booking?.status}
                color={
                  booking?.status === 'active'
                    ? 'primary'
                    : booking?.status === 'completed'
                    ? 'success'
                    : booking?.status === 'pending'
                    ? 'warning'
                    : 'error'
                }
                size="small"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Start Date:</span>
              </div>
              <span>{new Date(booking?.startDate || '').toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">End Date:</span>
              </div>
              <span>{new Date(booking?.endDate || '').toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Total Amount:</span>
              </div>
              <span>${booking?.totalAmount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
              </div>
              <span>{new Date(booking?.createdAt || '').toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Parties Involved" subheader="Users involved in this booking." />
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Property</h3>
              <div className="p-4 border rounded-md">
                <Link to={`/properties/${booking?.propertyId}`} className="font-medium hover:underline">
                  {booking?.propertyTitle}
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Lendee (Renter)</h3>
              <div className="p-4 border rounded-md">
                <Link to={`/users/${booking?.lendeeId}`} className="font-medium hover:underline">
                  {booking?.lendeeName}
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Lender (Owner)</h3>
              <div className="p-4 border rounded-md">
                <Link to={`/users/${booking?.lenderId}`} className="font-medium hover:underline">
                  {booking?.lenderName}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>This will cancel the booking and notify both the lendee and lender.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)}>No, keep booking</Button>
          <Button onClick={handleCancel} color="error" variant="contained">
            Yes, cancel booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
