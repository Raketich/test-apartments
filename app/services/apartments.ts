import type { Apartment } from '~/types/apartment'

export async function fetchApartments(): Promise<Apartment[]> {
  try {
    const response = await $fetch<Apartment[]>('/data/apartments.json')
    return response
  } catch (error) {
    console.error('Failed to fetch apartments:', error)
    return []
  }
}