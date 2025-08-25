export interface Apartment {
  id: string
  name: string
  rooms: number
  area: number
  floor: number
  totalFloors: number
  price: number
  image: string
}

export interface ApartmentFilters {
  rooms: number[]
  priceRange: [number, number]
  areaRange: [number, number]
}

export interface SortOption {
  field: 'area' | 'floor' | 'price'
  direction: 'asc' | 'desc'
}