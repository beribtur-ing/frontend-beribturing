import { NextResponse } from "next/server"
import { mockReservations, mockRentalRecords } from "@/lib/mock-data"

export async function GET() {
  const allBookings = [
    ...mockReservations.map((res) => ({ ...res, type: "reservation" })),
    ...mockRentalRecords.map((rental) => ({ ...rental, type: "rental" })),
  ]

  return NextResponse.json(allBookings)
}
