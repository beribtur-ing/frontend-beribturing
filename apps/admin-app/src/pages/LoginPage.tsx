import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import { Button, Card, CardContent, CardHeader, TextField, Typography, Alert, Box } from '@mui/material';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, isSigningIn } = useAuth();
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    let phoneNumber = value.replace(/\D/g, "")
    
    // Auto-add country code if not present
    if (phoneNumber.length > 0 && !phoneNumber.startsWith('998')) {
      phoneNumber = '998' + phoneNumber
    }

    // Format as +998 XX XXX-XX-XX
    if (phoneNumber.length >= 12) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`
    } else if (phoneNumber.length >= 8) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`
    } else if (phoneNumber.length >= 5) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5)}`
    } else if (phoneNumber.length >= 3) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`
    } else {
      return phoneNumber ? `+${phoneNumber}` : ""
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber || !password) {
      setError('Please enter both phone number and password');
      return;
    }

    // Clean phone number for API (remove +, spaces, and hyphens)
    const cleanPhone = phoneNumber.replace(/[\s\-+]/g, '')
    
    const success = await signIn(cleanPhone, password);
    if (success) {
      navigate(`/overview`);
    } else {
      setError('Invalid phone number or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        px: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardHeader sx={{ textAlign: 'center', pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Shield size={40} color="primary" />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Login
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your phone number and password to access the admin dashboard
          </Typography>
        </CardHeader>
        <Box component="form" onSubmit={handleSubmit} sx={{ px: 3, pb: 3 }}>
          <CardContent sx={{ p: 0 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              type="tel"
              placeholder="+998 90 123-45-67"
              value={phoneNumber}
              onChange={handlePhoneChange}
              margin="normal"
              inputProps={{
                maxLength: 18
              }}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
          </CardContent>
          <Button type="submit" variant="contained" fullWidth disabled={isSigningIn} sx={{ mt: 3 }}>
            {isSigningIn ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
