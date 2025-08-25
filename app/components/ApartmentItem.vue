<template>
    <article class="apartment-item__layout">
      <div class="apartment-item__image">
        <NuxtImg
          :src="apartment.image"
          :alt="`План ${apartment.name}`"
          loading="lazy"
          class="apartment-item__img"
        />
      </div>
      <div class="apartment-item__info">
        <!-- Name -->
        <div class="apartment-item__content">
          <h3 class="apartment-item__title">{{ apartment.name }}</h3>
        </div>
        <div class="apartment-item__details">
          <div class="apartment-item__detail">
            <span class="apartment-item__value">{{ apartment.area }}</span>
          </div>
          <div class="apartment-item__detail">
            <span class="apartment-item__value">{{ apartment.floor }}</span>
            <span class="apartment-item__label">из {{ apartment.totalFloors }}</span>
          </div>
          <div class="apartment-item__detail apartment-item__detail--price">
            <span class="apartment-item__price">{{ formatPrice(apartment.price) }}</span>
          </div>
        </div>
      </div>
    </article>
  
</template>

<script setup lang="ts">
import type { Apartment } from '~/types/apartment'

interface Props {
  apartment: Apartment
}

defineProps<Props>()

function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU')
}
</script>

<style scoped>
.apartment-item__layout {
  display: grid;
  grid-template-columns: 80px 280px 120px 120px 120px;
  gap: 20px;
  align-items: start;
  background: white;
  border-bottom: 1px solid  rgba(0, 0, 0, 0.1);
  padding: 16px 0 24px 0;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.apartment-item__layout:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.apartment-item__info {
  display: contents;
}

.apartment-item__details {
  display: contents;
}

.apartment-item__image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.apartment-item__img {
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}

.apartment-item__content {
  min-width: 0;
}

.apartment-item__title, 
.apartment-item__value,
.apartment-item__price {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color:rgba(11, 23, 57, 1);
}

.apartment-item__detail {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 14px;
  color: #666;
}

.apartment-item__detail--price {
  margin-left: 0;
}

.apartment-item__unit {
  font-size: 12px;
  color: #999;
}

.apartment-item__label {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #999;
}

@media (min-width: 960px) and (max-width:1439px) {
  .apartment-item__layout {
    display: flex;
    gap: 20px;
    padding: 20px;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .apartment-item__title, 
  .apartment-item__value,
  .apartment-item__price {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color:rgba(11, 23, 57, 1);
  }
  
  .apartment-item__image {
    order: 2;
    flex-shrink: 0;
  }
  
  .apartment-item__info {
    order: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .apartment-item__content {
    margin: 0;
  }
  
  .apartment-item__details {
    display: flex;
    gap: 24px;
    align-items: center;
  }
}

@media (max-width: 959px) {
  .apartment-item__layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    align-items: center;
  }
  
  .apartment-item__image {
    align-self: center;
    order: -1;
  }
  
  .apartment-item__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  .apartment-item__details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .apartment-item__detail--price {
    order: -1;
    width: 100%;
    margin-left: 0;
  }

  .apartment-item__title, 
  .apartment-item__value,
  .apartment-item__price {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color:rgba(11, 23, 57, 1);
  }
}
</style>