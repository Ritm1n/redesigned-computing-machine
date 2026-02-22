"use client"

import Image from "next/image"
import {
  Calendar,
  Fuel,
  Palette,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Car } from "@/lib/types"

interface CarDetailDialogProps {
  car: Car | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (car: Car) => void
  onDelete: (car: Car) => void
}

export function CarDetailDialog({
  car,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: CarDetailDialogProps) {
  if (!car) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 bg-card border-border">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={car.image}
            alt={`${car.manufacturer} ${car.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0 text-sm px-3 py-1">
            {car.year}
          </Badge>
        </div>

        <div className="space-y-5 p-6 pt-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {car.manufacturer} {car.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                Рік випуску
              </span>
              <span className="text-sm font-semibold text-foreground">
                {car.year}
              </span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Fuel className="size-3" />
                {"Об'єм"}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {car.engineVolume === 0
                  ? "Електро"
                  : `${car.engineVolume} л`}
              </span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Palette className="size-3" />
                Колір
              </span>
              <span className="text-sm font-semibold text-foreground">
                {car.color}
              </span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <DollarSign className="size-3" />
                Ціна
              </span>
              <span className="text-sm font-bold text-primary">
                ${car.price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Опис
            </h4>
            <p className="text-sm text-foreground leading-relaxed">
              {car.description}
            </p>
          </div>

          <div className="flex items-center gap-2 border-t border-border pt-4">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                onEdit(car)
              }}
              className="flex-1 gap-2"
            >
              <Pencil className="size-4" />
              Редагувати
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onOpenChange(false)
                onDelete(car)
              }}
              className="flex-1 gap-2"
            >
              <Trash2 className="size-4" />
              Видалити
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
