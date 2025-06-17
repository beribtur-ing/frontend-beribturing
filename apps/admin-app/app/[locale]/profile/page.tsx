"use client"

import { useAuth } from "@/hooks/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Mail, Phone, Shield } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and personal information.</p>
        </div>
        <Button asChild>
          <Link href="/profile/settings">Edit Profile</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground mb-2">{user.email}</p>
            <Badge className="mb-4">{user.role === "super_admin" ? "Super Admin" : "Admin"}</Badge>
            <div className="w-full space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/profile/settings">Account Settings</Link>
              </Button>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p>{user.role === "super_admin" ? "Super Administrator" : "Administrator"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p>January 15, 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Updated system settings</p>
                    <p className="text-sm text-muted-foreground">Changed payment gateway configuration</p>
                  </div>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Approved new property</p>
                    <p className="text-sm text-muted-foreground">Professional Camera Kit by Jane Smith</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Resolved user report</p>
                    <p className="text-sm text-muted-foreground">Handled complaint about Power Drill Set</p>
                  </div>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
