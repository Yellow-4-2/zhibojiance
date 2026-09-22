<script setup lang="ts">
import type { KeyProduct, RiskLevel } from '../types'

defineProps<{ products: KeyProduct[] }>()

const riskMeta: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  high:   { label: '高风险', color: '#ff7a7a', bg: 'rgba(255, 107, 107, 0.12)' },
  medium: { label: '中风险', color: '#ffb454', bg: 'rgba(255, 180, 84, 0.12)' },
  low:    { label: '低风险', color: '#4dd0a3', bg: 'rgba(77, 208, 163, 0.12)' }
}
</script>

<template>
  <div class="card">
    <div class="card__head">
      <h2 class="card__title">重点监测产品</h2>
      <span class="card__sub">高频违规风险商品 Top {{ products.length }}</span>
    </div>
    <ul class="list">
      <li v-for="p in products" :key="p.id" class="row">
        <div class="row__rank" :class="{ top: products.indexOf(p) < 3 }">
          {{ products.indexOf(p) + 1 }}
        </div>
        <div class="row__main">
          <div class="row__top">
            <span class="row__name">{{ p.name }}</span>
            <span class="row__cat">{{ p.category }}</span>
            <span
              class="row__risk"
              :style="{ color: riskMeta[p.riskLevel].color, background: riskMeta[p.riskLevel].bg }"
            >{{ riskMeta[p.riskLevel].label }}</span>
          </div>
          <p class="row__reason">{{ p.reason }}</p>
          <p class="row__stats">
            提及 <strong>{{ p.mentionCount }}</strong> 次
            <span class="sep">·</span>
            违规 <strong class="danger">{{ p.violationCount }}</strong> 次
          </p>
        </div>
      </li>
      <li v-if="!products.length" class="empty">暂无重点产品</li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  background: #11192a;
  border: 1px solid rgba(56, 139, 253, 0.18);
  border-radius: 10px;
  padding: 16px;
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.card__title { margin: 0; font-size: 16px; font-weight: 600; }
.card__sub { font-size: 12px; color: #8b98a8; }
.list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #0c1424;
  border: 1px solid rgba(255,255,255,0.04);
}
.row__rank {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: rgba(255,255,255,0.06);
  color: #8b98a8;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.row__rank.top {
  background: linear-gradient(135deg, #ff7a59, #ff5c5c);
  color: #fff;
}
.row__main { flex: 1; min-width: 0; }
.row__top {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.row__name { font-size: 14px; font-weight: 500; }
.row__cat {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255,255,255,0.06);
  color: #9fb2c8;
}
.row__risk {
  font-size: 11px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
}
.row__reason {
  margin: 0 0 4px;
  font-size: 12px;
  color: #9fb2c8;
  line-height: 1.5;
}
.row__stats {
  margin: 0;
  font-size: 11px;
  color: #6b7a90;
}
.row__stats strong { color: #c9d4e3; font-variant-numeric: tabular-nums; }
.row__stats strong.danger { color: #ff8a8a; }
.sep { margin: 0 4px; color: #4a586d; }
.empty {
  text-align: center;
  padding: 24px 0;
  color: #6b7a90;
  font-size: 13px;
}
</style>
