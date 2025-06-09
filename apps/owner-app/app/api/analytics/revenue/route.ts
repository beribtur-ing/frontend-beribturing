import { NextResponse } from "next/server"
import { mockRevenueData } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json(mockRevenueData)
}
