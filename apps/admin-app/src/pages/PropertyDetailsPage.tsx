import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Edit, Trash2, Flag, CheckCircle, X } from "lucide-react";
import { mockProperties, mockBookings } from "../lib/mock-data";
import { PlaceholderImage } from "~/assets";
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

export default function PropertyDetailsPage() {
  const navigate = useNavigate();
  const { id, locale } = useParams();
  const property = mockProperties.find((p) => p.id === id) || mockProperties[0];
  const propertyBookings = mockBookings.filter((b) => b.propertyId === property?.id);

  const handleDelete = () => {
    navigate(`/${locale}/properties`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${locale}/properties`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{property?.title}</h1>
            <p className="text-muted-foreground">Property details and management.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/${locale}/properties/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Property
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Property
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the property and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative w-full h-48 mb-4">
                <img
                  src={property?.images[0] || PlaceholderImage}
                  alt={property?.title || "Property Image"}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <Badge
                variant={
                  property?.status === "active"
                    ? "default"
                    : property?.status === "pending"
                      ? "secondary"
                      : property?.status === "flagged"
                        ? "destructive"
                        : "outline"
                }
                className="mb-2"
              >
                {property?.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Owner:</span>
                <Link to={`/${locale}/users/${property?.ownerId}`} className="text-primary hover:underline">
                  {property?.owner}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span>{property?.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span>
                  ${property?.price}/{property?.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>{new Date(property?.createdAt || '').toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Bookings:</span>
                <span>{property?.totalBookings}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {property?.status === "pending" && (
                <>
                  <Button variant="default" className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Property
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    Reject Property
                  </Button>
                </>
              )}
              {property?.status !== "flagged" && (
                <Button variant="outline" className="w-full">
                  <Flag className="mr-2 h-4 w-4" />
                  Flag Property
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{property?.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="bookings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                  <CardDescription>All bookings for this property.</CardDescription>
                </CardHeader>
                <CardContent>
                  {propertyBookings.length > 0 ? (
                    <div className="space-y-4">
                      {propertyBookings.map((booking) => (
                        <div key={booking.id} className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              <Link to={`/${locale}/users/${booking.lendeeId}`} className="hover:underline">
                                {booking.lendeeName}
                              </Link>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.startDate).toLocaleDateString()} -{" "}
                              {new Date(booking.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              booking.status === "active"
                                ? "default"
                                : booking.status === "completed"
                                  ? "secondary"
                                  : booking.status === "pending"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No bookings found for this property.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                  <CardDescription>User reviews for this property.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No reviews found for this property.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Reports filed against this property.</CardDescription>
                </CardHeader>
                <CardContent>
                  {property?.status === "flagged" ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Inappropriate content</p>
                          <p className="text-sm text-muted-foreground">Reported by John Doe on May 15, 2024</p>
                          <p className="mt-2">
                            The listing contains misleading information about the product condition.
                          </p>
                        </div>
                        <Badge variant="destructive">Unresolved</Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No reports found for this property.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}