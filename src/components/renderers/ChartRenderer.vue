<template>
  <div class="chart-renderer">
    <div class="chart-header">
      <h4 class="chart-title">{{ chartData.title }}</h4>
    </div>
    <div class="chart-body">
      <div class="chart-placeholder">
        <div class="chart-bars">
          <div
            v-for="(value, index) in chartData.values"
            :key="index"
            class="chart-bar"
            :style="{ height: getBarHeight(value) + '%' }"
          >
            <span class="chart-value">{{ value }}</span>
          </div>
        </div>
        <div class="chart-labels">
          <span
            v-for="(label, index) in chartData.labels"
            :key="index"
            class="chart-label"
          >
            {{ label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="chartRenderer">
import { computed } from 'vue'

interface ChartData {
  title: string
  labels: string[]
  values: number[]
}

interface Props {
  component?: {
    props?: {
      chartData?: Partial<ChartData>
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  component: () => ({})
})

const chartData = computed<ChartData>(() => {
  const data = props.component?.props?.chartData
  return {
    title: data?.title || '销售图表',
    labels: data?.labels || ['一月', '二月', '三月', '四月', '五月'],
    values: data?.values || [120, 200, 150, 80, 70]
  }
})

const getBarHeight = (value: number) => {
  const maxValue = Math.max(...chartData.value.values)
  return (value / maxValue) * 100
}
</script>

<style scoped lang="less">
.chart-renderer {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 4px;

  .chart-header {
    margin-bottom: 16px;

    .chart-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }

  .chart-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .chart-placeholder {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;

    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 200px;
      padding: 16px 8px;
      background: linear-gradient(to top, #f5f5f5 0%, #fff 100%);
      border-radius: 4px;

      .chart-bar {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 40px;
        background: linear-gradient(to top, #1890ff, #40a9ff);
        border-radius: 4px 4px 0 0;
        transition: all 0.3s;

        &:hover {
          background: linear-gradient(to top, #40a9ff, #69c0ff);
          transform: translateY(-4px);
        }

        .chart-value {
          margin-top: -24px;
          font-size: 12px;
          color: #666;
        }
      }
    }

    .chart-labels {
      display: flex;
      justify-content: space-around;
      padding: 8px 0;

      .chart-label {
        width: 40px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    }
  }
}
</style>
