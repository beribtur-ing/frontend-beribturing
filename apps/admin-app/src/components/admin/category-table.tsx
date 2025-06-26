import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Box,
  TablePagination,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Edit, Trash2, FolderTree } from 'lucide-react';
import { ProductCategoryRdo } from '@beribturing/api-stub';

interface CategoryTableProps {
  categories: ProductCategoryRdo[];
  loading: boolean;
  onEdit: (category: ProductCategoryRdo) => void;
  onDelete: (id: string) => void;
  page?: number;
  rowsPerPage?: number;
  total?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
  page = 0,
  rowsPerPage = 10,
  total = 0,
  onPageChange,
  onRowsPerPageChange,
}: CategoryTableProps) {
  const findCategoryById = (id: string) => {
    return categories.find(cat => cat.category.id === id);
  };

  const getParentCategoryName = (parentId?: string) => {
    if (!parentId) return 'Root';
    const parent = findCategoryById(parentId);
    return parent?.category.name || 'Unknown';
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Parent Category</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box sx={{ py: 4 }}>
                    <FolderTree size={48} color="gray" />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      No categories found. Create your first category to get started.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              categories.map(({ category }) => (
                <TableRow key={category.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FolderTree size={16} />
                      <Typography variant="body2" fontWeight="500">
                        {category.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {category.description || 'No description'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getParentCategoryName(category.parentId)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(category.registeredOn)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={category.active ? 'Active' : 'Inactive'}
                      size="small"
                      color={category.active ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit category">
                      <IconButton
                        size="small"
                        onClick={() => onEdit({ category })}
                        color="primary"
                      >
                        <Edit size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete category">
                      <IconButton
                        size="small"
                        onClick={() => onDelete(category.id)}
                        color="error"
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {onPageChange && onRowsPerPageChange && (
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </>
  );
}
