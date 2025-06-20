import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { Button, Card, CardContent, CardHeader, TextField, Tab, FormControlLabel, Switch, Avatar, Typography, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { PlaceholderImage } from "~/assets";

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { locale } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+998 90 123-45-67");
  const [activeTab, setActiveTab] = useState("general");

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

  if (!user) {
    return null;
  }

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate(`/${locale}/profile`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Update your account preferences and personal information.</p>
      </div>

      <TabContext value={activeTab}>
        <TabList onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="General" value="general" />
          <Tab label="Password" value="password" />
          <Tab label="Notifications" value="notifications" />
        </TabList>

        <TabPanel value="general">
          <Card>
            <CardHeader
              title="General Information"
              subheader="Update your personal details and profile information."
            />
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <Avatar 
                  src={user.avatar || PlaceholderImage}
                  sx={{ width: 96, height: 96, fontSize: '2rem' }}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    Remove Avatar
                  </Button>
                </div>
              </div>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="Full Name"
                  defaultValue={user.name}
                  fullWidth
                />
                <TextField
                  label="Email Address"
                  type="email"
                  defaultValue={user.email}
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
                <TextField
                  label="Role"
                  defaultValue={user.role === "super_admin" ? "Super Administrator" : "Administrator"}
                  disabled
                  fullWidth
                />
              </Box>

              <TextField
                label="Bio"
                placeholder="Tell us about yourself"
                multiline
                rows={4}
                fullWidth
              />
            </CardContent>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                <Button variant="text" onClick={() => navigate(`/${locale}/profile`)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value="password">
          <Card>
            <CardHeader
              title="Change Password"
              subheader="Update your password to maintain account security."
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                />
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                />
              </Box>
            </CardContent>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                <Button variant="text" onClick={() => navigate(`/${locale}/profile`)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Updating..." : "Update Password"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value="notifications">
          <Card>
            <CardHeader
              title="Notification Preferences"
              subheader="Manage how you receive notifications and alerts."
            />
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Browser Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications in browser</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New User Registrations</p>
                    <p className="text-sm text-muted-foreground">When new users register on the platform</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Property Listings</p>
                    <p className="text-sm text-muted-foreground">When new properties are listed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Reports</p>
                    <p className="text-sm text-muted-foreground">When users submit reports or complaints</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-muted-foreground">Critical system notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                <Button variant="text" onClick={() => navigate(`/${locale}/profile`)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Preferences"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </TabContext>
    </div>
  );
}