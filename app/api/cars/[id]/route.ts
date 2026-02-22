import { NextResponse } from "next/server"
import { getCarById, updateCar, deleteCar } from "@/lib/car-store"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const car = getCarById(Number(id))
  if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(car)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const car = updateCar(Number(id), body)
  if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(car)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const ok = deleteCar(Number(id))
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
