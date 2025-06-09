import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  // In a real app, you'd update the database
  console.log("Approving reservation:", params.id)

  return NextResponse.json({ success: true })
}
