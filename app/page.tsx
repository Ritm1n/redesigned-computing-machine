"use client"

import { useState, useMemo, useCallback } from "react"
import useSWR, { mutate } from "swr"
import { Header } from "@/components/header"
import { FilterBar, type Filters } from "@/components/filter-bar"
import { CarGrid } from "@/components/car-grid"
import { CarDetailDialog } from "@/components/car-detail-dialog"
import { CarFormDialog } from "@/components/car-form-dialog"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Toaster, toast } from "sonner"
import type { Car } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const defaultFilters: Filters = {
  search: "",
  manufacturer: "all",
  year: "all",
  color: "all",
  engineVolume: "all",
  priceRange: [0, 200000],
}

export default function CatalogPage() {
  const { data: cars = [] } = useSWR<Car[]>("/api/cars", fetcher)

  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const [viewCar, setViewCar] = useState<Car | null>(null)
  const [viewOpen, setViewOpen] = useState(false)

  const [formCar, setFormCar] = useState<Car | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  const [deleteCar, setDeleteCar] = useState<Car | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const searchLower = filters.search.toLowerCase()
      if (
        searchLower &&
        !car.name.toLowerCase().includes(searchLower) &&
        !car.manufacturer.toLowerCase().includes(searchLower)
      )
        return false
      if (
        filters.manufacturer !== "all" &&
        car.manufacturer !== filters.manufacturer
      )
        return false
      if (filters.year !== "all" && car.year !== Number(filters.year))
        return false
      if (filters.color !== "all" && car.color !== filters.color) return false
      if (
        filters.engineVolume !== "all" &&
        car.engineVolume !== Number(filters.engineVolume)
      )
        return false
      if (
        car.price < filters.priceRange[0] ||
        car.price > filters.priceRange[1]
      )
        return false
      return true
    })
  }, [cars, filters])

  const handleAddOpen = useCallback(() => {
    setFormCar(null)
    setFormOpen(true)
  }, [])

  const handleView = useCallback((car: Car) => {
    setViewCar(car)
    setViewOpen(true)
  }, [])

  const handleEdit = useCallback((car: Car) => {
    setFormCar(car)
    setFormOpen(true)
  }, [])

  const handleDeleteRequest = useCallback((car: Car) => {
    setDeleteCar(car)
    setDeleteOpen(true)
  }, [])

  const handleFormSubmit = useCallback(
    async (data: Omit<Car, "id">) => {
      if (formCar) {
        await fetch(`/api/cars/${formCar.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        toast.success(
          `${data.manufacturer} ${data.name} оновлено`
        )
      } else {
        await fetch("/api/cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        toast.success(
          `${data.manufacturer} ${data.name} додано до каталогу`
        )
      }
      mutate("/api/cars")
    },
    [formCar]
  )

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteCar) return
    await fetch(`/api/cars/${deleteCar.id}`, { method: "DELETE" })
    toast.success(
      `${deleteCar.manufacturer} ${deleteCar.name} видалено`
    )
    mutate("/api/cars")
    setDeleteOpen(false)
  }, [deleteCar])

  return (
    <div className="min-h-screen bg-background">
      <Header onAddCar={handleAddOpen} totalCars={cars.length} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            Каталог автомобілів
          </h2>
          <p className="text-muted-foreground">
            Знайдіть ідеальний автомобіль серед нашої колекції
          </p>
        </div>

        <div className="mb-8">
          <FilterBar filters={filters} onFiltersChange={setFilters} />
        </div>

        {filteredCars.length !== cars.length && (
          <p className="mb-4 text-sm text-muted-foreground">
            Показано {filteredCars.length} з {cars.length} автомобілів
          </p>
        )}

        <CarGrid
          cars={filteredCars}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      </main>

      <CarDetailDialog
        car={viewCar}
        open={viewOpen}
        onOpenChange={setViewOpen}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
      />

      <CarFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        car={formCar}
      />

      <DeleteConfirmDialog
        car={deleteCar}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          },
        }}
      />
    </div>
  )
}
