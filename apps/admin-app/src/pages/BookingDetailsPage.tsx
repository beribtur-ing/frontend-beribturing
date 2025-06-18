import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Check, X, Calendar, DollarSign, Clock } from "lucide-react";
import { mockBookings } from "../lib/mock-data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

export default function BookingDetailsPage() {
  const navigate = useNavigate();
  const { id, locale } = useParams();
  const booking = mockBookings.find((b) => b.id === id) || mockBookings[0];

  const handleCancel = () => {
    // In a real app, this would call an API to cancel the booking
    navigate(`/${locale}/bookings`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${locale}/bookings`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking #{booking?.id}</h1>
            <p className="text-muted-foreground">Booking details and management.</p>
          </div>
        </div>
        <div className="flex gap-2">
          {booking?.status === "pending" && (
            <Button variant="default">
              <Check className="mr-2 h-4 w-4" />
              Approve Booking
            </Button>
          )}
          {booking?.status !== "cancelled" && booking?.status !== "completed" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <X className="mr-2 h-4 w-4" />
                  Cancel Booking
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will cancel the booking and notify both the lendee and lender.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, keep booking</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel} className="bg-destructive text-destructive-foreground">
                    Yes, cancel booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>Details about this booking.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Status:</span>
              </div>
              <Badge
                variant={
                  booking?.status === "active"
                    ? "default"
                    : booking?.status === "completed"
                      ? "secondary"
                      : booking?.status === "pending"
                        ? "outline"
                        : "destructive"
                }
              >
                {booking?.status}
              </Badge>
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
          <CardHeader>
            <CardTitle>Parties Involved</CardTitle>
            <CardDescription>Users involved in this booking.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Property</h3>
              <div className="p-4 border rounded-md">
                <Link 
                  to={`/${locale}/properties/${booking?.propertyId}`} 
                  className="font-medium hover:underline"
                >
                  {booking?.propertyTitle}
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Lendee (Renter)</h3>
              <div className="p-4 border rounded-md">
                <Link 
                  to={`/${locale}/users/${booking?.lendeeId}`} 
                  className="font-medium hover:underline"
                >
                  {booking?.lendeeName}
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Lender (Owner)</h3>
              <div className="p-4 border rounded-md">
                <Link 
                  to={`/${locale}/users/${booking?.lenderId}`} 
                  className="font-medium hover:underline"
                >
                  {booking?.lenderName}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}