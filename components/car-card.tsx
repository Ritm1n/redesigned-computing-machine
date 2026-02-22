"use client"

import Image from "next/image"
import { Calendar, Fuel, Palette, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Car } from "@/lib/types"

interface CarCardProps {
  car: Car
  priority?: boolean
  onView: (car: Car) => void
  onEdit: (car: Car) => void
  onDelete: (car: Car) => void
}

export function CarCard({ car, priority = false, onView, onEdit, onDelete }: CarCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <button
        onClick={() => onView(car)}
        className="relative aspect-[16/10] overflow-hidden"
      >
        <Image
          src={car.image}
          alt={`${car.manufacturer} ${car.name}`}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
          {car.year}
        </Badge>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <button onClick={() => onView(car)} className="text-left">
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            {car.manufacturer} {car.name}
          </h3>
        </button>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {car.year}
          </span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1">
            <Fuel className="size-3" />
            {car.engineVolume === 0 ? "Електро" : `${car.engineVolume} л`}
          </span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1">
            <Palette className="size-3" />
            {car.color}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {car.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xl font-bold text-primary">
            ${car.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(car)
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <Pencil className="size-4" />
              <span className="sr-only">Редагувати</span>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(car)
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Видалити</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
