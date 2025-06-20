

import { Button, TextField, Select, MenuItem, FormControl, InputLabel, InputAdornment, Box } from "@mui/material"
import { useState } from "react"
import { Search, Filter, Calendar } from "lucide-react"

export function BookingFilters() {
  const [status, setStatus] = useState('all');

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
      <TextField
        placeholder="Search bookings..."
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={16} />
            </InputAdornment>
          ),
        }}
      />
      
      <FormControl size="small" sx={{ width: { xs: '100%', sm: 180 } }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
      
      <Button variant="outlined" startIcon={<Calendar size={16} />}>
        Date Range
      </Button>
      
      <Button variant="outlined" startIcon={<Filter size={16} />}>
        More Filters
      </Button>
    </Box>
  )
}
