<script setup lang="ts">
import type { LiveInfo } from '../types'

defineProps<{ info: LiveInfo; saving: boolean }>()
defineEmits<{ (e: 'save'): void }>()
</script>

<template>
  <div class="player">
    <div class="player__video">
      <!-- 静态占位：直播画面 -->
      <div class="player__placeholder">
        <div class="player__signal">
          <span class="rec">● REC</span>
          <span>{{ info.status }} · {{ info.duration }}</span>
        </div>
        <div class="player__title">{{ info.roomTitle }}</div>
        <p class="player__hint">直播视频流（静态占位）</p>
      </div>
    </div>

    <div class="player__toolbar">
      <div class="player__anchor">
        <span class="avatar">{{ info.anchor.slice(1, 3) }}</span>
        <div>
          <p class="name">{{ info.anchor }}</p>
          <p class="room">{{ info.roomTitle }}</p>
        </div>
      </div>
      <div class="player__actions">
        <button class="btn btn--ghost" disabled>截图</button>
        <button
          class="btn btn--primary"
          :disabled="saving"
          @click="$emit('save')"
        >
          {{ saving ? '保存中...' : '保存到本地' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  background: #11192a;
  border: 1px solid rgba(56, 139, 253, 0.18);
  border-radius: 10px;
  overflow: hidden;
}
.player__video {
  position: relative;
  aspect-ratio: 16 / 9;
  background:
    linear-gradient(135deg, #1a2740 0%, #0d1424 60%, #1c2a48 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.player__placeholder {
  text-align: center;
  color: #c9d4e3;
}
.player__signal {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: #9fb2c8;
}
.rec {
  color: #ff5c5c;
  font-weight: 600;
  letter-spacing: 1px;
}
.player__title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
}
.player__hint {
  font-size: 12px;
  color: #6b7a90;
}
.player__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #0d1526;
}
.player__anchor {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2f81f7, #8957e5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
}
.name {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}
.room {
  margin: 2px 0 0;
  font-size: 12px;
  color: #8b98a8;
}
.player__actions {
  display: flex;
  gap: 8px;
}
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.btn--ghost {
  background: transparent;
  border-color: #2a3a55;
  color: #9fb2c8;
}
.btn--primary {
  background: linear-gradient(135deg, #2f81f7, #5a8bff);
  color: #fff;
}
.btn--primary:not(:disabled):hover {
  filter: brightness(1.1);
}
</style>
