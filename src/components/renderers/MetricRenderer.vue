<template>
  <div class="metric-renderer">
    <div class="metric-body">
      <div class="metric-icon" :style="{ background: metricData.color }">
        {{ metricData.icon }}
      </div>
      <div class="metric-info">
        <div class="metric-label">{{ metricData.label }}</div>
        <div class="metric-value">
          <span class="value-prefix">{{ metricData.prefix }}</span>
          <span class="value-number">{{ formatValue(metricData.value) }}</span>
          <span class="value-suffix">{{ metricData.suffix }}</span>
        </div>
        <div
          v-if="metricData.trend"
          class="metric-trend"
          :class="metricData.trendType"
        >
          <span class="trend-icon">
            {{ metricData.trendType === 'up' ? '↑' : '↓' }}
          </span>
          <span class="trend-value">{{ metricData.trend }}%</span>
          <span class="trend-label">较上期</span>
        </div>
      </div>
    </div>
    <div v-if="metricData.footer" class="metric-footer">
      {{ metricData.footer }}
    </div>
  </div>
</template>

<script setup lang="ts" name="metricRenderer">
import { computed } from 'vue'

interface MetricData {
  label: string
  value: number | string
  icon?: string
  color?: string
  prefix?: string
  suffix?: string
  trend?: string
  trendType?: 'up' | 'down'
  footer?: string
}

interface Props {
  component?: {
    props?: {
      metricData?: Partial<MetricData>
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  component: () => ({})
})

const metricData = computed<MetricData>(() => {
  const data = props.component?.props?.metricData
  return {
    label: data?.label || '总销售额',
    value: data?.value ?? 126560,
    icon: data?.icon || '💰',
    color: data?.color || '#1890ff',
    prefix: data?.prefix || '¥',
    suffix: data?.suffix || '',
    trend: data?.trend || '12',
    trendType: data?.trendType || 'up',
    footer: data?.footer || '日销售额'
  }
})

const formatValue = (value: number | string) => {
  if (typeof value === 'number') {
    return value.toLocaleString()
  }
  return value
}
</script>

<style scoped lang="less">
.metric-renderer {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 4px;

  .metric-body {
    display: flex;
    gap: 16px;
    align-items: flex-start;

    .metric-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: #1890ff;
      border-radius: 8px;
      font-size: 24px;
      flex-shrink: 0;
    }

    .metric-info {
      flex: 1;
      min-width: 0;

      .metric-label {
        margin-bottom: 8px;
        font-size: 14px;
        color: #666;
      }

      .metric-value {
        display: flex;
        align-items: baseline;
        gap: 4px;
        margin-bottom: 8px;

        .value-prefix {
          font-size: 16px;
          color: #333;
        }

        .value-number {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          line-height: 1;
        }

        .value-suffix {
          font-size: 16px;
          color: #666;
        }
      }

      .metric-trend {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 13px;

        &.up {
          background: #f6ffed;
          color: #52c41a;

          .trend-icon {
            font-weight: bold;
          }
        }

        &.down {
          background: #fff1f0;
          color: #ff4d4f;

          .trend-icon {
            font-weight: bold;
          }
        }

        .trend-label {
          color: #999;
        }
      }
    }
  }

  .metric-footer {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    font-size: 13px;
    color: #999;
  }
}
</style>
