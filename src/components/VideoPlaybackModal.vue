<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import type { RecordedVideo } from '../types'

const props = defineProps<{ video: RecordedVideo | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'goto-anchor', anchorId: string): void
}>()

const loadError = ref(false)
const downloadTip = ref(false)
let tipTimer: ReturnType<typeof setTimeout> | null = null

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.video,
  v => {
    loadError.value = false
    downloadTip.value = false
    if (v) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeydown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeydown)
    }
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
  if (tipTimer) clearTimeout(tipTimer)
})

function handleDownload() {
  downloadTip.value = true
  if (tipTimer) clearTimeout(tipTimer)
  tipTimer = setTimeout(() => (downloadTip.value = false), 4000)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="video" class="modal" @click.self="emit('close')">
      <div class="modal__box">
        <div class="modal__head">
          <div class="modal__title-wrap">
            <h3 class="modal__title">{{ video.roomTitle }}</h3>
            <p class="modal__id">录像编号 {{ video.id }}</p>
          </div>
          <button class="modal__close" @click="emit('close')" aria-label="关闭">✕</button>
        </div>

        <div class="modal__player">
          <video
            :key="video.id"
            :src="video.videoUrl"
            controls
            autoplay
            preload="metadata"
            playsinline
            @error="loadError = true"
          ></video>
          <div v-if="loadError" class="modal__error">
            <p>视频源加载失败（演示环境网络受限）</p>
            <span>实际系统中此处播放的是本地留存的直播间录像文件</span>
          </div>
        </div>

        <div class="modal__info">
          <div class="info">
            <span class="info__avatar" :style="{ background: video.avatarColor }">{{ video.anchorName.slice(0, 1) }}</span>
            <div>
              <p class="info__anchor">{{ video.anchorName }}</p>
              <p class="info__sub">{{ video.platform }} · {{ video.date }} {{ video.startTime }} 开播</p>
            </div>
          </div>
          <div class="info__stats">
            <div class="stat">
              <span class="stat__lbl">录像时长</span>
              <span class="stat__val">{{ video.duration }}</span>
            </div>
            <div class="stat">
              <span class="stat__lbl">文件大小</span>
              <span class="stat__val">{{ video.fileSize }}</span>
            </div>
            <div class="stat">
              <span class="stat__lbl">违规记录</span>
              <span class="stat__val" :class="{ danger: video.violationCount > 0, ok: !video.violationCount }">
                {{ video.violationCount }} 条
              </span>
            </div>
            <div v-if="video.status === 'recording'" class="stat">
              <span class="stat__lbl">状态</span>
              <span class="stat__val rec"><i class="rec-dot"></i>正在录制</span>
            </div>
          </div>
        </div>

        <div class="modal__actions">
          <button class="btn btn--ghost" @click="emit('goto-anchor', video.anchorId)">
            查看该场监测 →
          </button>
          <button class="btn btn--primary" @click="handleDownload">下载到本地</button>
        </div>
        <p v-if="downloadTip" class="modal__tip">
          已创建下载任务：{{ video.anchorName }}-{{ video.date }}.mp4（静态演示，真实环境将从录像存储服务拉取）
        </p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 20, 0.75);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}
.modal__box {
  width: min(860px, 100%);
  background: #11192a;
  border: 1px solid rgba(56, 139, 253, 0.3);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
}
.modal__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.modal__title { margin: 0; font-size: 16px; font-weight: 600; }
.modal__id { margin: 3px 0 0; font-size: 11px; color: #6b7a90; }
.modal__close {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #8b98a8;
  font-size: 14px;
  cursor: pointer;
}
.modal__close:hover { background: rgba(255, 255, 255, 0.08); color: #e6edf3; }

.modal__player {
  position: relative;
  background: #000;
  aspect-ratio: 16 / 9;
}
.modal__player video {
  width: 100%;
  height: 100%;
  display: block;
}
.modal__error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #1a2740, #0d1424);
  color: #9fb2c8;
  font-size: 13px;
  pointer-events: none;
}
.modal__error span { font-size: 11px; color: #6b7a90; }

.modal__info {
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.info { display: flex; align-items: center; gap: 10px; }
.info__avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}
.info__anchor { margin: 0; font-size: 14px; font-weight: 500; }
.info__sub { margin: 2px 0 0; font-size: 11px; color: #6b7a90; }
.info__stats { display: flex; gap: 22px; }
.stat { display: flex; flex-direction: column; gap: 3px; }
.stat__lbl { font-size: 11px; color: #6b7a90; }
.stat__val { font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; }
.stat__val.danger { color: #ff8a8a; }
.stat__val.ok { color: #4dd0a3; }
.stat__val.rec { color: #ff7a7a; display: inline-flex; align-items: center; gap: 5px; }
.rec-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff5c5c;
  animation: blink 1.2s infinite;
}
@keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: .3 } }

.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 0 18px 16px;
}
.btn {
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn--ghost {
  background: transparent;
  border-color: #2a3a55;
  color: #9fb2c8;
}
.btn--ghost:hover { border-color: #3f5a85; color: #c9d4e3; }
.btn--primary {
  background: linear-gradient(135deg, #2f81f7, #5a8bff);
  color: #fff;
}
.btn--primary:hover { filter: brightness(1.1); }
.modal__tip {
  margin: 0 18px 16px;
  padding: 8px 12px;
  background: rgba(56, 139, 253, 0.12);
  border: 1px solid rgba(56, 139, 253, 0.4);
  border-radius: 6px;
  font-size: 12px;
  color: #9ec5ff;
}
</style>
