<script setup lang="ts">
interface Props {
  isMobileOverlay?: boolean
  isVisible?: boolean
}

interface Emits {
  close: []
}

const props = withDefaults(defineProps<Props>(), {
  isMobileOverlay: false,
  isVisible: false
})

const emit = defineEmits<Emits>()

const apartmentsStore = useApartmentsStore()

const availableRooms = [1, 2, 3, 4]
const minPrice = 5500000
const maxPrice = 18900000
const minArea = 33
const maxArea = 123

const selectedRooms = computed(() => apartmentsStore.filters.rooms)
const priceRange = ref<[number, number]>([...apartmentsStore.filters.priceRange])
const areaRange = ref<[number, number]>([...apartmentsStore.filters.areaRange])
const loading = computed(() => apartmentsStore.loading)

function toggleRoom(roomCount: number) {
  const currentRooms = [...selectedRooms.value]
  const index = currentRooms.indexOf(roomCount)
  
  if (index > -1) {
    currentRooms.splice(index, 1)
  } else {
    currentRooms.push(roomCount)
  }
  
  apartmentsStore.updateFilters({ rooms: currentRooms })
}

function updatePriceRange(newRange: [number, number]) {
  // Debounce the update to prevent too many calls
  if (priceTimeout.value) {
    clearTimeout(priceTimeout.value)
  }
  priceTimeout.value = setTimeout(() => {
    apartmentsStore.updateFilters({ priceRange: [...newRange] })
  }, 300)
}

function updateAreaRange(newRange: [number, number]) {
  // Debounce the update to prevent too many calls
  if (areaTimeout.value) {
    clearTimeout(areaTimeout.value)
  }
  areaTimeout.value = setTimeout(() => {
    apartmentsStore.updateFilters({ areaRange: [...newRange] })
  }, 300)
}

// Add timeout refs for debouncing
const priceTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const areaTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

function resetFilters() {
  apartmentsStore.resetFilters()
  priceRange.value = [minPrice, maxPrice]
  areaRange.value = [minArea, maxArea]
}

function closeMobileFilter() {
  if (props.isMobileOverlay) {
    emit('close')
  }
}

// Handle escape key
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isMobileOverlay && props.isVisible) {
    closeMobileFilter()
  }
}

// Prevent body scroll when mobile overlay is open
watch(() => props.isVisible, (newValue) => {
  if (props.isMobileOverlay) {
    if (newValue) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeydown)
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (props.isMobileOverlay) {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeydown)
  }
})

function formatPrice(value: number): string {
  return (value / 1000000).toFixed(1).replace('.0', '') + ' млн'
}

// Watch for store changes to update local ranges
watch(() => apartmentsStore.filters.priceRange, (newRange) => {
  priceRange.value = [...newRange]
})

watch(() => apartmentsStore.filters.areaRange, (newRange) => {
  areaRange.value = [...newRange]
})

// Cleanup timeouts on unmount
onUnmounted(() => {
  if (priceTimeout.value) {
    clearTimeout(priceTimeout.value)
  }
  if (areaTimeout.value) {
    clearTimeout(areaTimeout.value)
  }
})
</script>

<template>
  <Teleport v-if="isMobileOverlay" to="body">
    <div 
      v-show="isVisible" 
      class="mobile-filter-overlay"
      @click="closeMobileFilter"
    >
      <div 
        class="mobile-filter-content"
        @click.stop
      >
        <div class="mobile-filter-header">
          <h2>Фильтры</h2>
          <button 
            class="mobile-filter-close"
            @click="closeMobileFilter"
          >
            ✕
          </button>
        </div>
        <div class="filter-card__content filter-card__content--mobile">
          <div class="filter-section">
            <div class="filter-section__badges">
              <UiBadgeToggle
                v-for="roomCount in availableRooms"
                :key="roomCount"
                :active="selectedRooms.includes(roomCount)"
                :disabled="loading"
                @toggle="toggleRoom(roomCount)"
              >
                {{ roomCount }}к
              </UiBadgeToggle>
            </div>
          </div>
          <div class="filter-section">
            <h3 class="filter-section__title text_label">Стоимость квартиры, ₽</h3>
            <UiRange
              v-model="priceRange"
              :min="minPrice"
              :max="maxPrice"
              :step="50000"
              :formatter="formatPrice"
              @update:model-value="updatePriceRange"
            />
          </div>
          <div class="filter-section">
            <h3 class="filter-section__title text_label">Площадь, м²</h3>
            <UiRange
              v-model="areaRange"
              :min="minArea"
              :max="maxArea"
              :step="1"
              @update:model-value="updateAreaRange"
            />
          </div>
          <div class="filter-section">
            <button
              class="filter-card__reset text_label"
              :disabled="loading"
              @click="resetFilters"
            >
              Сбросить параметры ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
  
  <div v-if="!isMobileOverlay" class="filter-card__content">
    <div class="filter-section">
      <div class="filter-section__badges">
        <UiBadgeToggle
          v-for="roomCount in availableRooms"
          :key="roomCount"
          :active="selectedRooms.includes(roomCount)"
          :disabled="loading"
          @toggle="toggleRoom(roomCount)"
        >
          {{ roomCount }}к
        </UiBadgeToggle>
      </div>
    </div>
    <div class="filter-section">
      <h3 class="filter-section__title text_label">Стоимость квартиры, ₽</h3>
      <UiRange
        v-model="priceRange"
        :min="minPrice"
        :max="maxPrice"
        :step="50000"
        :formatter="formatPrice"
        @update:model-value="updatePriceRange"
      />
    </div>
    <div class="filter-section">
      <h3 class="filter-section__title text_label">Площадь, м²</h3>
      <UiRange
        v-model="areaRange"
        :min="minArea"
        :max="maxArea"
        :step="1"
        @update:model-value="updateAreaRange"
      />
    </div>
    <div class="filter-section">
      <button
        class="filter-card__reset text_label"
        :disabled="loading"
        @click="resetFilters"
      >
        Сбросить параметры ✕
      </button>
    </div>
  </div>
</template>

<style scoped>

.filter-card__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: linear-gradient(45deg, rgba(174, 228, 178, 0.3), rgba(149, 208, 161, 0.3));
  border-radius: 10px;
  padding: 40px;
  width: 400px;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-section__title {
  font-size: 16px;
  font-weight: 500;
  color: #666;
}

.filter-section__badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-card__reset {
  background: none;
  align-self: start;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.filter-card__reset:hover:not(:disabled) {
  color: rgba(62, 181, 124, 1);
}

.filter-card__reset:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Mobile overlay styles */
.mobile-filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: flex-end;
}

.mobile-filter-content {
  width: 100%;
  background: white;
  border-radius: 20px 20px 0 0;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;
}

.mobile-filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-filter-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.mobile-filter-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-card__content--mobile {
  padding: 24px;
  background: white;
  border-radius: 0;
  width: 100%;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 1439px) {
  .filter-card__content {
    padding: 20px;
    max-width: 318px;
  }

  .text_label {
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: #666;
  }

  .text_value {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
}

@media (max-width: 959px) {
  .filter-card__content:not(.filter-card__content--mobile) {
    display: none;
  }
}
</style>