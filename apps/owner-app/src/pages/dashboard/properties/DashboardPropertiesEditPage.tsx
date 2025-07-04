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
import { CustomButton } from '~/components/shared/CustomButton';

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
    watch,
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
        <div className="flex flex-col gap-8 py-8 px-4 bg-background rounded-lg">
            <form className="flex flex-col gap-4">
                <div className="flex gap-4 justify-evenly">
                    <CustomInput
                        required
                        id="title"
                        label="Title"
                        name="title"
                        value={watch('title')}
                        onChange={() => {}}
                    />
                    <CustomSelect
                        label="Category" required name={''}
                        onChange={function (e: React.ChangeEvent<HTMLSelectElement>): void {
                          throw new Error('Function not implemented.');
                        }} options={productCategories.map(p => p.category)} value={watch('categoryId')} dataItemKey="id" textField="name">
                    </CustomSelect>
                </div>
                <CustomTextarea label="Description" required name="description" value={watch('description')} onChange={() => {
                }} />
                <div className="flex justify-center">

                    <CustomButton className="w-40" type="submit">Save</CustomButton>
                </div>
            </form>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Variants:</h2>
                <div className="flex gap-4 justify-evenly">
                    <div className="flex flex-col gap-4 w-full grow">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="name"
                                   className="text-sm after:content-['*'] after:text-red-500 after:ml-1">Name</label>
                            <input id="name" type="text" className="border rounded-[6px] p-2" />
                        </div>
                        <div className="flex flex-col gap-1 w-full grow">
                            <label htmlFor="description"
                                   className="text-sm after:content-['*'] after:text-red-500 after:ml-1">Description</label>
                            <textarea id="description" className="h-full border rounded-[6px] p-2" />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 justify-evenly">
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="price" className="text-sm">Price</label>
                                    <input id="price" type="number" className="border rounded-[6px] p-2" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="currency" className="text-sm">Currency</label>
                                    <select id="currency" className="h-full border rounded-[6px] p-2">
                                        <option value=""></option>
                                        {['UZS'].map(c => (<option key={c}>{c}</option>))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="unit" className="text-sm">Unit</label>
                                    <select id="unit" className="h-full border rounded-[6px] p-2">
                                        <option value=""></option>
                                        {Object.entries(PriceUnit).map(([key, value]) => (
                                            <option key={key} value={key}>{value?.toString()}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 justify-evenly">
                                <h3 className="text-lg text-center">Size:</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="label" className="text-sm">Label</label>
                                        <input placeholder="S or M or L or XL, etc" id="label" type="text"
                                               className="border rounded-[6px] p-2" />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="width" className="text-sm">Width</label>
                                        <input placeholder="in cm or inches" id="width" type="number"
                                               className="border rounded-[6px] p-2" />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="height" className="text-sm">Height</label>
                                        <input placeholder="in cm or inches" id="height" type="number"
                                               className="border rounded-[6px] p-2" />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="depth" className="text-sm">Depth</label>
                                        <input id="depth" type="number" className="border rounded-[6px] p-2" />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="weight" className="text-sm">Weight</label>
                                        <input placeholder="in kg" id="weight" type="number"
                                               className="border rounded-[6px] p-2" />
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="measure-unit" className="text-sm">Measure Unit</label>
                                        <select id="measure-unit" className="border rounded-[6px] p-2">
                                            <option value=""></option>
                                            <option value="metric">Metric</option>
                                            <option value="imperial">Imperial</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
  ;
}
