

import { Table, TableBody, TableCell, TableHead, TableRow, Card, Chip, IconButton, Menu, MenuItem, Box, Typography, Button } from "@mui/material"
import { useState } from "react"
import { MoreHorizontal, Check, X, Flag, Eye, Edit } from "lucide-react"
import { mockProperties } from "../../lib/mock-data"
import { PlaceholderImage } from "~/assets"

import { Link, useLocation } from "react-router-dom"

export function PropertyTable() {
  const location = useLocation()
  const locale = location.pathname.split('/')[1] || 'en'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, propertyId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedPropertyId(propertyId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedPropertyId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "pending":
        return "warning";
      case "flagged":
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
            <TableCell>Property</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Bookings</TableCell>
            <TableCell>Created</TableCell>
            <TableCell sx={{ width: 70 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    src={property.images[0] || PlaceholderImage}
                    alt={property.title}
                    width={40}
                    height={40}
                    style={{ borderRadius: 4, objectFit: 'cover' }}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      <Link to={`/${locale}/properties/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {property.title}
                      </Link>
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                      display: 'block', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      maxWidth: 200
                    }}>
                      {property.description}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Link to={`/${locale}/users/${property.ownerId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {property.owner}
                </Link>
              </TableCell>
              <TableCell>{property.category}</TableCell>
              <TableCell>
                <Chip
                  label={property.status}
                  color={getStatusColor(property.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                ${property.price}/{property.currency}
              </TableCell>
              <TableCell>{property.totalBookings}</TableCell>
              <TableCell>{new Date(property.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuClick(e, property.id)}
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
          to={`/${locale}/properties/${selectedPropertyId}`}
          onClick={handleMenuClose}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Eye size={16} />
          View Details
        </MenuItem>
        <MenuItem 
          component={Link} 
          to={`/${locale}/properties/${selectedPropertyId}/edit`}
          onClick={handleMenuClose}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Edit size={16} />
          Edit Property
        </MenuItem>
        {mockProperties.find(p => p.id === selectedPropertyId)?.status === "pending" && (
          <>
            <MenuItem 
              onClick={handleMenuClose}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}
            >
              <Check size={16} />
              Approve
            </MenuItem>
            <MenuItem 
              onClick={handleMenuClose}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}
            >
              <X size={16} />
              Reject
            </MenuItem>
          </>
        )}
        <MenuItem 
          onClick={handleMenuClose}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'warning.main' }}
        >
          <Flag size={16} />
          Flag Property
        </MenuItem>
      </Menu>
    </Card>
  )
}
