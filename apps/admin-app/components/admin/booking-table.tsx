"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, X, Check } from "lucide-react"
import { mockBookings } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function BookingTable() {
  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Lendee</TableHead>
              <TableHead>Lender</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-mono text-sm">#{booking.id}</TableCell>
                <TableCell className="font-medium">
                  <Link href={`/properties/${booking.propertyId}`} className="hover:underline">
                    {booking.propertyTitle}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/users/${booking.lendeeId}`} className="hover:underline">
                    {booking.lendeeName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/users/${booking.lenderId}`} className="hover:underline">
                    {booking.lenderName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === "active"
                        ? "default"
                        : booking.status === "completed"
                          ? "secondary"
                          : booking.status === "pending"
                            ? "outline"
                            : booking.status === "cancelled"
                              ? "destructive"
                              : "default"
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                    <div className="text-muted-foreground">to {new Date(booking.endDate).toLocaleDateString()}</div>
                  </div>
                </TableCell>
                <TableCell>${booking.totalAmount}</TableCell>
                <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/bookings/${booking.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      {booking.status === "pending" && (
                        <DropdownMenuItem className="text-green-600">
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <X className="mr-2 h-4 w-4" />
                        Cancel Booking
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
