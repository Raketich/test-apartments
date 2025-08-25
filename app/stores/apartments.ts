import { defineStore } from 'pinia'
import type { Apartment, ApartmentFilters, SortOption } from '~/types/apartment'
import { fetchApartments } from '~/services/apartments'

export const useApartmentsStore = defineStore('apartments', () => {
  const apartments = ref<Apartment[]>([])
  const filteredApartments = ref<Apartment[]>([])
  const displayedApartments = ref<Apartment[]>([])
  const loading = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = 20

  const filters = ref<ApartmentFilters>({
    rooms: [],
    priceRange: [5500000, 18900000],
    areaRange: [33, 123]
  })

  const sort = ref<SortOption>({
    field: 'price',
    direction: 'asc'
  })

  const hasMoreItems = computed(() => {
    return displayedApartments.value.length < filteredApartments.value.length
  })

  const totalItems = computed(() => filteredApartments.value.length)

  async function load() {
    loading.value = true
    try {
      apartments.value = await fetchApartments()
      applyFilters()
    } catch (error) {
      console.error('Failed to load apartments:', error)
    } finally {
      loading.value = false
    }
  }

  let isProcessing = false
  
  function applyFilters() {
    if (isProcessing) return
    isProcessing = true
    
    try {
      let filtered = [...apartments.value]

      if (filters.value.rooms.length > 0) {
        filtered = filtered.filter(apt => filters.value.rooms.includes(apt.rooms))
      }

      filtered = filtered.filter(apt => 
        apt.price >= filters.value.priceRange[0] && 
        apt.price <= filters.value.priceRange[1]
      )

      filtered = filtered.filter(apt => 
        apt.area >= filters.value.areaRange[0] && 
        apt.area <= filters.value.areaRange[1]
      )

      filtered.sort((a, b) => {
        const aValue = a[sort.value.field]
        const bValue = b[sort.value.field]
        const multiplier = sort.value.direction === 'asc' ? 1 : -1
        return (aValue - bValue) * multiplier
      })

      filteredApartments.value = filtered
      currentPage.value = 1
      updateDisplayedApartments()
    } finally {
      isProcessing = false
    }
  }

  function updateDisplayedApartments() {
    const endIndex = currentPage.value * itemsPerPage
    displayedApartments.value = filteredApartments.value.slice(0, endIndex)
  }

  function setSort(newSort: SortOption) {
    sort.value = { ...newSort }
    saveToLocalStorage()
    applyFilters()
  }

  function loadMore() {
    if (hasMoreItems.value) {
      currentPage.value++
      updateDisplayedApartments()
    }
  }

  function resetFilters() {
    filters.value = {
      rooms: [],
      priceRange: [5500000, 18900000],
      areaRange: [33, 123]
    }
    saveToLocalStorage()
    applyFilters()
  }

  function updateFilters(newFilters: Partial<ApartmentFilters>) {
    filters.value = { ...filters.value, ...newFilters }
    saveToLocalStorage()
    applyFilters()
  }

  function loadFromLocalStorage() {
    if (import.meta.client) {
      const savedFilters = localStorage.getItem('apartments-filters')
      const savedSort = localStorage.getItem('apartments-sort')
      
      if (savedFilters) {
        filters.value = JSON.parse(savedFilters)
      }
      
      if (savedSort) {
        sort.value = JSON.parse(savedSort)
      }
    }
  }

  function saveToLocalStorage() {
    if (import.meta.client) {
      localStorage.setItem('apartments-filters', JSON.stringify(filters.value))
      localStorage.setItem('apartments-sort', JSON.stringify(sort.value))
    }
  }

  return {
    apartments: readonly(apartments),
    filteredApartments: readonly(filteredApartments),
    displayedApartments: readonly(displayedApartments),
    loading: readonly(loading),
    filters,
    sort,
    hasMoreItems,
    totalItems,
    load,
    applyFilters,
    setSort,
    loadMore,
    resetFilters,
    updateFilters,
    loadFromLocalStorage
  }
})