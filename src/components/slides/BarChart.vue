<script setup>
import { computed } from 'vue'

const props = defineProps({
  // [{ year, value, display, sub }] — sub ixtiyoriy ikkinchi qator
  bars: { type: Array, required: true },
})

const max = computed(() => Math.max(...props.bars.map((b) => b.value)))
const height = (v) => `${Math.max(12, (v / max.value) * 100)}%`
</script>

<template>
  <ul class="chart">
    <li v-for="bar in bars" :key="bar.year" class="chart__col">
      <span class="chart__value">{{ bar.display ?? bar.value }}</span>
      <span class="chart__bar" :style="{ height: height(bar.value) }">
        <span v-if="bar.sub != null" class="chart__sub">{{ bar.sub }}</span>
      </span>
      <span class="chart__year">{{ bar.year }}</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 100%;
  min-height: 118px;
}

.chart__col {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  height: 100%;
  min-width: 0;
}

.chart__value {
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.92);
  color: $c-navy;
  font-size: 9px;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
}

.chart__bar {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(180deg, #a9ffd4 0%, #4fd79c 100%);
  /* Ekranga kirganda pastdan o'sib chiqadi */
  transform-origin: bottom;
  animation: bar-grow 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

@keyframes bar-grow {
  from { transform: scaleY(0); }
}

.chart__sub {
  margin-bottom: 3px;
  padding: 1px 4px;
  border-radius: 3px;
  background: rgba(18, 27, 38, 0.55);
  color: $c-white;
  font-size: 8px;
  font-weight: 600;
  line-height: 1.3;
}

.chart__year {
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.14);
  color: $c-white;
  font-size: 8.5px;
  font-weight: 500;
  line-height: 1.25;
  text-align: center;
  white-space: pre-line;
}
</style>
