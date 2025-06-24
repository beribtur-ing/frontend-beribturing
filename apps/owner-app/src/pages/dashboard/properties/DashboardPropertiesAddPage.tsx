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
import { useProductCategoryRdos, useProductMutation } from '~/hooks';
import { ProductCategoryRdo, QueryResponse } from '@beribturing/api-stub';

interface PropertyForm {
  title: string;
  categoryId: string;
  description: string;
}

const formSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  categoryId: yup.string().required('Category is required'),
  description: yup.string().trim().required('Description is required'),
});

export default function DashboardPropertiesAddPage() {
  const { data: categories }: { data: QueryResponse<ProductCategoryRdo[]> } = useProductCategoryRdos({});
  const { mutation } = useProductMutation();
  const navigate = useNavigate();
  const form = useForm<PropertyForm>({
    defaultValues: {},
    resolver: yupResolver(formSchema) as any,
  });

  const { handleSubmit, control, formState } = form;
  const { errors } = formState;
  const { registerProduct } = mutation;

  const onSubmit = async (data: PropertyForm) => {
    await registerProduct.mutateAsync({ productOwnRegCdo: { ...data } }, {
      onSuccess: () => {
        navigate('../properties');
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
        <div>
            <div className="mb-8">
                <Link
                    to={'/dashboard/properties'}
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
                                    label="Property Title"
                                    placeholder="e.g., Professional DSLR Camera"
                                    required
                                    error={errors?.title}
                                    {...field}
                                    value={field.value || ''}
                                />
                            )}
                        />
                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <CustomSelect<ProductCategoryRdo>
                                    {...field}
                                    options={categories?.result}
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
                                label="Description"
                                placeholder="Describe your property in detail..."
                                required
                                error={errors?.description}
                                {...field}
                                value={field.value || ''}
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
