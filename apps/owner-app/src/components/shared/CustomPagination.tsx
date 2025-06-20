import type { ChangeEvent } from 'react';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';

interface CustomPaginationProps {
  onChange: (offset: number) => void;
  limit: number;
  offset: number;
  total: number;
  pagerButtonCount?: number;
  onLimitChange: (rows: number) => void;
}

export const CustomPagination = ({
  onChange,
  limit,
  offset,
  total,
  onLimitChange,
  pagerButtonCount = 5,
}: CustomPaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    const newOffset = (page - 1) * limit;
    onChange(newOffset);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const newLimit = value === 'All' ? 2147483647 : Number(value);
    onLimitChange(newLimit);
  };

  const rowsPerPageOptions = [10, 20, 30, 40, 50, 'All'];

  return (
    <Box className="grid-footer mt-4 flex flex-wrap justify-center items-center gap-4">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        siblingCount={Math.floor(pagerButtonCount / 2)}
        color="primary"
        shape="rounded"
        variant="outlined"
      />

      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
        <Select
          labelId="rows-per-page-label"
          value={limit === 2147483647 ? 'All' : String(limit)}
          label="Rows per page"
          onChange={handleLimitChange}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
