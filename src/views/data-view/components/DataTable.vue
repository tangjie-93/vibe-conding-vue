<template>
  <div class="data-table">
    <div class="table-header">
      <h3 class="table-title">数据列表</h3>
    </div>

    <div v-if="loading" class="table-loading">
      <span class="loading-spinner">⏳</span>
      <span>加载中...</span>
    </div>

    <table v-else-if="data.length > 0" class="table">
      <thead>
        <tr>
          <th>名称</th>
          <th>分类</th>
          <th>数值</th>
          <th>数量</th>
          <th>日期</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id" class="table-row">
          <td>{{ item.name }}</td>
          <td>{{ getCategoryName(item.category) }}</td>
          <td>{{ item.value.toLocaleString() }}</td>
          <td>{{ item.count.toLocaleString() }}</td>
          <td>{{ item.date }}</td>
          <td>
            <span :class="['status-tag', item.status]">
              {{ getStatusName(item.status) }}
            </span>
          </td>
          <td>
            <button class="action-btn" @click="handleDelete(item.id)">
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="table-empty">
      <span class="empty-icon">📭</span>
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataViewDataTable">
import type { DataTableProps, DataTableEmits } from '@/types/data-view'

const props = withDefaults(defineProps<DataTableProps>(), {
  loading: false
})

const emit = defineEmits<DataTableEmits>()

const getCategoryName = (category: string): string => {
  const map: Record<string, string> = {
    tech: '科技',
    finance: '财经',
    health: '健康',
    education: '教育'
  }
  return map[category] || category
}

const getStatusName = (status: string): string => {
  const map: Record<string, string> = {
    active: '活跃',
    inactive: '未激活',
    pending: '待处理'
  }
  return map[status] || status
}

const handleDelete = (id: string) => {
  emit('delete', id)
}
</script>

<style scoped lang="less">
.data-table {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.table-header {
  margin-bottom: 20px;
}

.table-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.table-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 0;
  color: #999;
}

.loading-spinner {
  font-size: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
  }

  th {
    background: #fafafa;
    font-weight: 500;
    color: #333;
    font-size: 14px;
  }

  td {
    font-size: 14px;
    color: #666;
  }

  .table-row {
    transition: background 0.3s;

    &:hover {
      background: #fafafa;
    }
  }
}

.status-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;

  &.active {
    background: #e6f7ff;
    color: #1890ff;
  }

  &.inactive {
    background: #f5f5f5;
    color: #999;
  }

  &.pending {
    background: #fff7e6;
    color: #fa8c16;
  }
}

.action-btn {
  padding: 4px 12px;
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #ff7875;
  }
}

.table-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #999;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}
</style>
