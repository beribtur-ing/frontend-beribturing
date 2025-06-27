import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Typography, Box } from '@mui/material';
import { Bell, User, LogOut, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '../../hooks/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlaceholderImage } from '~/assets';
import { LanguageSelector } from '~/components/layout/LanguageSelector';

export function AdminHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSignOut = () => {
    signOut();
    navigate(`/login`);
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ minHeight: '64px' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon size={20} />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Bell size={20} />
          </IconButton>
          <LanguageSelector />

          {user && (
            <>
              <IconButton onClick={handleMenuClick} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                <Avatar src={user.avatar || PlaceholderImage} alt={user.name} sx={{ width: 32, height: 32 }}>
                  {user.name?.charAt(0) || 'U'}
                </Avatar>
                <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }}>
                  {user.name}
                </Typography>
              </IconButton>

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
                  to={`/profile`}
                  onClick={handleMenuClose}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <User size={16} />
                  Profile
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`/profile/settings`}
                  onClick={handleMenuClose}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <User size={16} />
                  Settings
                </MenuItem>
                <MenuItem onClick={handleSignOut} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LogOut size={16} />
                  Sign out
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
