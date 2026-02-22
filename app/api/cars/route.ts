import { NextResponse } from "next/server"
import { getCars, addCar } from "@/lib/car-store"

export async function GET() {
  return NextResponse.json(getCars())
}

export async function POST(request: Request) {
  const body = await request.json()
  const car = addCar(body)
  return NextResponse.json(car, { status: 201 })
}
