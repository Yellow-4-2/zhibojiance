<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StatCard from '../components/StatCard.vue'
import LiveAnchorList from '../components/LiveAnchorList.vue'
import HistoryAnchorList from '../components/HistoryAnchorList.vue'
import KeyProductList from '../components/KeyProductList.vue'
import ViolationCharts from '../components/ViolationCharts.vue'
import {
  liveAnchors,
  historyAnchors,
  keyProducts,
  violationTrend,
  violationCategoryStats,
  anchorRanking
} from '../mock/data'

const router = useRouter()

const totalLive = computed(() => liveAnchors.length)
const totalHistory = computed(() => historyAnchors.length)
const todayViolation = computed(() => violationTrend.slice(-1)[0]?.count ?? 0)
const yesterdayViolation = computed(() => violationTrend.slice(-2, -1)[0]?.count ?? 0)
const violationDelta = computed(() => todayViolation.value - yesterdayViolation.value)

const keyProductCount = computed(() => keyProducts.length)

function goMonitor(anchorId: string) {
  router.push({ name: 'monitor', params: { anchorId } })
}
</script>

<template>
  <div class="home">
    <header class="home__hero">
      <div class="home__hero-text">
        <h1 class="home__hero-title">
          <span class="home__hero-logo">AI</span>
          直播监测控制台
        </h1>
        <p class="home__hero-sub">
          实时追踪主播开播状态 · AI 识别违规话术 · 溯源违规商品链接
        </p>
        <div class="home__hero-actions">
          <router-link class="home__hero-link" to="/recordings">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="15" rx="2" />
              <path d="M10 9l5 3.5-5 3.5V9z" fill="currentColor" stroke="none" />
              <path d="M7 3v3M17 3v3" />
            </svg>
            每日录播回放
          </router-link>
        </div>
      </div>
      <div class="home__hero-meta">
        <p class="home__hero-date">2026-09-22 周二</p>
        <p class="home__hero-sys">系统运行正常</p>
      </div>
    </header>

    <!-- KPI 卡片 -->
    <section class="home__kpi">
      <StatCard
        label="在播主播"
        :value="totalLive"
        delta="较昨日 +1"
        trend="up"
        icon-color="linear-gradient(135deg,#2f81f7,#5a8bff)"
      >
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M5 12a7 7 0 0 1 14 0M12 5a7 7 0 0 1 0 14" />
          </svg>
        </template>
      </StatCard>
      <StatCard
        label="历史监测主播"
        :value="totalHistory"
        delta="近 7 天累计"
        trend="flat"
        icon-color="linear-gradient(135deg,#8957e5,#c084fc)"
      >
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 1 18 0" />
            <path d="M12 7v5l3 2" />
          </svg>
        </template>
      </StatCard>
      <StatCard
        label="今日违规"
        :value="todayViolation"
        :delta="`${violationDelta >= 0 ? '+' : ''}${violationDelta} 较昨日`"
        :trend="violationDelta > 0 ? 'up' : violationDelta < 0 ? 'down' : 'flat'"
        icon-color="linear-gradient(135deg,#ff7a59,#ff5c5c)"
      >
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2 2 22h20L12 2z" />
            <path d="M12 9v5" />
            <circle cx="12" cy="18" r="0.6" fill="currentColor" />
          </svg>
        </template>
      </StatCard>
      <StatCard
        label="重点监测产品"
        :value="keyProductCount"
        delta="高风险 4 件"
        trend="up"
        icon-color="linear-gradient(135deg,#ffb454,#e8902a)"
      >
        <template #icon>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 7h18l-2 12H5L3 7z" />
            <path d="M8 7V5a4 4 0 0 1 8 0v2" />
          </svg>
        </template>
      </StatCard>
    </section>

    <!-- ECharts 图表区 -->
    <ViolationCharts
      :trend="violationTrend"
      :categories="violationCategoryStats"
      :ranking="anchorRanking"
    />

    <!-- 列表区 -->
    <section class="home__lists">
      <div class="home__col">
        <LiveAnchorList :anchors="liveAnchors" @select="goMonitor" />
      </div>
      <div class="home__col">
        <HistoryAnchorList :anchors="historyAnchors" @select="goMonitor" />
      </div>
      <div class="home__col home__col--wide">
        <KeyProductList :products="keyProducts" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background: #0f1626;
  color: #e6edf3;
  padding: 20px 24px 32px;
}
.home__hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 26px;
  border-radius: 12px;
  background: linear-gradient(120deg, #0b1220 0%, #16243f 60%, #1a2a4d 100%);
  border: 1px solid rgba(56, 139, 253, 0.25);
  margin-bottom: 16px;
}
.home__hero-text { display: flex; flex-direction: column; gap: 8px; }
.home__hero-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 22px;
  font-weight: 700;
}
.home__hero-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2f81f7, #8957e5);
  font-size: 14px;
  letter-spacing: 1px;
}
.home__hero-sub {
  margin: 0;
  font-size: 13px;
  color: #8b98a8;
}
.home__hero-actions {
  margin-top: 10px;
}
.home__hero-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(56, 139, 253, 0.45);
  background: rgba(47, 129, 247, 0.12);
  color: #9ec5ff;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all .2s;
}
.home__hero-link:hover {
  background: rgba(47, 129, 247, 0.24);
  border-color: #2f81f7;
}
.home__hero-meta { text-align: right; }
.home__hero-date { margin: 0; font-size: 13px; color: #c9d4e3; }
.home__hero-sys { margin: 4px 0 0; font-size: 12px; color: #4dd0a3; }

.home__kpi {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}
.home__lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}
.home__col { min-width: 0; }
.home__col--wide { grid-column: 1 / -1; }

@media (max-width: 1100px) {
  .home__kpi { grid-template-columns: repeat(2, 1fr); }
  .home__lists { grid-template-columns: 1fr; }
  .home__col--wide { grid-column: auto; }
}
</style>
