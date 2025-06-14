"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Check, X, Flag, Eye, Edit } from "lucide-react"
import { mockProperties } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function PropertyTable() {
  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">
                        <Link href={`/properties/${property.id}`} className="hover:underline">
                          {property.title}
                        </Link>
                      </div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">{property.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/users/${property.ownerId}`} className="hover:underline">
                    {property.owner}
                  </Link>
                </TableCell>
                <TableCell>{property.category}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      property.status === "active"
                        ? "default"
                        : property.status === "pending"
                          ? "secondary"
                          : property.status === "flagged"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {property.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  ${property.price}/{property.currency}
                </TableCell>
                <TableCell>{property.totalBookings}</TableCell>
                <TableCell>{new Date(property.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/properties/${property.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/properties/${property.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Property
                        </Link>
                      </DropdownMenuItem>
                      {property.status === "pending" && (
                        <>
                          <DropdownMenuItem className="text-green-600">
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <X className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem className="text-orange-600">
                        <Flag className="mr-2 h-4 w-4" />
                        Flag Property
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
