

import { Button, TextField, Select, MenuItem, FormControl, InputLabel, InputAdornment, Box } from "@mui/material"
import { useState } from "react"
import { Search, Filter } from "lucide-react"

export function PropertyFilters() {
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
      <TextField
        placeholder="Search properties..."
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
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="tools">Tools</MenuItem>
          <MenuItem value="vehicles">Vehicles</MenuItem>
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
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="flagged">Flagged</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>
      
      <Button variant="outlined" startIcon={<Filter size={16} />}>
        More Filters
      </Button>
    </Box>
  )
}
