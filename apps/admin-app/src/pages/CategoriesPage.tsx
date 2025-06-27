import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { FolderTree, Plus } from 'lucide-react';
import { useProductCategoryMutation, useProductCategoryRdos } from '~/hooks';
import { Entities, ProductCategoryRdo } from '@beribturing/api-stub';
import { CategoryTable } from '~/components/admin/category-table';
import { CategoryForm } from '~/components/admin/category-form';

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategoryRdo | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { productCategoryRdos, total, isLoading, refetch } = useProductCategoryRdos({});
  const { mutation } = useProductCategoryMutation();

  const handleOpenDialog = (category?: ProductCategoryRdo) => {
    setEditingCategory(category || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleSaveCategory = async (categoryData: any) => {
    try {
      if (editingCategory) {
        // Convert categoryData to nameValueList format
        const nameValueList = Entities.modifiedNameValues(editingCategory.category, categoryData, ['name', 'description', 'iconUrl', 'parentId', 'active']);

        await mutation.modifyProductCategory.mutateAsync({
          categoryId: editingCategory.category.id,
          nameValueList: nameValueList,
        });
        setSnackbar({ open: true, message: 'Category updated successfully', severity: 'success' });
      } else {
        await mutation.registerProductCategory.mutateAsync({
          productCategoryRegCdo: categoryData,
        });
        setSnackbar({ open: true, message: 'Category created successfully', severity: 'success' });
      }
      handleCloseDialog();
      refetch();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to save category', severity: 'error' });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await mutation.removeProductCategory.mutateAsync({ id });
        setSnackbar({ open: true, message: 'Category deleted successfully', severity: 'success' });
        refetch();
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to delete category', severity: 'error' });
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FolderTree size={24}/>
          <Typography variant="h4" fontWeight="600">
            Product Categories
          </Typography>
          <Chip label={`${total} total`} size="small"/>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus/>}
          onClick={() => handleOpenDialog()}
          sx={{ minWidth: 140 }}
        >
          Add Category
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <CategoryTable
          categories={productCategoryRdos}
          loading={isLoading}
          onEdit={handleOpenDialog}
          onDelete={handleDeleteCategory}
        />
      </Paper>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent>
          <CategoryForm
            category={editingCategory}
            categories={productCategoryRdos}
            onSave={handleSaveCategory}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
