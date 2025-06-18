import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { ArrowLeft, Edit, Trash2, Ban, CheckCircle } from "lucide-react";
import { mockUsers } from "../lib/mock-data";
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

export default function UserDetailsPage() {
  const navigate = useNavigate();
  const { id, locale } = useParams();
  const user = mockUsers.find((u) => u.id === id) || mockUsers[0];

  const handleDelete = () => {
    navigate(`/${locale}/users`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/${locale}/users`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user?.name}</h1>
            <p className="text-muted-foreground">User details and management.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/${locale}/users/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user account and all associated data.
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
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback>
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground mb-2">{user?.email}</p>
              <Badge variant={user?.type === "lender" ? "default" : "secondary"} className="mb-2">
                {user?.type}
              </Badge>
              <Badge variant={user?.isActive ? "outline" : "destructive"}>{user?.isActive ? "Active" : "Inactive"}</Badge>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{user?.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined:</span>
                <span>{new Date(user?.joinedAt || '').toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Activity:</span>
                <span>
                  {user?.totalRentals && `${user?.totalRentals} rentals`}
                  {user?.totalListings && `${user?.totalListings} listings`}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {user?.isActive ? (
                <Button variant="outline" className="w-full">
                  <Ban className="mr-2 h-4 w-4" />
                  Deactivate Account
                </Button>
              ) : (
                <Button variant="outline" className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Activate Account
                </Button>
              )}
              <Button variant="outline" className="w-full">
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="activity" className="space-y-4">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="rentals">Rentals</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>User's recent actions on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Booked a rental</p>
                        <p className="text-sm text-muted-foreground">Professional Camera Kit</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Updated profile</p>
                        <p className="text-sm text-muted-foreground">Changed phone number</p>
                      </div>
                      <p className="text-sm text-muted-foreground">1 week ago</p>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Completed rental</p>
                        <p className="text-sm text-muted-foreground">Power Drill Set</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rentals">
              <Card>
                <CardHeader>
                  <CardTitle>Rental History</CardTitle>
                  <CardDescription>Items rented by this user.</CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.type === "lendee" ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Professional Camera Kit</p>
                          <p className="text-sm text-muted-foreground">Mar 15, 2024 - Mar 20, 2024</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Power Drill Set</p>
                          <p className="text-sm text-muted-foreground">Feb 20, 2024 - Feb 25, 2024</p>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">This user is a lender and does not rent items.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings">
              <Card>
                <CardHeader>
                  <CardTitle>Listed Properties</CardTitle>
                  <CardDescription>Items listed by this user.</CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.type === "lender" ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Professional Camera Kit</p>
                          <p className="text-sm text-muted-foreground">Listed on Feb 25, 2024</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Camping Gear Set</p>
                          <p className="text-sm text-muted-foreground">Listed on Jan 10, 2024</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">This user is a lendee and does not list items.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Reports involving this user.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No reports found for this user.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}