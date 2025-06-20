import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Switch, Typography, Box, IconButton } from "@mui/material";
import { ArrowLeft } from "lucide-react";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const { locale } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhoneNumber = (value: string) => {
    let phoneNumber = value.replace(/\D/g, "");
    
    if (phoneNumber.length > 0 && !phoneNumber.startsWith('998')) {
      phoneNumber = '998' + phoneNumber;
    }

    if (phoneNumber.length >= 12) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`;
    } else if (phoneNumber.length >= 8) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8)}`;
    } else if (phoneNumber.length >= 5) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5)}`;
    } else if (phoneNumber.length >= 3) {
      return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    } else {
      return phoneNumber ? `+${phoneNumber}` : "";
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
      navigate(`/${locale}/users`);
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => navigate(`/${locale}/users`)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Create New User
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add a new user to the platform.
          </Typography>
        </Box>
      </Box>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader 
            title="User Information"
            subheader="Enter the details for the new user."
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="Full Name"
                  placeholder="John Doe"
                  required
                  fullWidth
                />
                <TextField
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  required
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="+998 90 123-45-67"
                  inputProps={{ maxLength: 18 }}
                  fullWidth
                />
                <FormControl fullWidth required>
                  <InputLabel>User Type</InputLabel>
                  <Select
                    label="User Type"
                    defaultValue=""
                  >
                    <MenuItem value="lendee">Lendee</MenuItem>
                    <MenuItem value="lender">Lender</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TextField
                label="Temporary Password"
                type="password"
                placeholder="Set a temporary password"
                required
                fullWidth
              />

              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Active Account"
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="text" type="button" onClick={() => navigate(`/${locale}/users`)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create User"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
}