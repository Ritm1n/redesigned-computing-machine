"use client"

import { Car, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAddCar: () => void
  totalCars: number
}

export function Header({ onAddCar, totalCars }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg bg-primary p-2">
            <Car className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              AutoCatalog
            </h1>
            <p className="text-xs text-muted-foreground">
              {totalCars}{" "}
              {totalCars === 1
                ? "автомобіль"
                : totalCars < 5
                  ? "автомобілі"
                  : "автомобілів"}{" "}
              у каталозі
            </p>
          </div>
        </div>
        <Button onClick={onAddCar} size="default">
          <Plus className="size-4" />
          <span className="hidden sm:inline">Додати авто</span>
        </Button>
      </div>
    </header>
  )
}
