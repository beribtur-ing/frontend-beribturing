import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  // In a real app, you'd update the database
  console.log("Rejecting reservation:", params.id)

  return NextResponse.json({ success: true })
}
