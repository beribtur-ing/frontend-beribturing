import { NextResponse } from "next/server"
import { mockReservations } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const reservation = mockReservations.find((r) => r.id === params.id)

  if (!reservation) {
    return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
  }

  return NextResponse.json(reservation)
}
