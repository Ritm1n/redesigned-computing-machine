"use client"

import { CarCard } from "@/components/car-card"
import { SearchX } from "lucide-react"
import type { Car } from "@/lib/types"

interface CarGridProps {
  cars: Car[]
  onView: (car: Car) => void
  onEdit: (car: Car) => void
  onDelete: (car: Car) => void
}

export function CarGrid({ cars, onView, onEdit, onDelete }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex items-center justify-center rounded-full bg-secondary p-4">
          <SearchX className="size-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Нічого не знайдено
          </h3>
          <p className="text-sm text-muted-foreground">
            Спробуйте змінити параметри фільтрів
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car, index) => (
        <CarCard
          key={car.id}
          car={car}
          priority={index < 3}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
