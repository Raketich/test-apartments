<script setup lang="ts">
interface Props {
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false
})

defineEmits<{
  toggle: []
}>()

const badgeClasses = computed(() => [
  'badge-toggle',
  {
    'badge-toggle--active': props.active,
    'badge-toggle--disabled': props.disabled
  }
])
</script>

<template>
  <button :class="badgeClasses" :aria-pressed="active" @click="$emit('toggle')">
    <slot />
  </button>
</template>

<style scoped>
.badge-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
  color: #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.badge-toggle:hover:not(.badge-toggle--disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.badge-toggle--active {
  background-color: rgba(62, 181, 124, 1);
  color: white;
}

.badge-toggle--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.badge-toggle--disabled:hover {
  transform: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>