import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from '~/components/shared/CustomInput';
import { CustomSelect } from '~/components/shared/CustomSelect';
import { CustomTextarea } from '~/components/shared/CustomTextarea';
import { CustomButton } from '~/components/shared/CustomButton';
import { useProductCategoryRdos } from '~/hooks';

interface PropertyForm {
  title: string;
  description: string;
  categoryId: string;
  brand: string;
  model: string;
  color: string;
  size: string;
  material: string;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  notes: string;
}

const formSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  categoryId: yup.string().required('Category is required'),
});

const categoryOptions = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'sports', name: 'Sports & Recreation' },
  { id: 'tools', name: 'Tools & Equipment' },
  { id: 'vehicles', name: 'Vehicles' },
  { id: 'home', name: 'Home & Garden' },
];

export default function DashboardPropertiesAddPage() {
  const { data: categories } = useProductCategoryRdos({});
  const navigate = useNavigate();
  const form = useForm<PropertyForm>({
    defaultValues: {},
    resolver: yupResolver(formSchema) as any,
  });

  const { handleSubmit, control, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: PropertyForm) => {
    console.log(data);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate(`/dashboard/properties`);
      } else {
        alert('Failed to create property');
      }
    } catch (error) {
      alert('Error creating property');
    } finally {
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          to={`/dashboard/properties`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Properties
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="Property Title"
                  placeholder="e.g., Professional DSLR Camera"
                  required
                  error={errors?.title}
                />
              )}
            />
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={categoryOptions}
                  dataItemKey={'id'}
                  textField={'name'}
                  label="Category"
                  placeholder="Select a category"
                  required
                  error={errors?.categoryId}
                />
              )}
            />
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CustomTextarea
                {...field}
                label="Description"
                placeholder="Describe your property in detail..."
                required
                error={errors?.description}
              />
            )}
          />

          <div className="flex justify-end space-x-4">
            <CustomButton to="/dashboard/properties" variant="secondary">
              Cancel
            </CustomButton>

            <CustomButton type="submit" isLoading={false} variant="primary">
              Create Property
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
