import React, { useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductVariantFormValues, productVariantSchema } from '~/forms';
import { CustomInput } from '~/components/shared/CustomInput';
import { CustomTextarea } from '~/components/shared/CustomTextarea';
import { CustomButton } from '~/components/shared/CustomButton';

interface ProductVariantFormProps {
  defaultValues: ProductVariantFormValues;
  onSubmit?: (values: ProductVariantFormValues) => void;
  register?: boolean; // <--- new prop
}

export const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
  defaultValues,
  onSubmit,
  register = true,
}) => {
  const [isEditing, setIsEditing] = useState(register); // Start editable if registering, otherwise disabled

  const {
    control,
    register: rhfRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductVariantFormValues>({
    defaultValues,
    resolver: yupResolver(productVariantSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  });

  const handleModify = () => setIsEditing(true);
  const handleCancel = () => {
    reset(defaultValues); // restore original values
    setIsEditing(false); // back to read-only
  };

  const isDisabled = !isEditing;

  return (
        <form onSubmit={handleSubmit(onSubmit ?? (() => {
        }))} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white rounded-xl shadow-md">
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <CustomInput
                            label="Name"
                            disabled={isDisabled}
                            error={errors.name}
                            {...field}
                        />)}
                />

                <Controller
                    control={control}
                    name="variant.color"
                    render={({ field }) => (
                        <CustomInput
                            label="Color"
                            disabled={isDisabled}
                            error={errors.variant?.color}
                            {...field}
                            value={field.value || ''}
                        />)} />

                <Controller
                    control={control}
                    name="variant.brand"
                    render={({ field }) => (
                        <CustomInput
                            label="Brand"
                            disabled={isDisabled}
                            error={errors.variant?.brand}
                            {...field}
                            value={field.value || ''}
                        />)} />

                <Controller
                    control={control}
                    name="variant.producedYear"
                    render={({ field }) => (
                        <CustomInput
                            label="Produced Year"
                            placeholder="e.g. 2023"
                            disabled={isDisabled}
                            error={errors.variant?.producedYear}
                            {...field}
                            value={field.value || ''}
                        />)} />

                <Controller
                    control={control}
                    name="variant.price.currency"
                    render={({ field }) => (
                        <CustomInput
                            label="Currency"
                            {...field}
                            disabled={isDisabled}
                            error={errors.variant?.price?.currency}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="variant.price.unit"
                    render={({ field }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Unit</label>
                            <select
                                {...field}
                                disabled={isDisabled}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                                  errors.variant?.price?.unit ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                }`}
                            >
                                <option value="">Select Unit</option>
                                <option value="HOURLY">Hourly</option>
                                <option value="DAILY">Daily</option>
                                <option value="WEEKLY">Weekly</option>
                            </select>
                            {typeof errors.variant?.price?.unit?.message === 'string' && (
                                <p className="text-sm text-red-500 mt-1">{errors.variant?.price?.unit.message}</p>
                            )}
                        </div>
                    )}
                />

                <div className="md:col-span-2 lg:col-span-3">
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <CustomTextarea
                                label="Description"
                                disabled={isDisabled}
                                rows={4}
                                error={errors.description}
                                {...field}
                            />)} />
                </div>

                <div className="col-span-full">
                    <Controller name="variant.active" control={control} render={({ field }) => (

                        <label className="inline-flex items-center mt-4">
                            <input type="checkbox" disabled={isDisabled} {...field} checked={field.value || false}
                                   value={undefined}
                                   className="mr-2" />
                            <span className="text-sm font-medium">Active</span>
                        </label>
                    )} />
                    {errors.variant?.active && (
                        <p className="text-sm text-red-500 mt-1">{errors.variant.active.message}</p>
                    )}
                </div>

                <div className="col-span-full mt-4">
                    <label className="block text-sm font-medium mb-2">Images</label>
                    {fields.map((image, index) => (
                        <div key={image.id} className="border p-4 rounded-md mb-4 space-y-2 bg-gray-50">
                            <Controller name={`images.${index}.url`}
                                        control={control}
                                        render={({ field }) => (

                                            <CustomInput
                                                label="Image URL"
                                                disabled={isDisabled}
                                                error={errors.images?.[index]?.url}
                                                {...field}
                                            />
                                        )}
                            />
                            <Controller name={`images.${index}.order`}
                                        control={control}
                                        render={({ field }) => (
                                            <CustomInput
                                                type="number"
                                                label="Order"
                                                disabled={isDisabled}
                                                error={errors.images?.[index]?.order}
                                                {...field}
                                                value={String(field.value ?? '')}
                                            />
                                        )}
                            />
                            <label className="inline-flex items-center">
                                <input type="checkbox" {...rhfRegister(`images.${index}.active`)} disabled={isDisabled}
                                       className="mr-2" />
                                <span>Active</span>
                            </label>

                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-sm text-red-600 hover:underline mt-1"
                                >
                                    Remove Image
                                </button>
                            )}
                        </div>
                    ))}

                    {isEditing && (
                        <CustomButton
                            type="button"
                            onClick={() =>
                              append({ variantId: '', url: '', order: fields.length, active: true })
                            }
                            variant="secondary"
                        >
                            + Add Image
                        </CustomButton>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 px-4">
                {isEditing ? (
                    <>
                        <CustomButton type="button" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </CustomButton>
                        <CustomButton type="submit" variant="primary">
                            Save Variant
                        </CustomButton>
                    </>
                ) : (
                    <CustomButton type="button" variant="primary" onClick={handleModify}>
                        Modify
                    </CustomButton>
                )}
            </div>
        </form>
  );
};
