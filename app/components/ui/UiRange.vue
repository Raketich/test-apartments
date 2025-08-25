<script setup lang="ts">
interface Props {
  modelValue: [number, number]
  min: number
  max: number
  step?: number
  formatter?: (value: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  formatter: (value: number) => value.toString()
})

const emit = defineEmits<{
  'update:modelValue': [value: [number, number]]
}>()

const minValue = ref(props.modelValue[0])
const maxValue = ref(props.modelValue[1])

const formatValue = (value: number) => {
  if (props.formatter) {
    return props.formatter(value)
  }
  return value.toLocaleString()
}

const fillStyle = computed(() => {
  const minPercent = ((minValue.value - props.min) / (props.max - props.min)) * 100
  const maxPercent = ((maxValue.value - props.min) / (props.max - props.min)) * 100
  
  return {
    left: `${minPercent}%`,
    width: `${maxPercent - minPercent}%`
  }
})

function updateValues() {
  // Ensure min is always less than max
  if (minValue.value > maxValue.value) {
    const temp = minValue.value
    minValue.value = maxValue.value
    maxValue.value = temp
  }
  
  emit('update:modelValue', [minValue.value, maxValue.value])
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  minValue.value = newValue[0]
  maxValue.value = newValue[1]
}, { immediate: true })
</script>

<template>
  <div class="range">
    <div class="range__labels">
      <span class="range__label">от {{ formatValue(modelValue[0]) }}</span>
      <span class="range__label">до {{ formatValue(modelValue[1]) }}</span>
    </div>
    <div class="range__slider" ref="sliderRef">
      <div class="range__track">
        <div 
          class="range__fill" 
          :style="fillStyle"
        ></div>
      </div>
      <input
        v-model.number="minValue"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="range__input range__input--min"
        @input="updateValues"
      />
      <input
        v-model.number="maxValue"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="range__input range__input--max"
        @input="updateValues"
      />
    </div>
  </div>
</template>

<style scoped>
.range {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.range__labels {
  display: flex;
  justify-content: space-between;
}

.range__label {
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

.range__slider {
  position: relative;
  height: 20px;
}

.range__track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #cbcbcb;
  border-radius: 2px;
  transform: translateY(-50%);
}

.range__fill {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: rgba(62, 181, 124, 1);
}

.range__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: transparent;
  pointer-events: none;
  appearance: none;
  -webkit-appearance: none;
}

.range__input::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgba(62, 181, 124, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  pointer-events: all;
}

.range__input::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgba(62, 181, 124, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  pointer-events: all;
  border: none;
}

.range__input:focus {
  outline: none;
}
</style>