import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { mockUsers } from '../../lib/mock-data';

export default function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = mockUsers.find((u) => u.id === id) || mockUsers[0];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');

  const formatPhoneNumber = (value: string) => {
    let phoneNumber = value.replace(/\D/g, '');

    if (phoneNumber.length > 0 && !phoneNumber.startsWith('998')) {
      phoneNumber = '998' + phoneNumber;
    }

    if (phoneNumber.length >= 12) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(
        8,
        10,
      )}-${phoneNumber.slice(10, 12)}`;
    } else if (phoneNumber.length >= 8) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(
        8,
      )}`;
    } else if (phoneNumber.length >= 5) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5)}`;
    } else if (phoneNumber.length >= 3) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    } else {
      return phoneNumber ? `+${phoneNumber}` : '';
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/users/${id}`);
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => navigate(`/users/${id}`)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Edit User
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update user information.
          </Typography>
        </Box>
      </Box>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader title="User Information" subheader="Edit the user's details." />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField label="Full Name" defaultValue={user?.name} required fullWidth />
                <TextField label="Email Address" type="email" defaultValue={user?.email} required fullWidth />
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="+998 90 123-45-67"
                  inputProps={{ maxLength: 18 }}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>User Type</InputLabel>
                  <Select defaultValue={user?.type} label="User Type">
                    <MenuItem value="lendee">Lendee</MenuItem>
                    <MenuItem value="lender">Lender</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <FormControlLabel control={<Switch defaultChecked={user?.isActive} />} label="Active Account" />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="text" type="button" onClick={() => navigate(`/users/${id}`)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
}
