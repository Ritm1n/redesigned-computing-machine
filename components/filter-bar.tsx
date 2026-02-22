"use client"

import { Search, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { manufacturers, years, colors, engineVolumes } from "@/lib/data"
import { useState } from "react"

export interface Filters {
  search: string
  manufacturer: string
  year: string
  color: string
  engineVolume: string
  priceRange: [number, number]
}

interface FilterBarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)

  const hasActiveFilters =
    filters.manufacturer !== "all" ||
    filters.year !== "all" ||
    filters.color !== "all" ||
    filters.engineVolume !== "all" ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 200000

  function resetFilters() {
    onFiltersChange({
      search: "",
      manufacturer: "all",
      year: "all",
      color: "all",
      engineVolume: "all",
      priceRange: [0, 200000],
    })
  }

  function update(partial: Partial<Filters>) {
    onFiltersChange({ ...filters, ...partial })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Пошук за назвою або виробником..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">Фільтри</span>
          {hasActiveFilters && (
            <span className="flex size-2 rounded-full bg-primary" />
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={resetFilters} size="sm">
            <X className="size-4" />
            <span className="hidden sm:inline">Скинути</span>
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Виробник
            </label>
            <Select
              value={filters.manufacturer}
              onValueChange={(v) => update({ manufacturer: v })}
            >
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Всі виробники" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі виробники</SelectItem>
                {manufacturers.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Рік випуску
            </label>
            <Select
              value={filters.year}
              onValueChange={(v) => update({ year: v })}
            >
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Всі роки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі роки</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Колір
            </label>
            <Select
              value={filters.color}
              onValueChange={(v) => update({ color: v })}
            >
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Всі кольори" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі кольори</SelectItem>
                {colors.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {"Об'єм двигуна"}
            </label>
            <Select
              value={filters.engineVolume}
              onValueChange={(v) => update({ engineVolume: v })}
            >
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Всі об'єми" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{"Всі об'єми"}</SelectItem>
                {engineVolumes.map((v) => (
                  <SelectItem key={v} value={String(v)}>
                    {v === 0 ? "Електро" : `${v} л`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ціна: ${filters.priceRange[0].toLocaleString()} - $
              {filters.priceRange[1].toLocaleString()}
            </label>
            <div className="px-1 pt-2">
              <Slider
                min={0}
                max={200000}
                step={5000}
                value={filters.priceRange}
                onValueChange={(v) =>
                  update({ priceRange: v as [number, number] })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
