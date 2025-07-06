import { useAuth } from '~/hooks';
import { Card, CardContent, CardHeader, Avatar, Button, Chip, Typography, Box, Grid, Divider } from '@mui/material';
import { CalendarDays, Mail, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PlaceholderImage } from '~/assets';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

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
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account and personal information.
          </Typography>
        </Box>
        <Button variant="contained" component={Link} to={`/profile/settings`}>
          Edit Profile
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent
              sx={{ pt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <Avatar
                src={user.avatar || PlaceholderImage}
                alt={user.name}
                sx={{ width: 96, height: 96, mb: 2, fontSize: '2rem' }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Chip label={user.role === 'super_admin' ? 'Super Admin' : 'Admin'} color="primary" sx={{ mb: 2 }} />
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" fullWidth component={Link} to={`/profile/settings`}>
                  Account Settings
                </Button>
                <Button variant="outlined" fullWidth>
                  Change Password
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card>
              <CardHeader title="Personal Information" subheader="Your personal details and contact information." />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Mail size={20} color="#666" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Phone size={20} color="#666" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body2">+998 90 123-45-67</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Shield size={20} color="#666" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Role
                      </Typography>
                      <Typography variant="body2">
                        {user.role === 'super_admin' ? 'Super Administrator' : 'Administrator'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarDays size={20} color="#666" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Member Since
                      </Typography>
                      <Typography variant="body2">January 15, 2023</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Recent Activity" subheader="Your recent actions on the platform." />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Updated system settings
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Changed payment gateway configuration
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      2 hours ago
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Approved new property
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Professional Camera Kit by Jane Smith
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Yesterday
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Resolved user report
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Handled complaint about Power Drill Set
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      3 days ago
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
