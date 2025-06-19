

import { Table, TableBody, TableCell, TableHead, TableRow, Card, Chip, IconButton, Menu, MenuItem, Typography, Box } from "@mui/material"
import { useState } from "react"
import { MoreHorizontal, Eye, X, Check } from "lucide-react"
import { mockBookings } from "../../lib/mock-data"
import { Link, useLocation } from "react-router-dom"

export function BookingTable() {
  const location = useLocation()
  const locale = location.pathname.split('/')[1] || 'en'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, bookingId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedBookingId(bookingId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedBookingId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "primary";
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Property</TableCell>
            <TableCell>Lendee</TableCell>
            <TableCell>Lender</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Dates</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Created</TableCell>
            <TableCell sx={{ width: 70 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <Typography variant="body2" fontFamily="monospace">
                  #{booking.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  <Link to={`/${locale}/properties/${booking.propertyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {booking.propertyTitle}
                  </Link>
                </Typography>
              </TableCell>
              <TableCell>
                <Link to={`/${locale}/users/${booking.lendeeId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {booking.lendeeName}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/${locale}/users/${booking.lenderId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {booking.lenderName}
                </Link>
              </TableCell>
              <TableCell>
                <Chip
                  label={booking.status}
                  color={getStatusColor(booking.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    to {new Date(booking.endDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>${booking.totalAmount}</TableCell>
              <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuClick(e, booking.id)}
                >
                  <MoreHorizontal size={16} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          component={Link} 
          to={`/${locale}/bookings/${selectedBookingId}`}
          onClick={handleMenuClose}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Eye size={16} />
          View Details
        </MenuItem>
        {mockBookings.find(b => b.id === selectedBookingId)?.status === "pending" && (
          <MenuItem 
            onClick={handleMenuClose}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}
          >
            <Check size={16} />
            Approve
          </MenuItem>
        )}
        <MenuItem 
          onClick={handleMenuClose}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}
        >
          <X size={16} />
          Cancel Booking
        </MenuItem>
      </Menu>
    </Card>
  )
}
