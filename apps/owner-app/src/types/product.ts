export interface ProductOwnRegCdo {
  title: string
  description: string
  categoryId: string
}

export interface ProductCategory {
  id: string
  name: string
}

export interface ProductVariantRegCdo {
  productId: string
  name: string
  description: string
  price: {
    currency: {
      amount: number
      currency: string
    }
    unit: 'HOURLY' | 'DAILY' | 'WEEKLY'
  }
  size: {
    label: string
    width: number
    height: number
    depth: number
    weight: number
    measureUnit: string
  }
  color: string
  brand: string
  model: string
  manufacturer: string
  madeIn: string
  producedYear: string
  material: string
  manual: string
  availability: {
    availableFrom: string
    availableUntil: string
    availableDays: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[]
  }
  active: boolean
}

export interface ProductRdo {
  product: {
    id: string
    title: string
    description: string
    categoryId: string
  }
  category: {
    id: string
    name: string
    description: string
  }
  variantRdos: Array<{
    variant: {
      productId: string
      price: {
        currency: {
          amount: number
          currency: string
        }
        unit: 'HOURLY' | 'DAILY' | 'WEEKLY'
      }
      size: {
        label: string
        width: number
        height: number
        depth: number
        weight: number
        measureUnit: string
      }
      color: string
      brand: string
      model: string
      manufacturer: string
      madeIn: string
      producedYear: string
      material: string
      manual: string
      availability: {
        availableFrom: string
        availableUntil: string
        availableDays: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[]
      }
      active: boolean
    }
    images: Array<{
      variantId: string
      url: string
      order: number
      active: boolean
    }>
  }>
}
