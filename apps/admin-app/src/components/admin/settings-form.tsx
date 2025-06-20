

import { Button, TextField, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material"
import { useState } from "react"

interface SettingsFormProps {
  type: "general" | "payments" | "notifications" | "security"
}

export function SettingsForm({ type }: SettingsFormProps) {
  if (type === "general") {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField
            label="Platform Name"
            defaultValue="RentApp"
            fullWidth
          />
          <TextField
            label="Support Email"
            defaultValue="support@rentapp.com"
            fullWidth
          />
        </Box>
        <TextField
          label="Platform Description"
          defaultValue="A modern rental platform connecting lenders and borrowers."
          multiline
          rows={3}
          fullWidth
        />
        <FormControlLabel
          control={<Switch />}
          label="Maintenance Mode"
        />
        <Button variant="contained">Save Changes</Button>
      </Box>
    )
  }

  if (type === "payments") {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField
            label="Commission Rate (%)"
            type="number"
            defaultValue="10"
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Default Currency</InputLabel>
            <Select
              defaultValue="usd"
              label="Default Currency"
            >
              <MenuItem value="usd">USD</MenuItem>
              <MenuItem value="eur">EUR</MenuItem>
              <MenuItem value="gbp">GBP</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          label="Stripe Public Key"
          placeholder="pk_test_..."
          fullWidth
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Automatic Payouts"
        />
        <Button variant="contained">Save Changes</Button>
      </Box>
    )
  }

  if (type === "notifications") {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Email Notifications"
          />
          <FormControlLabel
            control={<Switch />}
            label="SMS Notifications"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Push Notifications"
          />
        </Box>
        <TextField
          label="Notification Email Template"
          placeholder="Enter email template..."
          multiline
          rows={6}
          fullWidth
        />
        <Button variant="contained">Save Changes</Button>
      </Box>
    )
  }

  if (type === "security") {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField
            label="Session Timeout (minutes)"
            type="number"
            defaultValue="30"
            fullWidth
          />
          <TextField
            label="Max Login Attempts"
            type="number"
            defaultValue="5"
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Require Two-Factor Authentication"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Enforce Password Complexity"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Enable Audit Logging"
          />
        </Box>
        <Button variant="contained">Save Changes</Button>
      </Box>
    )
  }

  return null
}
