<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { CategoryStat, TrendPoint } from '../types'

const props = defineProps<{
  trend: TrendPoint[]
  categories: CategoryStat[]
  ranking: { name: string; count: number }[]
}>()

const trendRef = ref<HTMLElement | null>(null)
const pieRef = ref<HTMLElement | null>(null)
const barRef = ref<HTMLElement | null>(null)

let trendChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null
let barChart: echarts.ECharts | null = null

function renderTrend() {
  if (!trendRef.value) return
  trendChart = echarts.init(trendRef.value)
  trendChart.setOption({
    grid: { left: 36, right: 16, top: 28, bottom: 28 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: props.trend.map(t => t.date),
      axisLine: { lineStyle: { color: '#2a3a55' } },
      axisLabel: { color: '#8b98a8', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      axisLabel: { color: '#8b98a8', fontSize: 11 }
    },
    series: [
      {
        name: '违规数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        data: props.trend.map(t => t.count),
        lineStyle: { color: '#2f81f7', width: 2 },
        itemStyle: { color: '#2f81f7' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(47, 129, 247, 0.35)' },
            { offset: 1, color: 'rgba(47, 129, 247, 0.02)' }
          ])
        }
      }
    ]
  })
}

function renderPie() {
  if (!pieRef.value) return
  pieChart = echarts.init(pieRef.value)
  pieChart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: {
      bottom: 0,
      textStyle: { color: '#8b98a8', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: '#11192a', borderWidth: 2 },
        label: { color: '#c9d4e3', fontSize: 11 },
        labelLine: { lineStyle: { color: '#3a4a65' } },
        data: props.categories.map((c, i) => ({
          name: c.name,
          value: c.value,
          itemStyle: {
            color: ['#2f81f7', '#8957e5', '#ff7a59', '#4dd0a3', '#ffb454', '#ff5c5c'][i % 6]
          }
        }))
      }
    ]
  })
}

function renderBar() {
  if (!barRef.value) return
  barChart = echarts.init(barRef.value)
  const names = props.ranking.map(r => r.name)
  const values = props.ranking.map(r => r.count)
  barChart.setOption({
    grid: { left: 80, right: 24, top: 16, bottom: 24 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      axisLabel: { color: '#8b98a8', fontSize: 11 }
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: '#2a3a55' } },
      axisLabel: { color: '#c9d4e3', fontSize: 11 }
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: 14,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: function (p: { dataIndex: number }) {
            const colors = ['#ff5c5c', '#ff7a59', '#ffb454', '#2f81f7', '#4dd0a3', '#8957e5']
            return colors[p.dataIndex % colors.length]
          }
        },
        label: {
          show: true,
          position: 'right',
          color: '#c9d4e3',
          fontSize: 11
        }
      }
    ]
  })
}

function resizeAll() {
  trendChart?.resize()
  pieChart?.resize()
  barChart?.resize()
}

onMounted(() => {
  renderTrend()
  renderPie()
  renderBar()
  window.addEventListener('resize', resizeAll)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeAll)
  trendChart?.dispose()
  pieChart?.dispose()
  barChart?.dispose()
})

watch(props, () => {
  renderTrend()
  renderPie()
  renderBar()
})
</script>

<template>
  <div class="charts">
    <div class="chart chart--trend">
      <h3 class="chart__title">近 7 天违规趋势</h3>
      <div ref="trendRef" class="chart__canvas"></div>
    </div>
    <div class="chart chart--pie">
      <h3 class="chart__title">违规类型分布</h3>
      <div ref="pieRef" class="chart__canvas"></div>
    </div>
    <div class="chart chart--bar">
      <h3 class="chart__title">主播违规排行</h3>
      <div ref="barRef" class="chart__canvas"></div>
    </div>
  </div>
</template>

<style scoped>
.charts {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.2fr;
  gap: 16px;
}
.chart {
  background: #11192a;
  border: 1px solid rgba(56, 139, 253, 0.18);
  border-radius: 10px;
  padding: 14px;
}
.chart__title {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: #e6edf3;
}
.chart__canvas {
  width: 100%;
  height: 220px;
}
@media (max-width: 1100px) {
  .charts { grid-template-columns: 1fr; }
}
</style>
