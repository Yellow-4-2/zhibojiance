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
      <h2 class="card__title">
        <span class="card__live-dot"></span>
        在播主播
      </h2>
      <span class="card__sub">{{ anchors.length }} 位主播正在直播</span>
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
            <span v-if="a.violationCount" class="row__alert">⚠ {{ a.violationCount }}</span>
          </div>
          <p class="row__room">{{ a.roomTitle }}</p>
          <p class="row__meta">
            {{ a.category }}
            <span class="sep">·</span>
            粉丝 {{ fmt(a.followers) }}
            <span class="sep">·</span>
            在线 {{ fmt(a.viewerCount) }}
          </p>
        </div>
        <div class="row__action">进入 →</div>
      </li>
      <li v-if="!anchors.length" class="empty">当前无在播主播</li>
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
.card__title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.card__live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff5c5c;
  box-shadow: 0 0 6px #ff5c5c;
  animation: pulse 1.5s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
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
  border-color: rgba(56, 139, 253, 0.4);
  background: #0f1a2e;
  transform: translateX(2px);
}
.row__avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-weight: 600;
  flex-shrink: 0;
}
.row__main { flex: 1; min-width: 0; }
.row__top {
  display: flex;
  align-items: center;
  gap: 8px;
}
.row__name { font-size: 14px; font-weight: 500; }
.row__platform {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255,255,255,0.06);
  color: #9fb2c8;
}
.row__alert {
  margin-left: auto;
  font-size: 11px;
  color: #ff7a7a;
  background: rgba(255, 107, 107, 0.12);
  padding: 1px 6px;
  border-radius: 4px;
}
.row__room {
  margin: 4px 0 0;
  font-size: 13px;
  color: #c9d4e3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row__meta {
  margin: 2px 0 0;
  font-size: 11px;
  color: #6b7a90;
}
.sep { margin: 0 4px; color: #4a586d; }
.row__action {
  font-size: 12px;
  color: #5a8bff;
  white-space: nowrap;
}
.empty {
  text-align: center;
  padding: 24px 0;
  color: #6b7a90;
  font-size: 13px;
}
</style>
