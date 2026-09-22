<script setup lang="ts">
import type { Anchor } from '../types'

defineProps<{ anchors: Anchor[] }>()
defineEmits<{ (e: 'select', id: string): void }>()

function fmt(n: number) {
  return n >= 10000 ? (n / 10000).toFixed(1) + 'w' : n.toLocaleString()
}
</script>

<template>
  <div class="card">
    <div class="card__head">
      <h2 class="card__title">历史监测主播</h2>
      <span class="card__sub">近 7 天已结束直播</span>
    </div>
    <ul class="list">
      <li
        v-for="a in anchors"
        :key="a.id"
        class="row"
        @click="$emit('select', a.id)"
      >
        <div class="row__avatar" :style="{ background: a.avatarColor }">
          {{ a.name.slice(0, 1) }}
        </div>
        <div class="row__main">
          <div class="row__top">
            <span class="row__name">{{ a.name }}</span>
            <span class="row__platform">{{ a.platform }}</span>
            <span class="row__ended">已结束</span>
          </div>
          <p class="row__room">{{ a.roomTitle }}</p>
        </div>
        <div class="row__right">
          <p class="row__time">{{ a.lastLiveTime }}</p>
          <p class="row__violation" :class="{ zero: !a.violationCount }">
            违规 {{ a.violationCount }}
          </p>
        </div>
      </li>
      <li v-if="!anchors.length" class="empty">暂无历史记录</li>
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
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #0c1424;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all .2s;
}
.row:hover {
  border-color: rgba(56, 139, 253, 0.3);
  background: #0f1a2e;
}
.row__avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 600;
  flex-shrink: 0;
}
.row__main { flex: 1; min-width: 0; }
.row__top { display: flex; align-items: center; gap: 8px; }
.row__name { font-size: 14px; font-weight: 500; }
.row__platform {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255,255,255,0.06);
  color: #9fb2c8;
}
.row__ended {
  font-size: 11px;
  color: #6b7a90;
  background: rgba(255,255,255,0.04);
  padding: 1px 6px;
  border-radius: 4px;
}
.row__room {
  margin: 4px 0 0;
  font-size: 12px;
  color: #8b98a8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row__right { text-align: right; }
.row__time { margin: 0; font-size: 11px; color: #6b7a90; }
.row__violation {
  margin: 2px 0 0;
  font-size: 12px;
  color: #ff8a8a;
  font-weight: 500;
}
.row__violation.zero { color: #4dd0a3; }
.empty {
  text-align: center;
  padding: 24px 0;
  color: #6b7a90;
  font-size: 13px;
}
</style>
