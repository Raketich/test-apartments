<script setup lang="ts">
const emit = defineEmits<{
  toggle: []
}>()

const buttonClasses = computed(() => [
  'mobile-filter-button'
])

function toggleFilter() {
  emit('toggle')
}
</script>

<template>
  <Teleport to="body">
    <button :class="buttonClasses" @click="toggleFilter" aria-label="Открыть фильтры">
      <img src="/assets/icons/filters.svg" alt="filter" class="mobile-filter-button__icon"/>
    </button>
  </Teleport>
</template>

<style scoped>
.mobile-filter-button {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #52c41a;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
}

.mobile-filter-button:hover {
  background-color: #389e0d;
  transform: translateY(-2px);
}

.mobile-filter-button__icon {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

@media (min-width: 960px) {
  .mobile-filter-button {
    display: none;
  }
}
</style>