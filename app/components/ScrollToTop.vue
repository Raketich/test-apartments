<template>
  <Teleport to="body">
    <button
      :class="buttonClasses"
      @click="scrollToTop"
      aria-label="Прокрутить наверх"
    >
    <img 
          src="/assets/icons/arrow-up.svg" 
          alt="scroll top"
        />
    </button>
  </Teleport>
</template>

<script setup lang="ts">
const isVisible = ref(false)

const buttonClasses = computed(() => [
  'scroll-top',
  {
    'scroll-top--hidden': !isVisible.value
  }
])

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function handleScroll() {
  isVisible.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>