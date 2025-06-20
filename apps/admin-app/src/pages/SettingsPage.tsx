import { Card, CardContent, CardHeader, Tabs, Tab, Box, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { SettingsForm } from "../components/admin/settings-form";

export default function SettingsPage() {
  const [currentTab, setCurrentTab] = useState('general');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          System Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure platform-wide settings and preferences.
        </Typography>
      </Box>

      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="settings tabs">
            <Tab label="General" value="general" />
            <Tab label="Payments" value="payments" />
            <Tab label="Notifications" value="notifications" />
            <Tab label="Security" value="security" />
          </TabList>
        </Box>

        <TabPanel value="general">
          <Card>
            <CardHeader 
              title="General Settings"
            />
            <CardContent>
              <SettingsForm type="general" />
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value="payments">
          <Card>
            <CardHeader 
              title="Payment Settings"
            />
            <CardContent>
              <SettingsForm type="payments" />
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value="notifications">
          <Card>
            <CardHeader 
              title="Notification Settings"
            />
            <CardContent>
              <SettingsForm type="notifications" />
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value="security">
          <Card>
            <CardHeader 
              title="Security Settings"
            />
            <CardContent>
              <SettingsForm type="security" />
            </CardContent>
          </Card>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
