<script setup lang="ts">
import type { LiveInfo } from '../types'

defineProps<{ info: LiveInfo }>()
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <span class="header__logo">AI</span>
      <div>
        <h1 class="header__title">直播监测系统</h1>
        <p class="header__subtitle">AI 实时识别违规内容 · 产品链接溯源 · 视频留存取证</p>
      </div>
    </div>
    <div class="header__meta">
      <div class="header__meta-item">
        <span class="label">主播</span>
        <span class="value">{{ info.anchor }}</span>
      </div>
      <div class="header__meta-item">
        <span class="label">开播</span>
        <span class="value">{{ info.startTime }}</span>
      </div>
      <div class="header__meta-item">
        <span class="label">时长</span>
        <span class="value">{{ info.duration }}</span>
      </div>
      <div class="header__meta-item">
        <span class="label">在线</span>
        <span class="value">{{ info.viewerCount.toLocaleString() }}</span>
      </div>
      <span class="header__status">
        <i class="dot"></i>{{ info.status }}
      </span>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: linear-gradient(90deg, #0b1220 0%, #16243f 100%);
  border-bottom: 1px solid rgba(56, 139, 253, 0.25);
}
.header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header__logo {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, #2f81f7, #8957e5);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1px;
}
.header__title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.header__subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: #8b98a8;
}
.header__meta {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.header__meta-item {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.header__meta-item .label {
  color: #6e7a8a;
}
.header__meta-item .value {
  margin-top: 2px;
  font-size: 14px;
  color: #e6edf3;
}
.header__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(46, 160, 67, 0.15);
  border: 1px solid rgba(46, 160, 67, 0.5);
  color: #4ade80;
  font-size: 13px;
  font-weight: 500;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 6px #4ade80;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
