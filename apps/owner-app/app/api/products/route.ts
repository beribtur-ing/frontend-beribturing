import { NextResponse } from "next/server"
import { mockProducts, mockVariants } from "@/lib/mock-data"

export async function GET() {
  // Combine products with their variants
  const productsWithVariants = mockProducts.map((product) => ({
    ...product,
    variants: mockVariants.filter((variant) => variant.productId === product.id),
  }))

  return NextResponse.json(productsWithVariants)
}

export async function POST(request: Request) {
  const body = await request.json()

  // In a real app, you'd save to database
  const newProduct = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "owner-1",
  }

  return NextResponse.json(newProduct, { status: 201 })
}
