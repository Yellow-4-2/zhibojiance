<script setup lang="ts">
import { computed } from 'vue'
import type { ViolationRecord, RiskLevel } from '../types'

const props = defineProps<{ violations: ViolationRecord[] }>()
defineEmits<{ (e: 'export'): void }>()

const riskMeta: Record<RiskLevel, { label: string; color: string; bg: string }> = {
  high:   { label: '高风险', color: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.12)' },
  medium: { label: '中风险', color: '#ffb454', bg: 'rgba(255, 180, 84, 0.12)' },
  low:    { label: '低风险', color: '#4dd0a3', bg: 'rgba(77, 208, 163, 0.12)' }
}

const summary = computed(() => {
  const total = props.violations.length
  const high = props.violations.filter(v => v.riskLevel === 'high').length
  const medium = props.violations.filter(v => v.riskLevel === 'medium').length
  const low = props.violations.filter(v => v.riskLevel === 'low').length
  return { total, high, medium, low }
})
</script>

<template>
  <div class="panel">
    <div class="panel__head">
      <div>
        <h2 class="panel__title">AI 违规监测</h2>
        <p class="panel__desc">实时识别主播话术中的违规内容并标记对应产品</p>
      </div>
      <button class="panel__export" @click="$emit('export')">导出违规链接</button>
    </div>

    <div class="summary">
      <div class="summary__item">
        <span class="num">{{ summary.total }}</span>
        <span class="lbl">总计</span>
      </div>
      <div class="summary__item">
        <span class="num" style="color:#ff6b6b">{{ summary.high }}</span>
        <span class="lbl">高风险</span>
      </div>
      <div class="summary__item">
        <span class="num" style="color:#ffb454">{{ summary.medium }}</span>
        <span class="lbl">中风险</span>
      </div>
      <div class="summary__item">
        <span class="num" style="color:#4dd0a3">{{ summary.low }}</span>
        <span class="lbl">低风险</span>
      </div>
    </div>

    <ul class="list">
      <li v-for="v in violations" :key="v.id" class="list__item">
        <div class="list__top">
          <span class="tag" :style="{ color: riskMeta[v.riskLevel].color, background: riskMeta[v.riskLevel].bg }">
            {{ riskMeta[v.riskLevel].label }}
          </span>
          <span class="list__category">{{ v.category }}</span>
          <span class="list__time">{{ v.time }}</span>
        </div>
        <p class="list__product">涉及产品：<strong>{{ v.product }}</strong></p>
        <p class="list__content">{{ v.content }}</p>
        <p class="list__suggestion">建议：{{ v.suggestion }}</p>
        <a class="list__link" :href="v.link" target="_blank" rel="noopener">{{ v.link }}</a>
      </li>
      <li v-if="!violations.length" class="list__empty">暂无违规记录</li>
    </ul>
  </div>
</template>

<style scoped>
.panel {
  background: #11192a;
  border: 1px solid rgba(56, 139, 253, 0.18);
  border-radius: 10px;
  padding: 16px;
}
.panel__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}
.panel__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.panel__desc {
  margin: 4px 0 0;
  font-size: 12px;
  color: #8b98a8;
}
.panel__export {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid rgba(56, 139, 253, 0.5);
  background: rgba(56, 139, 253, 0.1);
  color: #9ec5ff;
  font-size: 12px;
  cursor: pointer;
}
.panel__export:hover { background: rgba(56, 139, 253, 0.2); }
.summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
  background: #0c1424;
  border-radius: 8px;
  margin-bottom: 14px;
}
.summary__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.summary__item .num {
  font-size: 20px;
  font-weight: 700;
  color: #e6edf3;
}
.summary__item .lbl {
  font-size: 11px;
  color: #8b98a8;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 380px;
  overflow-y: auto;
}
.list__item {
  padding: 12px;
  border-radius: 8px;
  background: #0c1424;
  border-left: 3px solid #2f81f7;
}
.list__top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}
.list__category {
  font-size: 12px;
  color: #c9d4e3;
  background: rgba(255,255,255,0.05);
  padding: 2px 6px;
  border-radius: 4px;
}
.list__time {
  margin-left: auto;
  font-size: 11px;
  color: #6b7a90;
  font-variant-numeric: tabular-nums;
}
.list__product {
  margin: 0 0 6px;
  font-size: 13px;
  color: #c9d4e3;
}
.list__content {
  margin: 0 0 6px;
  font-size: 12px;
  line-height: 1.6;
  color: #e6edf3;
}
.list__suggestion {
  margin: 0 0 8px;
  font-size: 12px;
  color: #9ec5ff;
}
.list__link {
  display: block;
  font-size: 11px;
  color: #5a8bff;
  word-break: break-all;
  text-decoration: none;
}
.list__link:hover { text-decoration: underline; }
.list__empty {
  text-align: center;
  color: #6b7a90;
  padding: 24px 0;
  font-size: 13px;
}
</style>
