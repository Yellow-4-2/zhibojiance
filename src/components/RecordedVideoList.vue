<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RecordedVideo } from '../types'

const props = defineProps<{ videos: RecordedVideo[]; hideHeader?: boolean }>()
const emit = defineEmits<{
  (e: 'play', video: RecordedVideo): void
}>()

type FilterKey = 'all' | 'today' | 'yesterday' | 'earlier'
const activeFilter = ref<FilterKey>('all')

// mock 数据以 2026-09-22 为“今天”
const TODAY = '2026-09-22'
const YESTERDAY = '2026-09-21'

function dateGroup(date: string): FilterKey {
  if (date === TODAY) return 'today'
  if (date === YESTERDAY) return 'yesterday'
  return 'earlier'
}

function dayLabel(date: string): string {
  const md = date.slice(5)
  if (date === TODAY) return `今天 · ${md}`
  if (date === YESTERDAY) return `昨天 · ${md}`
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(date + 'T00:00:00').getDay()]
  return `${md} ${weekday}`
}

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'today', label: '今天' },
  { key: 'yesterday', label: '昨天' },
  { key: 'earlier', label: '更早' }
]

interface Group {
  key: FilterKey
  label: string
  items: RecordedVideo[]
}

const groups = computed<Group[]>(() => {
  const order: FilterKey[] = ['today', 'yesterday', 'earlier']
  return order
    .map(key => ({
      key,
      label: key === 'today'
        ? dayLabel(TODAY)
        : key === 'yesterday'
          ? dayLabel(YESTERDAY)
          : '',
      items: props.videos.filter(v => {
        const g = dateGroup(v.date)
        return activeFilter.value === 'all' ? g === key : g === activeFilter.value
      })
    }))
    .filter(g => g.items.length > 0)
    .map(g => ({
      ...g,
      label: g.key === 'earlier' ? '更早' : g.label
    }))
})

const totalDuration = computed(() => props.videos.length)
</script>

<template>
  <div class="card">
    <div class="card__head">
      <div v-if="!hideHeader">
        <h2 class="card__title">每日录播</h2>
        <p class="card__sub">共 {{ totalDuration }} 场录像 · 自动留存取证，支持回看与下载</p>
      </div>
      <div class="filters" :class="{ 'filters--right': hideHeader }">
        <button
          v-for="f in filters"
          :key="f.key"
          class="filters__btn"
          :class="{ active: activeFilter === f.key }"
          @click="activeFilter = f.key"
        >{{ f.label }}</button>
      </div>
    </div>

    <template v-for="g in groups" :key="g.key">
      <div class="group">
        <p class="group__label">{{ g.label }}</p>
        <div class="grid">
          <div
            v-for="v in g.items"
            :key="v.id"
            class="video"
            @click="emit('play', v)"
          >
            <div class="video__thumb">
              <div class="video__thumb-bg"></div>
              <span class="video__play">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span v-if="v.status === 'recording'" class="video__badge video__badge--rec">
                <i class="rec-dot"></i>录制中
              </span>
              <span class="video__duration">{{ v.duration }}</span>
            </div>
            <div class="video__body">
              <div class="video__top">
                <span class="video__avatar" :style="{ background: v.avatarColor }">{{ v.anchorName.slice(0, 1) }}</span>
                <div class="video__meta">
                  <p class="video__anchor">{{ v.anchorName }}</p>
                  <p class="video__platform">{{ v.platform }} · {{ v.startTime }} 开播</p>
                </div>
              </div>
              <p class="video__room">{{ v.roomTitle }}</p>
              <div class="video__foot">
                <span class="video__size">{{ v.fileSize }}</span>
                <span class="video__violation" :class="{ zero: !v.violationCount }">
                  违规 {{ v.violationCount }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-if="!groups.length" class="empty">该时间段暂无录播</p>
    </template>
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
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 10px;
}
.card__title { margin: 0; font-size: 16px; font-weight: 600; }
.card__sub { margin: 4px 0 0; font-size: 12px; color: #8b98a8; }
.filters { display: flex; gap: 6px; }
.filters--right { margin-left: auto; }
.filters__btn {
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid #2a3a55;
  background: transparent;
  color: #9fb2c8;
  font-size: 12px;
  cursor: pointer;
  transition: all .2s;
}
.filters__btn:hover { border-color: #3f5a85; color: #c9d4e3; }
.filters__btn.active {
  background: rgba(47, 129, 247, 0.18);
  border-color: #2f81f7;
  color: #9ec5ff;
}

.group { margin-bottom: 16px; }
.group:last-child { margin-bottom: 0; }
.group__label {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 600;
  color: #8b98a8;
  padding-left: 2px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
}

.video {
  background: #0c1424;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all .2s;
}
.video:hover {
  border-color: rgba(56, 139, 253, 0.5);
  transform: translateY(-2px);
}
.video__thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.video__thumb-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 30%, rgba(47, 129, 247, 0.25), transparent 60%),
    linear-gradient(135deg, #1a2740 0%, #0d1424 70%);
}
.video:hover .video__thumb-bg { filter: brightness(1.2); }
.video__play {
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(47, 129, 247, 0.9);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(47, 129, 247, 0.4);
  transition: transform .2s;
}
.video:hover .video__play { transform: scale(1.1); }
.video__badge {
  position: absolute;
  top: 8px;
  left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}
.video__badge--rec {
  background: rgba(255, 92, 92, 0.9);
  color: #fff;
}
.rec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: blink 1.2s infinite;
}
@keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: .3 } }
.video__duration {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: #e6edf3;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}

.video__body { padding: 10px 12px 12px; }
.video__top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.video__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
}
.video__anchor { margin: 0; font-size: 13px; font-weight: 500; }
.video__platform { margin: 1px 0 0; font-size: 11px; color: #6b7a90; }
.video__room {
  margin: 0 0 8px;
  font-size: 12px;
  color: #c9d4e3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
}
.video__size { color: #6b7a90; }
.video__violation { color: #ff8a8a; font-weight: 500; }
.video__violation.zero { color: #4dd0a3; }
.empty {
  text-align: center;
  padding: 28px 0;
  color: #6b7a90;
  font-size: 13px;
}
</style>
