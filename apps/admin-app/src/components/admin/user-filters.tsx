

import { Button, TextField, Select, MenuItem, FormControl, InputLabel, InputAdornment, Box } from "@mui/material"
import { useState } from "react"
import { Search, Filter } from "lucide-react"

export function UserFilters() {
  const [userType, setUserType] = useState('')
  const [status, setStatus] = useState('')

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
      <TextField
        placeholder="Search users..."
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} />
            </InputAdornment>
          ),
        }}
      />
      <FormControl size="small" sx={{ width: { xs: '100%', sm: 180 } }}>
        <InputLabel>User Type</InputLabel>
        <Select
          value={userType}
          label="User Type"
          onChange={(e) => setUserType(e.target.value)}
        >
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value="lendee">Lendees</MenuItem>
          <MenuItem value="lender">Lenders</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: { xs: '100%', sm: 180 } }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" startIcon={<Filter size={16} />}>
        More Filters
      </Button>
    </Box>
  )
}
