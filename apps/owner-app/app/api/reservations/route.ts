import { NextResponse } from "next/server"
import { mockReservations } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json(mockReservations)
}
