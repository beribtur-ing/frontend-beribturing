import { UserTable } from '../components/admin/user-table';
import { UserFilters } from '../components/admin/user-filters';
import { Button, Typography, Box } from '@mui/material';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UsersPage() {
  return (
    <Box sx={{ py: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage lendees, lenders, and user permissions.
          </Typography>
        </Box>
        <Button variant="contained" component={Link} to={`/users/create`} startIcon={<UserPlus size={16} />}>
          Add User
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <UserFilters />
      </Box>
      <UserTable />
    </Box>
  );
}
