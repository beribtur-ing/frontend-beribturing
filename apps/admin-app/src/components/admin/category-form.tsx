import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  FormControlLabel,
  Switch,
  FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ProductCategoryRdo } from '@beribturing/api-stub';

interface CategoryFormData {
  name: string;
  description?: string;
  parentId?: string;
  iconUrl?: string | null;
  active: boolean;
}

interface CategoryFormProps {
  category?: ProductCategoryRdo | null;
  categories: ProductCategoryRdo[];
  onSave: (categoryData: { name: string; description: string; parentId?: string; iconUrl?: string; active: boolean }) => void;
  onCancel: () => void;
}

const createValidationSchema = (categories: ProductCategoryRdo[], currentCategoryId?: string) => {
  return yup.object().shape({
    name: yup
      .string()
      .required('Category name is required')
      .min(2, 'Category name must be at least 2 characters')
      .max(100, 'Category name must be less than 100 characters')
      .test('unique-name', 'A category with this name already exists', function (value) {
        if (!value) return true;
        const isDuplicate = categories.some(cat => 
          cat.category.name.toLowerCase() === value.toLowerCase() && 
          cat.category.id !== currentCategoryId,
        );
        return !isDuplicate;
      }),
    description: yup
      .string()
      .max(500, 'Description must be less than 500 characters'),
    parentId: yup
      .string()
      .test('not-self-parent', 'A category cannot be its own parent', function (value) {
        if (!value || !currentCategoryId) return true;
        return value !== currentCategoryId;
      })
      .test('no-circular-reference', 'This would create a circular reference', function (value) {
        if (!value || !currentCategoryId) return true;
        
        // Check if the selected parent is a descendant of the current category
        const getDescendantIds = (categoryId: string): string[] => {
          const children = categories.filter(cat => cat.category.parentId === categoryId);
          const descendants = [categoryId];
          children.forEach(child => {
            descendants.push(...getDescendantIds(child.category.id));
          });
          return descendants;
        };

        const descendants = getDescendantIds(currentCategoryId);
        return !descendants.includes(value);
      }),
    iconUrl: yup
      .string()
      .url('Please enter a valid URL')
      .nullable(),
    active: yup
      .boolean()
      .required(),
  });
};

export function CategoryForm({ category, categories, onSave, onCancel }: CategoryFormProps) {
  const validationSchema = createValidationSchema(categories, category?.category.id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<CategoryFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      description: '',
      parentId: '',
      iconUrl: '',
      active: true,
    },
    mode: 'onChange',
  });

  // Watch description for character count
  const description = watch('description');

  useEffect(() => {
    if (category) {
      reset({
        name: category.category.name || '',
        description: category.category.description || '',
        parentId: category.category.parentId || '',
        iconUrl: category.category.iconUrl || '',
        active: category.category.active ?? true,
      });
    } else {
      reset({
        name: '',
        description: '',
        parentId: '',
        iconUrl: '',
        active: true,
      });
    }
  }, [category, reset]);

  const onSubmit = (data: CategoryFormData) => {
    const categoryData = {
      name: data.name.trim(),
      description: data.description?.trim() || '',
      parentId: data.parentId || undefined,
      iconUrl: data.iconUrl?.trim() || undefined,
      active: data.active,
    };
    
    onSave(categoryData);
  };

  // Filter out the current category and its descendants from parent options
  const getAvailableParentCategories = () => {
    if (!category) return categories;
    
    const getDescendantIds = (categoryId: string): string[] => {
      const children = categories.filter(cat => cat.category.parentId === categoryId);
      const descendants = [categoryId];
      children.forEach(child => {
        descendants.push(...getDescendantIds(child.category.id));
      });
      return descendants;
    };

    const excludeIds = getDescendantIds(category.category.id);
    return categories.filter(cat => !excludeIds.includes(cat.category.id));
  };

  const availableParentCategories = getAvailableParentCategories();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Category Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              required
              placeholder="Enter category name"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Description"
              error={!!errors.description}
              helperText={errors.description?.message || `${description?.length || 0}/500 characters`}
              multiline
              rows={3}
              placeholder="Enter category description (optional)"
            />
          )}
        />

        <Controller
          name="iconUrl"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Icon URL"
              error={!!errors.iconUrl}
              helperText={errors.iconUrl?.message}
              placeholder="Enter icon URL (optional)"
            />
          )}
        />

        <Controller
          name="parentId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.parentId}>
              <InputLabel>Parent Category</InputLabel>
              <Select
                {...field}
                label="Parent Category"
              >
                <MenuItem value="">
                  <em>Root Category (No Parent)</em>
                </MenuItem>
                {availableParentCategories.map((cat) => (
                  <MenuItem key={cat.category.id} value={cat.category.id}>
                    {cat.category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.parentId && (
                <FormHelperText>{errors.parentId.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="active"
          control={control}
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  color="primary"
                />
              }
              label="Active"
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pt: 2 }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={!isValid}
          >
            {category ? 'Update Category' : 'Create Category'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}