<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import LiveHeader from '../components/LiveHeader.vue'
import LivePlayer from '../components/LivePlayer.vue'
import ViolationPanel from '../components/ViolationPanel.vue'
import ProductList from '../components/ProductList.vue'
import { getLiveInfoByAnchor, getProductsByAnchor, getViolationsByAnchor } from '../mock/data'
import type { ViolationRecord, ProductItem } from '../types'

const props = defineProps<{ anchorId?: string }>()
const router = useRouter()

const anchorId = computed(() => props.anchorId || 'A001')

const liveInfo = ref(getLiveInfoByAnchor(anchorId.value))
const violations = ref<ViolationRecord[]>(getViolationsByAnchor(anchorId.value))
const products = ref<ProductItem[]>(getProductsByAnchor(anchorId.value))

const saving = ref(false)
const savedTip = ref('')
function handleSaveVideo() {
  if (saving.value) return
  saving.value = true
  savedTip.value = ''
  setTimeout(() => {
    saving.value = false
    savedTip.value = `已开始录制保存：${liveInfo.value.roomTitle}（预计文件大小约 1.2GB）`
    setTimeout(() => (savedTip.value = ''), 5000)
  }, 1200)
}

function handleExportLinks() {
  const flagged = products.value.filter(p => p.hasViolation)
  const text = flagged.map(p => `${p.name}\t${p.link}`).join('\n')
  savedTip.value = `已导出 ${flagged.length} 条违规产品链接：\n${text}`
  setTimeout(() => (savedTip.value = ''), 8000)
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="page">
    <button class="back" @click="goHome">← 返回主播列表</button>
    <LiveHeader :info="liveInfo" />
    <main class="page__main">
      <section class="page__left">
        <LivePlayer :info="liveInfo" :saving="saving" @save="handleSaveVideo" />
        <p v-if="savedTip" class="page__tip">{{ savedTip }}</p>
      </section>
      <section class="page__right">
        <ViolationPanel :violations="violations" @export="handleExportLinks" />
        <ProductList :products="products" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #0f1626;
  color: #e6edf3;
  padding: 16px;
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
.page__main {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 16px;
  margin-top: 12px;
}
.page__left,
.page__right {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.page__tip {
  padding: 10px 14px;
  background: rgba(56, 139, 253, 0.12);
  border: 1px solid rgba(56, 139, 253, 0.4);
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  color: #9ec5ff;
}
@media (max-width: 960px) {
  .page__main { grid-template-columns: 1fr; }
}
</style>
