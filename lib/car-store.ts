import type { Car } from "./types"
import { initialCars } from "./data"

let cars: Car[] = [...initialCars]
let nextId = initialCars.length + 1

export function getCars(): Car[] {
  return [...cars]
}

export function getCarById(id: number): Car | undefined {
  return cars.find((car) => car.id === id)
}

export function addCar(car: Omit<Car, "id">): Car {
  const newCar: Car = { ...car, id: nextId++ }
  cars = [...cars, newCar]
  return newCar
}

export function updateCar(id: number, data: Partial<Car>): Car | undefined {
  const index = cars.findIndex((c) => c.id === id)
  if (index === -1) return undefined
  cars[index] = { ...cars[index], ...data }
  cars = [...cars]
  return cars[index]
}

export function deleteCar(id: number): boolean {
  const len = cars.length
  cars = cars.filter((c) => c.id !== id)
  return cars.length < len
}
