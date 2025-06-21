import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Flag, CheckCircle, X } from 'lucide-react';
import { mockProperties, mockBookings } from '../lib/mock-data';
import { PlaceholderImage } from '~/assets';

export default function PropertyDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const property = mockProperties.find((p) => p.id === id) || mockProperties[0];
  const propertyBookings = mockBookings.filter((b) => b.propertyId === property?.id);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('bookings');

  const handleDelete = () => {
    setShowDeleteDialog(false);
    navigate(`/properties`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/properties`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{property?.title}</h1>
            <p className="text-muted-foreground">Property details and management.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/properties/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Property
            </Link>
          </Button>
          <Button color="error" onClick={() => setShowDeleteDialog(true)} startIcon={<Trash2 size={16} />}>
            Delete Property
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative w-full h-48 mb-4">
                <img
                  src={property?.images[0] || PlaceholderImage}
                  alt={property?.title || 'Property Image'}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <Chip
                label={property?.status}
                color={
                  property?.status === 'active'
                    ? 'success'
                    : property?.status === 'pending'
                    ? 'warning'
                    : property?.status === 'flagged'
                    ? 'error'
                    : 'default'
                }
                sx={{ mb: 1 }}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Owner:</span>
                <Link to={`/users/${property?.ownerId}`} className="text-primary hover:underline">
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
              {property?.status === 'pending' && (
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
              {property?.status !== 'flagged' && (
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
            <CardHeader title="Description" />
            <CardContent>
              <p>{property?.description}</p>
            </CardContent>
          </Card>

          <TabContext value={activeTab}>
            <TabList onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Bookings" value="bookings" />
              <Tab label="Reviews" value="reviews" />
              <Tab label="Reports" value="reports" />
            </TabList>

            <TabPanel value="bookings">
              <Card>
                <CardHeader title="Booking History" subheader="All bookings for this property." />
                <CardContent>
                  {propertyBookings.length > 0 ? (
                    <div className="space-y-4">
                      {propertyBookings.map((booking) => (
                        <div key={booking.id} className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              <Link to={`/users/${booking.lendeeId}`} className="hover:underline">
                                {booking.lendeeName}
                              </Link>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.startDate).toLocaleDateString()} -{' '}
                              {new Date(booking.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Chip
                            label={booking.status}
                            color={
                              booking.status === 'active'
                                ? 'primary'
                                : booking.status === 'completed'
                                ? 'success'
                                : booking.status === 'pending'
                                ? 'warning'
                                : 'error'
                            }
                            size="small"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No bookings found for this property.</p>
                  )}
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel value="reviews">
              <Card>
                <CardHeader title="Reviews" subheader="User reviews for this property." />
                <CardContent>
                  <p className="text-muted-foreground">No reviews found for this property.</p>
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel value="reports">
              <Card>
                <CardHeader title="Reports" subheader="Reports filed against this property." />
                <CardContent>
                  {property?.status === 'flagged' ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Inappropriate content</p>
                          <p className="text-sm text-muted-foreground">Reported by John Doe on May 15, 2024</p>
                          <p className="mt-2">
                            The listing contains misleading information about the product condition.
                          </p>
                        </div>
                        <Chip label="Unresolved" color="error" size="small" />
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No reports found for this property.</p>
                  )}
                </CardContent>
              </Card>
            </TabPanel>
          </TabContext>
        </div>
      </div>

      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete the property and all associated data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
