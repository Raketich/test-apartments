<script setup lang="ts">
const apartmentsStore = useApartmentsStore()

const displayedApartments = computed(() => apartmentsStore.displayedApartments)
const hasMoreItems = computed(() => apartmentsStore.hasMoreItems)
const loading = computed(() => apartmentsStore.loading)

const isMobileFilterVisible = ref(false)

function loadMore() {
  apartmentsStore.loadMore()
}

function toggleMobileFilter() {
  isMobileFilterVisible.value = !isMobileFilterVisible.value
}

function closeMobileFilter() {
  isMobileFilterVisible.value = false
}

onMounted(async () => {
  apartmentsStore.loadFromLocalStorage()
  await apartmentsStore.load()
})

useHead({
  title: 'Квартиры - Каталог недвижимости',
  meta: [
    { name: 'description', content: 'Каталог квартир с фильтрацией по количеству комнат, цене и площади' }
  ]
})
</script>

<template>
  <div class="page">
    <div class="container">
      <main class="apartments">
        <h1 class="title">Квартиры</h1>
        <section class="apartments_section">
          <SortControls class="sort-controls" />
          <div v-if="!loading && displayedApartments.length > 0" class="apartments__list">
            <ApartmentItem v-for="apartment in displayedApartments" :key="apartment.id" :apartment="apartment" />
          </div>
          <div v-else-if="loading" class="apartments__loading">
            <div class="loading-spinner">Загрузка...</div>
          </div>
          <div v-else-if="!loading && displayedApartments.length === 0" class="apartments__empty">
            <p>По заданным параметрам квартиры не найдены</p>
          </div>
        </section>
        <section>
          <button v-if="hasMoreItems && !loading" @click="loadMore" class="button__load-more">
            Загрузить еще
          </button>
        </section>
      </main>
      <aside class="sidebar">
        <FilterCard />
      </aside>
    </div>
    <MobileFilterButton @toggle="toggleMobileFilter" />
    <FilterCard :is-mobile-overlay="true" :is-visible="isMobileFilterVisible" @close="closeMobileFilter" />
    <ScrollToTop />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  justify-content: center;
}

.container {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 80px;
  align-items: start;
  max-width: 1440px;
  padding: 0 20px;
}

.apartments {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.sort-controls {
  position: sticky;
  top: 2px;
}

.apartments__list {
  display: flex;
  flex-direction: column;
}

.apartments__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-spinner {
  font-size: 18px;
  color: #666;
}

.apartments__empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
}

.apartments__empty p {
  font-size: 18px;
  color: #666;
}

.sidebar {
  position: sticky;
  top: 2px;
  height: fit-content;
}

.button__load-more {
  background: none;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 25px;
  padding: 8px 24px;
  size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.button__load-more:hover {
  background-color: #e7e7e7;
  cursor: pointer;
}

@media (max-width: 1439px) {
  .container {
    grid-template-columns: 1fr 280px;
    gap: 60px;
  }

  .apartments__list {
    gap: 4px;
    min-width: 500px;
  }
}

@media (max-width: 959px) {
  .page {
    padding: 20px 0;
  }

  .container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .apartments {
    gap: 32px;
  }

  .apartments__list {
    gap: 12px;
  }

  .sidebar {
    display: none;
  }
}
</style>