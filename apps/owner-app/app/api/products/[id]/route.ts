import { NextResponse } from "next/server"
import { mockProducts, mockVariants } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  const variants = mockVariants.filter((v) => v.productId === params.id)

  return NextResponse.json({
    ...product,
    variants,
  })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()

  // In a real app, you'd update the database
  console.log("Updating product:", params.id, body)

  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // In a real app, you'd delete from database
  console.log("Deleting product:", params.id)

  return NextResponse.json({ success: true })
}
