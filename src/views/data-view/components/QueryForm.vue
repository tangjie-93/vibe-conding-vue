<template>
  <div class="query-form">
    <div class="form-row">
      <div class="form-item">
        <label class="form-label">关键词</label>
        <input
          v-model="localQuery.keyword"
          type="text"
          class="form-input"
          placeholder="请输入关键词"
        />
      </div>

      <div class="form-item">
        <label class="form-label">分类</label>
        <select v-model="localQuery.category" class="form-select">
          <option value="">全部</option>
          <option value="tech">科技</option>
          <option value="finance">财经</option>
          <option value="health">健康</option>
          <option value="education">教育</option>
        </select>
      </div>

      <div class="form-item">
        <label class="form-label">状态</label>
        <select v-model="localQuery.status" class="form-select">
          <option value="">全部</option>
          <option value="active">活跃</option>
          <option value="inactive">未激活</option>
          <option value="pending">待处理</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="btn btn-primary" @click="handleSearch">
          <span class="btn-icon">🔍</span>
          查询
        </button>
        <button class="btn btn-default" @click="handleReset">
          <span class="btn-icon">🔄</span>
          重置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataViewQueryForm">
import { computed } from 'vue'
import type { DataQuery, QueryFormProps, QueryFormEmits } from '@/types/data-view'

const props = withDefaults(defineProps<QueryFormProps>(), {
  modelValue: () => ({})
})

const emit = defineEmits<QueryFormEmits>()

const localQuery = computed({
  get: () => props.modelValue || { keyword: '', category: '', status: '' },
  set: (value) => emit('update:modelValue', value)
})

const handleSearch = () => {
  emit('search')
}

const handleReset = () => {
  emit('update:modelValue', { keyword: '', category: '', status: '' })
  emit('reset')
}
</script>

<style scoped lang="less">
.query-form {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.form-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;
}

.form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;

  .form-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    white-space: nowrap;
    min-width: 42px;
  }

  .form-input,
  .form-select {
    width: 140px;
    padding: 6px 10px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 13px;
    transition: all 0.3s;

    &:hover {
      border-color: #40a9ff;
    }

    &:focus {
      outline: none;
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
}

.date-separator {
  padding: 0 8px;
  color: #999;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;

    .btn-icon {
      font-size: 14px;
    }

    &.btn-primary {
      background: #1890ff;
      color: #fff;

      &:hover {
        background: #40a9ff;
      }

      &:active {
        background: #096dd9;
      }
    }

    &.btn-default {
      background: #f5f5f5;
      color: #666;
      border: 1px solid #d9d9d9;

      &:hover {
        background: #fafafa;
        border-color: #1890ff;
        color: #1890ff;
      }

      &:active {
        background: #f0f0f0;
      }
    }
  }
}
</style>
