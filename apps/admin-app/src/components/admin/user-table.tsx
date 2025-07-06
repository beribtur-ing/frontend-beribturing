import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectMenuItem,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { MoreHorizontal, Shield, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLenders, useLendees } from '../../hooks';

interface UserTableProps {
  userType?: 'lender' | 'lendee';
  searchKeyword?: string;
  status?: string;
}

export function UserTable({ userType = 'lender', searchKeyword = '', status = '' }: UserTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const lendersQuery = useLenders({ limit: 10 });
  const lendeesQuery = useLendees({ limit: 10 });
  
  const isLenders = userType === 'lender';
  const query = isLenders ? lendersQuery : lendeesQuery;
  const users = isLenders ? lendersQuery.lenders : lendeesQuery.lendees;

  // Update search parameters when props change
  useEffect(() => {
    if (isLenders) {
      lendersQuery.changeSearchKeyword(searchKeyword);
      lendersQuery.changeStatus(status);
    } else {
      lendeesQuery.changeSearchKeyword(searchKeyword);
      lendeesQuery.changeStatus(status);
    }
  }, [searchKeyword, status, isLenders]);

  // Trigger search when parameters change
  useEffect(() => {
    if (isLenders) {
      lendersQuery.fetchByNewQuery();
    } else {
      lendeesQuery.fetchByNewQuery();
    }
  }, [userType, searchKeyword, status]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, userId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    query.changeCurrentPage(value - 1);
  };

  const handlePageSizeChange = (event: any) => {
    query.changePageSize(event.target.value);
  };

  if (query.isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ fontWeight: 'medium' }}>
                <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>{user.profile?.email || 'N/A'}</TableCell>
              <TableCell>
                <Chip
                  label={isLenders ? 'Lender' : 'Lendee'}
                  color={isLenders ? 'primary' : 'secondary'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={user.active ? 'Active' : 'Inactive'}
                  color={user.active ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>
                {isLenders && 'productSequence' in user && `${user.productSequence} listings`}
                {!isLenders && 'reservationSequence' in user && `${user.reservationSequence} reservations`}
              </TableCell>
              <TableCell>
                <IconButton size="small" onClick={(e) => handleMenuClick(e, user.id)}>
                  <MoreHorizontal size={16} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {(query.page * query.size) + 1} to {Math.min((query.page + 1) * query.size, query.total)} of {query.total} results
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Rows per page</InputLabel>
            <Select
              value={query.size}
              label="Rows per page"
              onChange={handlePageSizeChange}
            >
              <SelectMenuItem value={5}>5</SelectMenuItem>
              <SelectMenuItem value={10}>10</SelectMenuItem>
              <SelectMenuItem value={25}>25</SelectMenuItem>
              <SelectMenuItem value={50}>50</SelectMenuItem>
            </Select>
          </FormControl>
        </Box>
        <Pagination
          count={query.totalPages}
          page={query.page + 1}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>

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
          to={`/users/${selectedUserId}`}
          onClick={handleMenuClose}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Eye size={16} />
          View Details
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/users/${selectedUserId}/edit`}
          onClick={handleMenuClose}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Edit size={16} />
          Edit User
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Shield size={16} />
          Toggle Status
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
          Delete User
        </MenuItem>
      </Menu>
    </Card>
  );
}
