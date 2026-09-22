<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import RecordedVideoList from '../components/RecordedVideoList.vue'
import VideoPlaybackModal from '../components/VideoPlaybackModal.vue'
import { recordedVideos } from '../mock/data'
import type { RecordedVideo } from '../types'

const router = useRouter()

const selectedVideo = ref<RecordedVideo | null>(null)

const total = computed(() => recordedVideos.length)
const recordingCount = computed(() => recordedVideos.filter(v => v.status === 'recording').length)
const violationTotal = computed(() =>
  recordedVideos.reduce((sum, v) => sum + v.violationCount, 0)
)

function handlePlay(video: RecordedVideo) {
  selectedVideo.value = video
}

function closePlayer() {
  selectedVideo.value = null
}

function goMonitor(anchorId: string) {
  closePlayer()
  router.push({ name: 'monitor', params: { anchorId } })
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="page">
    <button class="back" @click="goHome">← 返回首页</button>

    <header class="page__hero">
      <div>
        <h1 class="page__title">每日录播</h1>
        <p class="page__sub">直播间录像自动留存取证，支持按日期回看、下载与跳转对应监测场次</p>
      </div>
      <div class="page__stats">
        <div class="pstat">
          <span class="pstat__num">{{ total }}</span>
          <span class="pstat__lbl">累计录像</span>
        </div>
        <div class="pstat">
          <span class="pstat__num pstat__num--red">{{ recordingCount }}</span>
          <span class="pstat__lbl">录制中</span>
        </div>
        <div class="pstat">
          <span class="pstat__num pstat__num--orange">{{ violationTotal }}</span>
          <span class="pstat__lbl">关联违规</span>
        </div>
      </div>
    </header>

    <RecordedVideoList :videos="recordedVideos" hide-header @play="handlePlay" />

    <VideoPlaybackModal
      :video="selectedVideo"
      @close="closePlayer"
      @goto-anchor="goMonitor"
    />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #0f1626;
  color: #e6edf3;
  padding: 20px 24px 32px;
}
.back {
  margin-bottom: 12px;
  padding: 6px 14px;
  background: transparent;
  border: 1px solid #2a3a55;
  border-radius: 6px;
  color: #9fb2c8;
  cursor: pointer;
  font-size: 13px;
}
.back:hover { background: rgba(56, 139, 253, 0.1); }

.page__hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 22px 26px;
  border-radius: 12px;
  background: linear-gradient(120deg, #0b1220 0%, #16243f 60%, #1a2a4d 100%);
  border: 1px solid rgba(56, 139, 253, 0.25);
  margin-bottom: 16px;
}
.page__title { margin: 0; font-size: 22px; font-weight: 700; }
.page__sub { margin: 8px 0 0; font-size: 13px; color: #8b98a8; }
.page__stats { display: flex; gap: 32px; }
.pstat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.pstat__num { font-size: 24px; font-weight: 700; font-variant-numeric: tabular-nums; }
.pstat__num--red { color: #ff7a7a; }
.pstat__num--orange { color: #ffb454; }
.pstat__lbl { font-size: 12px; color: #8b98a8; }
</style>
