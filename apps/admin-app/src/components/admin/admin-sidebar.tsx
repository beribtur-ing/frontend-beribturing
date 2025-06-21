import { BarChart3, Calendar, Home, Settings, Users, Building2, Shield } from 'lucide-react';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  {
    title: 'Overview',
    url: '/overview',
    icon: Home,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
  },
  {
    title: 'Properties',
    url: '/properties',
    icon: Building2,
  },
  {
    title: 'Bookings',
    url: '/bookings',
    icon: Calendar,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Shield size={24} />
          <Typography variant="h6" fontWeight="600">
            RentApp Admin
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="overline"
          sx={{ px: 2, pt: 2, pb: 1, fontSize: '0.75rem', fontWeight: 600, color: 'text.secondary' }}
        >
          Administration
        </Typography>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === `${item.url}`;
            return (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/${item.url}`}
                  selected={isActive}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'inherit' : 'text.secondary' }}>
                    <item.icon size={20} />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">
          Admin Panel v1.0
        </Typography>
      </Box>
    </Drawer>
  );
}
