<script setup lang="ts">
import type { ProductItem } from '../types'

defineProps<{ products: ProductItem[] }>()
</script>

<template>
  <div class="products">
    <div class="products__head">
      <h2 class="products__title">直播间产品</h2>
      <span class="products__count">共 {{ products.length }} 件 · {{ products.filter(p => p.hasViolation).length }} 件关联违规</span>
    </div>

    <ul class="products__list">
      <li
        v-for="p in products"
        :key="p.id"
        class="item"
        :class="{ 'item--violation': p.hasViolation, 'item--off': !p.onShelf }"
      >
        <div class="item__main">
          <p class="item__name">{{ p.name }}</p>
          <p class="item__price">¥{{ p.price }}</p>
        </div>
        <div class="item__meta">
          <span class="item__badge" v-if="p.hasViolation">关联违规</span>
          <span class="item__badge item__badge--off" v-else>正常</span>
          <span class="item__shelf">{{ p.onShelf ? '上架中' : '已下架' }}</span>
        </div>
        <a class="item__link" :href="p.link" target="_blank" rel="noopener">查看商品 →</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.products {
  background: #11192a;
  border: 1px solid rgba(56, 139, 253, 0.18);
  border-radius: 10px;
  padding: 16px;
}
.products__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
}
.products__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.products__count {
  font-size: 12px;
  color: #8b98a8;
}
.products__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.item {
  padding: 10px 12px;
  border-radius: 8px;
  background: #0c1424;
  border: 1px solid rgba(255,255,255,0.04);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.item--violation {
  border-color: rgba(255, 107, 107, 0.35);
  background: rgba(255, 107, 107, 0.06);
}
.item--off { opacity: 0.6; }
.item__main {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.item__name {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
}
.item__price {
  margin: 0;
  font-size: 13px;
  color: #ffb454;
  font-weight: 600;
}
.item__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.item__badge {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 107, 107, 0.15);
  color: #ff8a8a;
}
.item__badge--off {
  background: rgba(77, 208, 163, 0.12);
  color: #4dd0a3;
}
.item__shelf {
  font-size: 11px;
  color: #6b7a90;
}
.item__link {
  font-size: 11px;
  color: #5a8bff;
  text-decoration: none;
}
.item__link:hover { text-decoration: underline; }
</style>
