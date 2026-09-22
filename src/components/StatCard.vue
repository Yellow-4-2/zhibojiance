<script setup lang="ts">
defineProps<{
  label: string
  value: number | string
  delta?: string
  trend?: 'up' | 'down' | 'flat'
  iconColor: string
}>()
</script>

<template>
  <div class="stat">
    <div class="stat__icon" :style="{ background: iconColor }">
      <slot name="icon" />
    </div>
    <div class="stat__body">
      <p class="stat__label">{{ label }}</p>
      <p class="stat__value">{{ value }}</p>
      <p v-if="delta" class="stat__delta" :class="trend">
        {{ trend === 'up' ? '▲' : trend === 'down' ? '▼' : '●' }} {{ delta }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: #11192a;
  border: 1px solid rgba(56, 139, 253, 0.18);
  border-radius: 10px;
}
.stat__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.stat__label {
  margin: 0;
  font-size: 12px;
  color: #8b98a8;
}
.stat__value {
  margin: 4px 0 2px;
  font-size: 22px;
  font-weight: 700;
  color: #e6edf3;
  font-variant-numeric: tabular-nums;
}
.stat__delta {
  margin: 0;
  font-size: 11px;
  color: #8b98a8;
}
.stat__delta.up { color: #ff7a7a; }
.stat__delta.down { color: #4dd0a3; }
.stat__delta.flat { color: #8b98a8; }
</style>
