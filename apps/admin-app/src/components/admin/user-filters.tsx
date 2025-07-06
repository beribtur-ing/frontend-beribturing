import { Button, TextField, Select, MenuItem, FormControl, InputLabel, InputAdornment, Box } from "@mui/material"
import { useState } from "react"
import { Search, Filter } from "lucide-react"

interface UserFiltersProps {
  onUserTypeChange?: (userType: 'lender' | 'lendee') => void;
  onFilterSearch?: (searchKeyword: string, status: string) => void;
}

export function UserFilters({ 
  onUserTypeChange, 
  onFilterSearch 
}: UserFiltersProps) {
  const [userType, setUserType] = useState<'lender' | 'lendee'>('lender')
  const [status, setStatus] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
      <TextField
        placeholder="Search users..."
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
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
          onChange={(e) => {
            const value = e.target.value as 'lender' | 'lendee';
            setUserType(value);
            onUserTypeChange?.(value);
          }}
        >
          <MenuItem value="lendee">Lendees</MenuItem>
          <MenuItem value="lender">Lenders</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: { xs: '100%', sm: 180 } }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="InActive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <Button 
        variant="outlined" 
        startIcon={<Filter size={16} />}
        onClick={() => onFilterSearch?.(searchKeyword, status)}
      >
        Search
      </Button>
    </Box>
  )
}
