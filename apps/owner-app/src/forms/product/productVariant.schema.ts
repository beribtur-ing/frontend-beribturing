import * as yup from 'yup';
import { PriceUnit } from '@beribturing/api-stub';

const priceSchema = yup.object({
  currency: yup.string().required('Currency is required'),
  unit: yup
    .mixed<PriceUnit>()
    .oneOf(Object.values(PriceUnit))
    .required('Price unit is required'),
});

const sizeSchema = yup.object({
  label: yup.string().optional(),
  width: yup.number().positive('Width must be a positive number').optional(),
  height: yup.number().positive('Height must be a positive number').optional(),
  depth: yup.number().positive('Depth must be a positive number').optional(),
  weight: yup.number().positive('Weight must be a positive number').optional(),
  measureUnit: yup.string().optional(),
});

const availabilitySchema = yup.object({
  availableFrom: yup.date().nullable().optional(),
  availableUntil: yup
    .date()
    .nullable()
    .min(yup.ref('availableFrom'), 'Available until must be after available from')
    .optional(),
  availableDays: yup.array(yup.string()).optional(),
});

const productImageSchema = yup.object({
  variantId: yup.string().required(),
  url: yup.string().url('Must be a valid URL').required('Image URL is required'),
  order: yup.number().min(0, 'Order must be non-negative').required('Order is required'),
  active: yup.boolean().required('Active flag is required'),
});

const variantSchema = yup.object({
  // productId: yup.string().required('Product ID is required'),
  price: priceSchema.optional(),
  size: sizeSchema.optional(),
  color: yup.string().trim().optional(),
  brand: yup.string().trim().optional(),
  model: yup.string().trim().optional(),
  manufacturer: yup.string().trim().optional(),
  madeIn: yup.string().trim().optional(),
  producedYear: yup
    .string()
    .matches(/^\d{4}$/, 'Produced year must be a 4-digit year')
    .optional(),
  material: yup.string().trim().optional(),
  manual: yup.string().trim().optional(),
  availability: availabilitySchema.optional(),
  active: yup.boolean().required('Active status is required'),
  // imageSequence: yup.number().min(0).optional(),
  notes: yup.string().trim().optional(),
});

export const productVariantSchema = yup.object({
  // productId: yup.string().required('Product ID is required'),
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().required('Description is required'),
  variant: variantSchema.required(),
  images: yup.array(productImageSchema).required('At least one image is required'),
});

export type ProductVariantFormValues = yup.InferType<typeof productVariantSchema>;