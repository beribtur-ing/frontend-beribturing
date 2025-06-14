import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export interface FilterOption {
  id: string | number;
  name: string;
}

export interface FilterProps {
  label: string;
  values: FilterOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
}

export const Filter: React.FC<FilterProps> = ({ label, values, value = '', onChange }) => {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 130 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select className='bg-white' labelId="demo-simple-select-label" id="demo-simple-select" label={label} onChange={handleChange}>
        {values?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
