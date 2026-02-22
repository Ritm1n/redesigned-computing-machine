"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { manufacturers, colors } from "@/lib/data"
import type { Car } from "@/lib/types"

interface CarFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Car, "id">) => void
  car?: Car | null
}

const emptyForm = {
  name: "",
  manufacturer: "",
  year: new Date().getFullYear(),
  engineVolume: 2.0,
  price: 0,
  color: "",
  description: "",
  image: "/images/car-1.jpg",
}

export function CarFormDialog({
  open,
  onOpenChange,
  onSubmit,
  car,
}: CarFormDialogProps) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (car) {
      setForm({
        name: car.name,
        manufacturer: car.manufacturer,
        year: car.year,
        engineVolume: car.engineVolume,
        price: car.price,
        color: car.color,
        description: car.description,
        image: car.image,
      })
    } else {
      setForm(emptyForm)
    }
  }, [car, open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {car ? "Редагувати автомобіль" : "Додати автомобіль"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-muted-foreground">
                Назва
              </Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Camry"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer" className="text-muted-foreground">
                Виробник
              </Label>
              <Select
                value={form.manufacturer}
                onValueChange={(v) => setForm({ ...form, manufacturer: v })}
              >
                <SelectTrigger className="w-full bg-secondary border-border">
                  <SelectValue placeholder="Обрати виробника" />
                </SelectTrigger>
                <SelectContent>
                  {manufacturers.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-muted-foreground">
                Рік випуску
              </Label>
              <Input
                id="year"
                type="number"
                required
                min={1980}
                max={2030}
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: Number(e.target.value) })
                }
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="engineVolume" className="text-muted-foreground">
                {"Об'єм (л)"}
              </Label>
              <Input
                id="engineVolume"
                type="number"
                required
                min={0}
                max={10}
                step={0.1}
                value={form.engineVolume}
                onChange={(e) =>
                  setForm({
                    ...form,
                    engineVolume: Number(e.target.value),
                  })
                }
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-muted-foreground">
                Ціна ($)
              </Label>
              <Input
                id="price"
                type="number"
                required
                min={0}
                step={1000}
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                className="bg-secondary border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-muted-foreground">
              Колір
            </Label>
            <Select
              value={form.color}
              onValueChange={(v) => setForm({ ...form, color: v })}
            >
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Обрати колір" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-muted-foreground">
              Опис
            </Label>
            <Textarea
              id="description"
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Опишіть автомобіль..."
              className="bg-secondary border-border resize-none"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Скасувати
            </Button>
            <Button type="submit">
              {car ? "Зберегти зміни" : "Додати"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
