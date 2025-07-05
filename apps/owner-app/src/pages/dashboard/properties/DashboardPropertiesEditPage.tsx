import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useProductRdo, useProductCategoryRdos, useProductMutation } from '~/hooks';
import {
  Product,
  ProductCategory,
  ProductRdo,
  ProductImage,
  ProductCategoryRdo,
  NameValueList,
  PriceUnit,
  ProductVariant,
  Entities,
} from '@beribturing/api-stub';
import { useForm, Controller, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from '~/components/shared/CustomInput';
import { CustomSelect } from '~/components/shared/CustomSelect';
import { CustomTextarea } from '~/components/shared/CustomTextarea';
import { ProductVariantForm, ProductVariantFormValues } from '~/forms';
import { CustomButton } from '~/components/shared/CustomButton';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Separator } from '~/components/ui/separator';
import { Plus, Save, Upload, Edit, ArrowLeft, Trash2 } from 'lucide-react';
import { RichTextEditor } from '~/components/rich-text-editor';
import { ImageUpload } from '~/components/image-upload';
import type { ProductOwnRegCdo, ProductVariantRegCdo } from '~/types/product';

// Mock data for demonstration
const mockCategories: ProductCategory[] = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Furniture' },
  { id: '3', name: 'Clothing' },
  { id: '4', name: 'Books' },
] as ProductCategory[];

const mockProductData: ProductRdo = {
  product: {
    id: 'prod-1',
    title: 'Sample Product',
    description: 'This is a sample product description',
    categoryId: '1',
  } as Product,
  category: {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices',
  } as ProductCategory,
  variantRdos: [
    {
      variant: {
        productId: 'prod-1',
        price: {
          currency: { amount: 100, currency: 'USD' },
          unit: PriceUnit.DAILY,
        },
        size: {
          label: 'Medium',
          width: 10,
          height: 20,
          depth: 5,
          weight: 2.5,
          measureUnit: 'cm',
        },
        color: 'Blue',
        brand: 'Sample Brand',
        model: 'Model X',
        manufacturer: 'Sample Manufacturer',
        madeIn: 'USA',
        producedYear: '2023',
        material: 'Plastic',
        manual: 'User manual content',
        availability: {
          availableFrom: new Date('2024-01-01'),
          availableUntil: new Date('2024-12-31'),
          availableDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
        },
        active: true,
      } as ProductVariant,
      images: [{
        variantId: 'var-1',
        url: '/placeholder.svg?height=100&width=100',
        order: 1,
        active: true,
      } as ProductImage],
    },
  ],
};

const DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const;
const PRICE_UNITS = ['HOURLY', 'DAILY', 'WEEKLY'] as const;
const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY'] as const;

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
    values: product ? { ...product?.product } : { title: '', description: '', categoryId: '' },
    resolver: yupResolver(productFormSchema),
  });
  const { mutation: { modifyProduct } } = useProductMutation();
  const [newVariants, setNewVariants] = useState<ProductVariantFormValues[]>([]);

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

  const [productData, setProductData] = useState<ProductRdo>(mockProductData);
  const [productForm, setProductForm] = useState<ProductOwnRegCdo>({
    title: '',
    description: '',
    categoryId: '',
  });
  const [newVariantForm, setNewVariantForm] = useState<ProductVariantRegCdo>({
    productId: '',
    name: '',
    description: '',
    price: {
      currency: { amount: 0, currency: 'USD' },
      unit: 'DAILY',
    },
    size: {
      label: '',
      width: 0,
      height: 0,
      depth: 0,
      weight: 0,
      measureUnit: 'cm',
    },
    color: '',
    brand: '',
    model: '',
    manufacturer: '',
    madeIn: '',
    producedYear: '',
    material: '',
    manual: '',
    availability: {
      availableFrom: '',
      availableUntil: '',
      availableDays: [],
    },
    active: true,
  });
  const [newVariantImages, setNewVariantImages] = useState<File[]>([]);
  const [showNewVariantForm, setShowNewVariantForm] = useState(false);

  const [editingVariants, setEditingVariants] = useState<{ [key: number]: boolean }>({});
  const [variantForms, setVariantForms] = useState<{ [key: number]: any }>({});
  const [variantImages, setVariantImages] = useState<{ [key: number]: File[] }>({});

  // Initialize forms with existing data
  useEffect(() => {
    if (productData) {
      setProductForm({
        title: productData.product.title,
        description: productData.product.description,
        categoryId: productData.product.categoryId,
      });
      setNewVariantForm((prev) => ({
        ...prev,
        productId: productData.product.id,
      }));
    }
  }, [productData]);

  const handleVariantRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('command', JSON.stringify({ productVariantRegCdo: newVariantForm }));

      newVariantImages.forEach((image, index) => {
        formData.append('images', image);
      });

      console.log('Registering variant:', newVariantForm);
      console.log('Images:', newVariantImages);

      // Here you would make an API call to register the variant
      alert('Variant registered successfully!');

      // Reset form
      setNewVariantForm({
        productId: productData.product.id,
        name: '',
        description: '',
        price: {
          currency: { amount: 0, currency: 'USD' },
          unit: 'DAILY',
        },
        size: {
          label: '',
          width: 0,
          height: 0,
          depth: 0,
          weight: 0,
          measureUnit: 'cm',
        },
        color: '',
        brand: '',
        model: '',
        manufacturer: '',
        madeIn: '',
        producedYear: '',
        material: '',
        manual: '',
        availability: {
          availableFrom: '',
          availableUntil: '',
          availableDays: [],
        },
        active: true,
      });
      setNewVariantImages([]);
      setShowNewVariantForm(false);
    } catch (error) {
      console.error('Error registering variant:', error);
      alert('Error registering variant');
    }
  };

  const handleDayToggle = (day: (typeof DAYS_OF_WEEK)[number], checked: boolean) => {
    setNewVariantForm((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        availableDays: checked
          ? [...prev.availability.availableDays, day]
          : prev.availability.availableDays.filter((d) => d !== day),
      },
    }));
  };

  return (
        <div className="container mx-auto p-6 max-w-6xl">
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 hover:bg-gray-100"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

            {/* Product Edit Form */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        Product Information
                    </CardTitle>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Controller control={control} render={({ field }) => {
                                  return (
                                        <Input
                                            id="title"
                                            className="mt-1"
                                            {...field}
                                        />
                                  );
                                }} name="title" />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Controller control={control} name="categoryId" render={({ field }) => {
                                  return (
                                        <Select {...field}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {productCategories.map((rdo) => (
                                                    <SelectItem key={rdo.category.id} value={rdo.category.id}>
                                                        {rdo.category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                  );
                                }} />
                            </div>
                        </div>

                        <Controller control={control} render={({ field }) => {
                          return (
                                <RichTextEditor
                                    label="Description"
                                    placeholder="Enter product description..."
                                    {...field}
                                />
                          );
                        }} name="description" />

                        <Button type="submit" className="w-full md:w-auto">
                            <Save className="h-4 w-4 mr-2" />
                            Save Product
                        </Button>
                    </CardContent>
                </form>
            </Card>

            {/* Existing Variants - Now Editable */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Product Variants</h2>
                {productData.variantRdos.map((variantRdo, index) => (
                    <Card key={index} className="mb-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Variant {index + 1}</CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (editingVariants[index]) {
                                    // Save changes
                                    setEditingVariants((prev) => ({ ...prev, [index]: false }));
                                  } else {
                                    // Start editing
                                    setEditingVariants((prev) => ({ ...prev, [index]: true }));
                                    setVariantForms((prev) => ({ ...prev, [index]: { ...variantRdo.variant } }));
                                    setVariantImages((prev) => ({ ...prev, [index]: [] }));
                                  }
                                }}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                {editingVariants[index] ? 'Save' : 'Edit'}
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {editingVariants[index] ? (
                                // Editable form (without images management)
                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Color</Label>
                                            <Input
                                                value={variantForms[index]?.color || ''}
                                                onChange={(e) =>
                                                  setVariantForms((prev) => ({
                                                    ...prev,
                                                    [index]: { ...prev[index], color: e.target.value },
                                                  }))
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Brand</Label>
                                            <Input
                                                value={variantForms[index]?.brand || ''}
                                                onChange={(e) =>
                                                  setVariantForms((prev) => ({
                                                    ...prev,
                                                    [index]: { ...prev[index], brand: e.target.value },
                                                  }))
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Model</Label>
                                            <Input
                                                value={variantForms[index]?.model || ''}
                                                onChange={(e) =>
                                                  setVariantForms((prev) => ({
                                                    ...prev,
                                                    [index]: { ...prev[index], model: e.target.value },
                                                  }))
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Manufacturer</Label>
                                            <Input
                                                value={variantForms[index]?.manufacturer || ''}
                                                onChange={(e) =>
                                                  setVariantForms((prev) => ({
                                                    ...prev,
                                                    [index]: { ...prev[index], manufacturer: e.target.value },
                                                  }))
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Made In</Label>
                                            <Input
                                                value={variantForms[index]?.madeIn || ''}
                                                onChange={(e) =>
                                                  setVariantForms((prev) => ({
                                                    ...prev,
                                                    [index]: { ...prev[index], madeIn: e.target.value },
                                                  }))
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Produced Year</Label>
                                            <Input
                                                value={variantForms[index]?.producedYear || ''}
                                                onChange={(e) =>
                                                  setVariantForms((prev) => ({
                                                    ...prev,
                                                    [index]: { ...prev[index], producedYear: e.target.value },
                                                  }))
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Material</Label>
                                            <Input
                                                value={variantForms[index]?.material || ''}
                                                onChange={(e) =>
                                                  setVariantForms((prev) => ({
                                                    ...prev,
                                                    [index]: { ...prev[index], material: e.target.value },
                                                  }))
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>Manual</Label>
                                            <Input
                                                value={variantForms[index]?.manual || ''}
                                                onChange={(e) =>
                                                  setVariantForms((prev) => ({
                                                    ...prev,
                                                    [index]: { ...prev[index], manual: e.target.value },
                                                  }))
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    {/* Price Information */}
                                    <div>
                                        <h4 className="font-medium mb-2">Price Information</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label>Amount</Label>
                                                <Input
                                                    type="number"
                                                    value={variantForms[index]?.price?.currency?.amount || 0}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          price: {
                                                            ...prev[index]?.price,
                                                            currency: {
                                                              ...prev[index]?.price?.currency,
                                                              amount: Number(e.target.value),
                                                            },
                                                          },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Currency</Label>
                                                <Select
                                                    value={variantForms[index]?.price?.currency?.currency || 'USD'}
                                                    onValueChange={(value) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          price: {
                                                            ...prev[index]?.price,
                                                            currency: {
                                                              ...prev[index]?.price?.currency,
                                                              currency: value,
                                                            },
                                                          },
                                                        },
                                                      }))
                                                    }
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {CURRENCIES.map((currency) => (
                                                            <SelectItem key={currency} value={currency}>
                                                                {currency}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Unit</Label>
                                                <Select
                                                    value={variantForms[index]?.price?.unit || 'DAILY'}
                                                    onValueChange={(value) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          price: {
                                                            ...prev[index]?.price,
                                                            unit: value,
                                                          },
                                                        },
                                                      }))
                                                    }
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {PRICE_UNITS.map((unit) => (
                                                            <SelectItem key={unit} value={unit}>
                                                                {unit}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Size Information */}
                                    <div>
                                        <h4 className="font-medium mb-2">Size Information</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label>Size Label</Label>
                                                <Input
                                                    value={variantForms[index]?.size?.label || ''}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          size: { ...prev[index]?.size, label: e.target.value },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Width</Label>
                                                <Input
                                                    type="number"
                                                    value={variantForms[index]?.size?.width || 0}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          size: {
                                                            ...prev[index]?.size,
                                                            width: Number(e.target.value),
                                                          },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Height</Label>
                                                <Input
                                                    type="number"
                                                    value={variantForms[index]?.size?.height || 0}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          size: {
                                                            ...prev[index]?.size,
                                                            height: Number(e.target.value),
                                                          },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Depth</Label>
                                                <Input
                                                    type="number"
                                                    value={variantForms[index]?.size?.depth || 0}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          size: {
                                                            ...prev[index]?.size,
                                                            depth: Number(e.target.value),
                                                          },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Weight</Label>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    value={variantForms[index]?.size?.weight || 0}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          size: {
                                                            ...prev[index]?.size,
                                                            weight: Number(e.target.value),
                                                          },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Measure Unit</Label>
                                                <Input
                                                    value={variantForms[index]?.size?.measureUnit || ''}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          size: {
                                                            ...prev[index]?.size,
                                                            measureUnit: e.target.value,
                                                          },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div>
                                        <h4 className="font-medium mb-4">Availability</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <Label>Available From</Label>
                                                <Input
                                                    type="date"
                                                    value={variantForms[index]?.availability?.availableFrom || ''}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          availability: {
                                                            ...prev[index]?.availability,
                                                            availableFrom: e.target.value,
                                                          },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Available Until</Label>
                                                <Input
                                                    type="date"
                                                    value={variantForms[index]?.availability?.availableUntil || ''}
                                                    onChange={(e) =>
                                                      setVariantForms((prev) => ({
                                                        ...prev,
                                                        [index]: {
                                                          ...prev[index],
                                                          availability: {
                                                            ...prev[index]?.availability,
                                                            availableUntil: e.target.value,
                                                          },
                                                        },
                                                      }))
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-sm font-medium">Available Days</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                                {DAYS_OF_WEEK.map((day) => (
                                                    <div key={day} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`${day}-${index}`}
                                                            checked={variantForms[index]?.availability?.availableDays?.includes(day) || false}
                                                            onCheckedChange={(checked) => {
                                                              const currentDays = variantForms[index]?.availability?.availableDays || [];
                                                              const newDays = checked ? [...currentDays, day] : currentDays.filter((d) => d !== day);
                                                              setVariantForms((prev) => ({
                                                                ...prev,
                                                                [index]: {
                                                                  ...prev[index],
                                                                  availability: {
                                                                    ...prev[index]?.availability,
                                                                    availableDays: newDays,
                                                                  },
                                                                },
                                                              }));
                                                            }}
                                                        />
                                                        <Label htmlFor={`${day}-${index}`}
                                                               className="text-sm capitalize">
                                                            {day.toLowerCase()}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Active Status */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`active-${index}`}
                                            checked={variantForms[index]?.active || false}
                                            onCheckedChange={(checked) =>
                                              setVariantForms((prev) => ({
                                                ...prev,
                                                [index]: { ...prev[index], active: checked as boolean },
                                              }))
                                            }
                                        />
                                        <Label htmlFor={`active-${index}`}>Active</Label>
                                    </div>
                                </div>
                            ) : (
                                // Read-only view (without images)
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                                        <div>
                                            <strong>Color:</strong> {variantRdo.variant.color}
                                        </div>
                                        <div>
                                            <strong>Brand:</strong> {variantRdo.variant.brand}
                                        </div>
                                        <div>
                                            <strong>Model:</strong> {variantRdo.variant.model}
                                        </div>
                                        <div>
                                            <strong>Manufacturer:</strong> {variantRdo.variant.manufacturer}
                                        </div>
                                        <div>
                                            <strong>Made In:</strong> {variantRdo.variant.madeIn}
                                        </div>
                                        <div>
                                            <strong>Produced Year:</strong> {variantRdo.variant.producedYear}
                                        </div>
                                        <div>
                                            <strong>Material:</strong> {variantRdo.variant.material}
                                        </div>
                                        <div>
                                            <strong>Manual:</strong> {variantRdo.variant.manual}
                                        </div>
                                        <div>
                                            <strong>Price:</strong> {variantRdo.variant.price?.currency.amount}{' '}
                                            {variantRdo.variant.price?.currency.currency} / {variantRdo.variant.price?.unit}
                                        </div>
                                        <div>
                                            <strong>Size:</strong> {variantRdo.variant.size?.label} ({variantRdo.variant.size?.width}x
                                            {variantRdo.variant.size?.height}x{variantRdo.variant.size?.depth}{' '}
                                            {variantRdo.variant.size?.measureUnit}, {variantRdo.variant.size?.weight}kg)
                                        </div>
                                        <div>
                                            <>
                                                <strong>Available:</strong> {variantRdo.variant.availability?.availableFrom?.toLocaleDateString()} to{' '}
                                                {variantRdo.variant.availability?.availableUntil?.toLocaleDateString()}
                                            </>
                                        </div>
                                        <div>
                                            <strong>Available
                                                    Days:</strong> {variantRdo.variant.availability?.availableDays?.join(', ')}
                                        </div>
                                        <div>
                                            <strong>Active:</strong> {variantRdo.variant.active ? 'Yes' : 'No'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Separator between variant info and images */}
                            <Separator className="my-6" />

                            {/* Images Management Section - Always Visible */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-medium">Images Management</h4>
                                    <span className="text-sm text-gray-500">
                    {variantRdo.images.length} existing image{variantRdo.images.length !== 1 ? 's' : ''}
                  </span>
                                </div>

                                {/* Existing Images with Delete Functionality */}
                                {variantRdo.images.length > 0 && (
                                    <div className="mb-4">
                                        <Label className="text-sm font-medium mb-2 block">Existing Images</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {variantRdo.images.map((image, imgIndex) => (
                                                <Card key={imgIndex} className="relative p-2 group">
                                                    <img
                                                        src={image.url || '/placeholder.svg'}
                                                        alt={`Variant ${index + 1} Image ${imgIndex + 1}`}
                                                        className="w-full h-24 object-cover rounded"
                                                    />
                                                    <div
                                                        onClick={() => {
                                                          // Create preview URL for file
                                                          // const previewUrl = URL.createObjectURL(image)
                                                          const modal = document.createElement('div');
                                                          modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
                                                          modal.innerHTML = `
                      <div class="relative max-w-4xl max-h-full">
                        <img src="${image.url || '/placeholder.svg'}" alt="Preview" class="max-w-full max-h-full object-contain rounded" />
                        <button class="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100" onclick="this.parentElement.parentElement.remove()">
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    `;
                                                          modal.onclick = (e) => {
                                                            if (e.target === modal) {
                                                              // URL.revokeObjectURL(previewUrl)
                                                              modal.remove();
                                                            }
                                                          };
                                                          document.body.appendChild(modal);
                                                        }}
                                                        className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-200 rounded flex items-start justify-end">
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 rounded-full p-0"
                                                            onClick={() => {
                                                              // Handle existing image deletion
                                                              console.log(`Delete
                                                                existing image
                                                                ${imgIndex}
                                                                from
                                                                variant
                                                                ${index}`);
                                                              // Here you would make an API call to delete the image
                                                              alert(`Delete
                                                                image
                                                                ${imgIndex + 1}
                                                                from
                                                                variant
                                                                ${index + 1}`);
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="mt-1 text-xs text-gray-600 text-center">
                                                        Order: {image.order} | {image.active ? 'Active' : 'Inactive'}
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Add New Images Section */}
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">Add New Images</Label>
                                    <ImageUpload
                                        images={variantImages[index] || []}
                                        onImagesChange={(images) => setVariantImages((prev) => ({
                                          ...prev,
                                          [index]: images,
                                        }))}
                                    />

                                    {/* Save New Images Button */}
                                    {(variantImages[index] || []).length > 0 && (
                                        <div className="mt-4">
                                            <Button
                                                onClick={() => {
                                                  // Handle saving new images
                                                  console.log(`Save ${variantImages[index]?.length} new images for variant ${index}`);
                                                  // Here you would make an API call to save the new images
                                                  alert(`Save ${variantImages[index]?.length} new images for variant ${index + 1}`);
                                                  // Clear the new images after saving
                                                  setVariantImages((prev) => ({ ...prev, [index]: [] }));
                                                }}
                                                className="w-full md:w-auto"
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Save New Images ({(variantImages[index] || []).length})
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Add New Variant Button */}
            {!showNewVariantForm && (
                <Button onClick={() => setShowNewVariantForm(true)} className="mb-6" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Variant
                </Button>
            )}

            {/* New Variant Form */}
            {showNewVariantForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Register New Variant
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="variantName">Name</Label>
                                <Input
                                    id="variantName"
                                    value={newVariantForm.name}
                                    onChange={(e) => setNewVariantForm((prev) => ({ ...prev, name: e.target.value }))}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="color">Color</Label>
                                <Input
                                    id="color"
                                    value={newVariantForm.color}
                                    onChange={(e) => setNewVariantForm((prev) => ({ ...prev, color: e.target.value }))}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <RichTextEditor
                            label="Description"
                            value={newVariantForm.description}
                            onChange={(value) => setNewVariantForm((prev) => ({ ...prev, description: value }))}
                            placeholder="Enter variant description..."
                        />

                        {/* Price Information */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Price Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={newVariantForm.price.currency.amount}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            price: {
                                              ...prev.price,
                                              currency: {
                                                ...prev.price.currency,
                                                amount: Number(e.target.value),
                                              },
                                            },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select
                                        value={newVariantForm.price.currency.currency}
                                        onValueChange={(value) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            price: {
                                              ...prev.price,
                                              currency: { ...prev.price.currency, currency: value },
                                            },
                                          }))
                                        }
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CURRENCIES.map((currency) => (
                                                <SelectItem key={currency} value={currency}>
                                                    {currency}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="unit">Unit</Label>
                                    <Select
                                        value={newVariantForm.price.unit}
                                        onValueChange={(value: any) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            price: { ...prev.price, unit: value },
                                          }))
                                        }
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PRICE_UNITS.map((unit) => (
                                                <SelectItem key={unit} value={unit}>
                                                    {unit}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Size Information */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Size Information</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="sizeLabel">Size Label</Label>
                                    <Input
                                        id="sizeLabel"
                                        value={newVariantForm.size.label}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, label: e.target.value },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="width">Width</Label>
                                    <Input
                                        id="width"
                                        type="number"
                                        value={newVariantForm.size.width}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, width: Number(e.target.value) },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="height">Height</Label>
                                    <Input
                                        id="height"
                                        type="number"
                                        value={newVariantForm.size.height}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, height: Number(e.target.value) },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="depth">Depth</Label>
                                    <Input
                                        id="depth"
                                        type="number"
                                        value={newVariantForm.size.depth}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, depth: Number(e.target.value) },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="weight">Weight</Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        step="0.1"
                                        value={newVariantForm.size.weight}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, weight: Number(e.target.value) },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="measureUnit">Measure Unit</Label>
                                    <Input
                                        id="measureUnit"
                                        value={newVariantForm.size.measureUnit}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, measureUnit: e.target.value },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Product Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="brand">Brand</Label>
                                    <Input
                                        id="brand"
                                        value={newVariantForm.brand}
                                        onChange={(e) => setNewVariantForm((prev) => ({
                                          ...prev,
                                          brand: e.target.value,
                                        }))}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="model">Model</Label>
                                    <Input
                                        id="model"
                                        value={newVariantForm.model}
                                        onChange={(e) => setNewVariantForm((prev) => ({
                                          ...prev,
                                          model: e.target.value,
                                        }))}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="manufacturer">Manufacturer</Label>
                                    <Input
                                        id="manufacturer"
                                        value={newVariantForm.manufacturer}
                                        onChange={(e) => setNewVariantForm((prev) => ({
                                          ...prev,
                                          manufacturer: e.target.value,
                                        }))}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="madeIn">Made In</Label>
                                    <Input
                                        id="madeIn"
                                        value={newVariantForm.madeIn}
                                        onChange={(e) => setNewVariantForm((prev) => ({
                                          ...prev,
                                          madeIn: e.target.value,
                                        }))}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="producedYear">Produced Year</Label>
                                    <Input
                                        id="producedYear"
                                        value={newVariantForm.producedYear}
                                        onChange={(e) => setNewVariantForm((prev) => ({
                                          ...prev,
                                          producedYear: e.target.value,
                                        }))}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="material">Material</Label>
                                    <Input
                                        id="material"
                                        value={newVariantForm.material}
                                        onChange={(e) => setNewVariantForm((prev) => ({
                                          ...prev,
                                          material: e.target.value,
                                        }))}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Manual */}
                        <div>
                            <Label htmlFor="manual">Manual</Label>
                            <Input
                                id="manual"
                                value={newVariantForm.manual}
                                onChange={(e) => setNewVariantForm((prev) => ({ ...prev, manual: e.target.value }))}
                                placeholder="Enter manual content..."
                                className="mt-1"
                            />
                        </div>

                        {/* Availability */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Availability</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <Label htmlFor="availableFrom">Available From</Label>
                                    <Input
                                        id="availableFrom"
                                        type="date"
                                        value={newVariantForm.availability.availableFrom}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            availability: { ...prev.availability, availableFrom: e.target.value },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="availableUntil">Available Until</Label>
                                    <Input
                                        id="availableUntil"
                                        type="date"
                                        value={newVariantForm.availability.availableUntil}
                                        onChange={(e) =>
                                          setNewVariantForm((prev) => ({
                                            ...prev,
                                            availability: { ...prev.availability, availableUntil: e.target.value },
                                          }))
                                        }
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium">Available Days</Label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    {DAYS_OF_WEEK.map((day) => (
                                        <div key={day} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={day}
                                                checked={newVariantForm.availability.availableDays.includes(day)}
                                                onCheckedChange={(checked) => handleDayToggle(day, checked as boolean)}
                                            />
                                            <Label htmlFor={day} className="text-sm capitalize">
                                                {day.toLowerCase()}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="active"
                                checked={newVariantForm.active}
                                onCheckedChange={(checked) => setNewVariantForm((prev) => ({
                                  ...prev,
                                  active: checked as boolean,
                                }))}
                            />
                            <Label htmlFor="active">Active</Label>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <h3 className="text-lg font-medium mb-4">Images</h3>
                            <ImageUpload images={newVariantImages} onImagesChange={setNewVariantImages} />
                        </div>

                        <Separator />

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Button onClick={handleVariantRegister} className="flex-1 md:flex-none">
                                <Upload className="h-4 w-4 mr-2" />
                                Register Variant
                            </Button>
                            <Button variant="outline" onClick={() => setShowNewVariantForm(false)}
                                    className="flex-1 md:flex-none">
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
  );
}
