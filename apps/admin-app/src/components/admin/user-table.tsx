import { Table, TableBody, TableCell, TableHead, TableRow, Card, Chip, IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { MoreHorizontal, Shield, ShieldOff, Edit, Eye } from "lucide-react"
import { mockUsers } from "../../lib/mock-data"
import { Link, useLocation } from "react-router-dom"

export function UserTable() {
  const location = useLocation()
  const locale = location.pathname.split('/')[1] || 'en'
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, userId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedUserId(userId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedUserId(null)
  }

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Joined</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell sx={{ width: 70 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ fontWeight: 'medium' }}>
                <Link to={`/${locale}/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip 
                  label={user.type} 
                  color={user.type === "lender" ? "primary" : "secondary"} 
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={user.isActive ? "Active" : "Inactive"}
                  color={user.isActive ? "success" : "error"}
                  size="small"
                />
              </TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {user.totalRentals && `${user.totalRentals} rentals`}
                {user.totalListings && `${user.totalListings} listings`}
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuClick(e, user.id)}
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
            to={`/${locale}/users/${selectedUserId}`}
            onClick={handleMenuClose}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Eye size={16} />
            View Details
          </MenuItem>
          <MenuItem 
            component={Link} 
            to={`/${locale}/users/${selectedUserId}/edit`}
            onClick={handleMenuClose}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Edit size={16} />
            Edit User
          </MenuItem>
          <MenuItem 
            onClick={handleMenuClose}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Shield size={16} />
            Toggle Status
          </MenuItem>
          <MenuItem 
            onClick={handleMenuClose}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}
          >
            Delete User
          </MenuItem>
        </Menu>
    </Card>
  )
}
