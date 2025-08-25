<script setup lang="ts">
import type { SortOption } from '~/types/apartment'

const apartmentsStore = useApartmentsStore()
const isSticky = ref(false)

const sortOptions = [
  { field: 'area' as const, label: 'S, м²' },
  { field: 'floor' as const, label: 'Этаж' },
  { field: 'price' as const, label: 'Цена, ₽' }
]

const currentSort = computed(() => apartmentsStore.sort)

function toggleSort(field: SortOption['field']) {
  const newDirection = currentSort.value.field === field && currentSort.value.direction === 'asc'
    ? 'desc'
    : 'asc'

  apartmentsStore.setSort({ field, direction: newDirection })
}

function getSortButtonClass(field: SortOption['field']) {
  return [
    'sort-controls__button',
    {
      'sort-controls__button--active': currentSort.value.field === field
    }
  ]
}

function getSortArrowClass(field: SortOption['field'], direction: 'asc' | 'desc') {
  return [
    {
      'sort-controls__arrow--active': currentSort.value.field === field && currentSort.value.direction === direction
    }
  ]
}

function handleScroll() {
  const element = document.querySelector('.sort-controls')
  if (element) {
    const rect = element.getBoundingClientRect()
    isSticky.value = rect.top <= 20
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div 
    class="sort-controls"
    :class="{ 'sort-controls--sticky': isSticky }"
  >
    <div class="sort-controls__header">Планировка</div>
    <div class="sort-controls__header">Квартира</div>
    <button v-for="option in sortOptions" :key="option.field" :class="getSortButtonClass(option.field)"
      @click="toggleSort(option.field)">
      <span>{{ option.label }}</span>
      <div class="sort-controls__arrows">
        <img src="/assets/icons/sort-up.svg" alt="Sort ascending" :class="getSortArrowClass(option.field, 'asc')"
          class="sort-controls__arrow sort-controls__arrow--up" />
        <img src="/assets/icons/sort-down.svg" alt="Sort descending" :class="getSortArrowClass(option.field, 'desc')"
          class="sort-controls__arrow sort-controls__arrow--down" />
      </div>
    </button>
  </div>
</template>

<style scoped>
.sort-controls {
  display: grid;
  grid-template-columns: 80px 280px 120px 120px 120px;
  gap: 20px;
  margin-bottom: 24px;
  padding: 16px 0;
  transition: all 0.3s ease;
}

.sort-controls--sticky {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 8px 16px;
  margin: -16px -20px 24px -20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sort-controls__header {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  padding: 8px 0;
}

.sort-controls__button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s ease;
  position: relative;
}

.sort-controls__button:hover:not(.sort-controls__button--active) {
  color: #666;
}

.sort-controls__button--active {
  color: #52c41a;
  font-weight: 500;
}

.sort-controls__button--active:hover {
  color: #52c41a;
}

.sort-controls__arrows {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: 8px;
}

.sort-controls__arrow {
  width: 12px;
  height: 8px;
  opacity: 0.3;
  transition: all 0.2s ease;
}

.sort-controls__arrow--active {
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(64%) sepia(88%) saturate(1425%) hue-rotate(75deg) brightness(97%) contrast(89%);
}

@media (max-width: 1439px) {
  .sort-controls {
    display: flex;
    grid-template-columns: none;
    gap: 24px;
    padding: 16px 0;
  }

  .sort-controls--sticky {
    margin: -16px -20px 20px -20px;
    padding: 8px 16px;
  }

  .sort-controls__header {
    display: none;
  }

  .sort-controls__button {
    justify-content: flex-start;
  }
}

@media (max-width: 959px) {
  .sort-controls {
    align-items: center;
    justify-content: center;
    padding: 12px 0;
  }

  .sort-controls--sticky {
    padding: 12px 20px;
  }

  .sort-controls__button {
    font-size: 14px;
  }
}
</style>