import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useProductRdo, useProductCategoryRdos, useProductMutation } from '~/hooks';
import { ProductCategoryRdo, ProductRdo, NameValueList, PriceUnit } from '@beribturing/api-stub';
import { useForm, Controller, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from '~/components/shared/CustomInput';
import { CustomSelect } from '~/components/shared/CustomSelect';
import { CustomTextarea } from '~/components/shared/CustomTextarea';
import { ProductVariantForm, ProductVariantFormValues } from '~/forms';

const productFormSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  categoryId: yup.string().required('Category is required'),
  description: yup.string().trim().required('Description is required'),
});

type VariantForm = UseFormReturn<ProductVariantFormValues>;

interface ProductForm {
  title: string;
  description: string;
  categoryId: string;
}

export default function DashboardPropertiesEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, refetch }: { product: ProductRdo | undefined, refetch } = useProductRdo(id || '');
  const { productCategories }: { productCategories: ProductCategoryRdo[] } = useProductCategoryRdos({});
  const [initialLoading, setInitialLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(productFormSchema),
  });
  const { mutation: { modifyProduct } } = useProductMutation();
  const [newVariants, setNewVariants] = useState<ProductVariantFormValues[]>([]);

  useEffect(() => {
    if (product) {
      reset({
        title: product.product.title,
        description: product.product.description,
        categoryId: product.product.categoryId,
      });
    }
  }, [product]);

  const onSubmit = handleSubmit((productFormData: ProductForm) => {
    const variables: {
      productId: string;
      nameValueList: NameValueList;
    } = {
      productId: id || '', nameValueList: {
        nameValues: Object.entries(productFormData).map(([key, value]) => ({
          name: key,
          value: value.toString(),
        })),
      },
    };

    modifyProduct.mutateAsync(variables, {
      onSuccess: () => {
        refetch();
      }, onError: (err) => {
        console.error(err);
      },
    });
  });

  if (initialLoading) {
    return (
            <div className="animate-pulse">
                <div className="bg-white rounded-lg shadow p-6 h-96"></div>
            </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
                <p className="text-gray-600">Update your rental listing</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => {
                              return (
                                    <CustomInput
                                        label="Property Title"
                                        placeholder="e.g., Professional DSLR Camera"
                                        {...field}
                                        value={field.value || ''}
                                        required
                                        error={errors?.title}
                                    />
                              );
                            }}
                        />

                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => {
                              return (
                                    <CustomSelect
                                        label="Category"
                                        options={productCategories}
                                        dataItemKey="id"
                                        textField="category"
                                        {...field}
                                        required
                                        error={errors?.categoryId}
                                    />
                              );
                            }}
                        />
                    </div>

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => {
                          return (
                                <CustomTextarea
                                    label="Description"
                                    {...field}
                                    value={field.value || ''}
                                    required
                                    placeholder="Describe your property in detail..."
                                    error={errors?.description}
                                />
                          );
                        }}
                    />

                    {/*

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <input
                type="text"
                name="size"
                value={form.size}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
            <input
              type="text"
              name="material"
              value={form.material}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Price ($)</label>
              <input
                type="number"
                name="dailyPrice"
                value={form.dailyPrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Price ($)</label>
              <input
                type="number"
                name="weeklyPrice"
                value={form.weeklyPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Price ($)</label>
              <input
                type="number"
                name="monthlyPrice"
                value={form.monthlyPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

                    <div className="flex justify-end space-x-4">
                        {/*<Link*/}
                        {/*  to={'/dashboard/properties'}*/}
                        {/*  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"*/}
                        {/*>*/}
                        {/*  Cancel*/}
                        {/*</Link>*/}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Property'}
                        </button>
                    </div>
                </form>
                <h2 className="text-xl font-bold text-gray-900 mt-8">Property Variants:</h2>

                <div className="flex justify-end my-4">
                    <button
                        type="button"
                        onClick={() =>
                          setNewVariants((prev) => [
                            ...prev,
                            {
                              name: '',
                              description: '',
                              variant: { active: true } as any,
                              images: [],
                            },
                          ])
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        + Add Variant
                    </button>
                </div>

                {product?.variantRdos.map((variantRdo, index) => (
                    <ProductVariantForm
                        key={variantRdo.variant.productId + '-' + index}
                        defaultValues={{
                          name: '',
                          description: '',
                          variant: variantRdo.variant,
                          images: variantRdo.images,
                        }}
                        register={false} // <-- read mode first
                        onSubmit={(values) => {
                          console.log('Submitting existing variant', index, values);
                        }}
                    />
                ))}

                {newVariants.map((variant, index) => (
                    <ProductVariantForm
                        key={`new-${index}`}
                        defaultValues={variant}
                        register={true}
                        onCancel={() => {
                          setNewVariants((prev) => prev.filter((_, i) => i !== index));
                        }}
                        onSubmit={(values) => {
                          console.log('Submitting new variant', index, values);
                          // optionally remove form after saving if desired
                          setNewVariants((prev) => prev.filter((_, i) => i !== index));
                        }}
                    />
                ))}



            </div>
        </div>
  );
}
