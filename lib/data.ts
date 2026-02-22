import type { Car } from "./types"

export const initialCars: Car[] = [
  {
    id: 1,
    name: "Camry",
    manufacturer: "Toyota",
    year: 2024,
    engineVolume: 2.5,
    price: 35000,
    color: "Чорний",
    description:
      "Надійний седан бізнес-класу з ефективним двигуном та сучасними системами безпеки. Ідеальний вибір для щоденних поїздок та далеких подорожей.",
    image: "/images/car-1.jpg",
  },
  {
    id: 2,
    name: "Model 3",
    manufacturer: "Tesla",
    year: 2024,
    engineVolume: 0,
    price: 42000,
    color: "Білий",
    description:
      "Електричний седан з автопілотом та запасом ходу до 580 км. Передові технології та мінімалістичний інтер'єр.",
    image: "/images/car-2.jpg",
  },
  {
    id: 3,
    name: "X5",
    manufacturer: "BMW",
    year: 2023,
    engineVolume: 3.0,
    price: 65000,
    color: "Сірий",
    description:
      "Преміальний кросовер з потужним двигуном та розкішним салоном. Поєднує спортивний характер з комфортом.",
    image: "/images/car-3.jpg",
  },
  {
    id: 4,
    name: "A6",
    manufacturer: "Audi",
    year: 2023,
    engineVolume: 2.0,
    price: 55000,
    color: "Синій",
    description:
      "Елегантний седан з прогресивним дизайном та технологією quattro. Бездоганна якість збірки та комфорт.",
    image: "/images/car-4.jpg",
  },
  {
    id: 5,
    name: "C-Class",
    manufacturer: "Mercedes-Benz",
    year: 2024,
    engineVolume: 2.0,
    price: 48000,
    color: "Червоний",
    description:
      "Витончений седан від Mercedes-Benz з інтелектуальними системами допомоги водію та преміальним оснащенням.",
    image: "/images/car-5.jpg",
  },
  {
    id: 6,
    name: "Civic",
    manufacturer: "Honda",
    year: 2024,
    engineVolume: 1.5,
    price: 28000,
    color: "Білий",
    description:
      "Компактний та динамічний седан з турбованим двигуном. Відмінна паливна ефективність та сучасний дизайн.",
    image: "/images/car-6.jpg",
  },
  {
    id: 7,
    name: "Mustang",
    manufacturer: "Ford",
    year: 2023,
    engineVolume: 5.0,
    price: 55000,
    color: "Червоний",
    description:
      "Легендарний американський маслкар з потужним V8 двигуном. Неповторний звук та агресивний дизайн.",
    image: "/images/car-7.jpg",
  },
  {
    id: 8,
    name: "Tucson",
    manufacturer: "Hyundai",
    year: 2024,
    engineVolume: 2.0,
    price: 32000,
    color: "Зелений",
    description:
      "Сучасний кросовер з футуристичним дизайном та багатим оснащенням. Відмінне співвідношення ціни та якості.",
    image: "/images/car-8.jpg",
  },
  {
    id: 9,
    name: "911 Carrera",
    manufacturer: "Porsche",
    year: 2024,
    engineVolume: 3.0,
    price: 115000,
    color: "Жовтий",
    description:
      "Ікона спортивного автомобілебудування. Боксерний двигун, досконала аеродинаміка та неперевершена керованість.",
    image: "/images/car-9.jpg",
  },
  {
    id: 10,
    name: "RAV4",
    manufacturer: "Toyota",
    year: 2023,
    engineVolume: 2.5,
    price: 35000,
    color: "Сірий",
    description:
      "Популярний кросовер з гібридною силовою установкою. Просторий салон та високий рівень безпеки.",
    image: "/images/car-10.jpg",
  },
  {
    id: 11,
    name: "Golf",
    manufacturer: "Volkswagen",
    year: 2024,
    engineVolume: 1.4,
    price: 30000,
    color: "Чорний",
    description:
      "Еталон серед хетчбеків. Збалансована динаміка, якісний інтер'єр та передові технології.",
    image: "/images/car-11.jpg",
  },
  {
    id: 12,
    name: "Octavia",
    manufacturer: "Skoda",
    year: 2023,
    engineVolume: 1.8,
    price: 27000,
    color: "Синій",
    description:
      "Практичний ліфтбек з великим багажником та комфортною підвіскою. Чеська надійність за розумну ціну.",
    image: "/images/car-12.jpg",
  },
]

export const manufacturers = [
  "Toyota",
  "Tesla",
  "BMW",
  "Audi",
  "Mercedes-Benz",
  "Honda",
  "Ford",
  "Hyundai",
  "Porsche",
  "Volkswagen",
  "Skoda",
]

export const years = [2024, 2023, 2022, 2021, 2020]

export const colors = [
  "Чорний",
  "Білий",
  "Сірий",
  "Синій",
  "Червоний",
  "Зелений",
  "Жовтий",
]

export const engineVolumes = [0, 1.4, 1.5, 1.8, 2.0, 2.5, 3.0, 5.0]
