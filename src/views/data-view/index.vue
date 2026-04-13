<template>
  <div class="data-view">
    <h1 class="page-title">数据展示</h1>

    <QueryForm v-model="queryForm" @search="handleSearch" @reset="handleReset" />

    <div class="charts-grid">
      <ChartCard
        title="数值统计"
        :data="chartData"
        type="bar"
      />
      <ChartCard
        title="趋势分析"
        :data="chartData"
        type="line"
      />
    </div>

    <DataTable
      :data="tableData"
      :loading="loading"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts" name="dataView">
import { ref, reactive } from 'vue'
import QueryForm from './components/QueryForm.vue'
import ChartCard from './components/ChartCard.vue'
import DataTable from './components/DataTable.vue'
import type { DataQuery, DataItem, ChartData } from '@/types/data-view'

const queryForm = ref<DataQuery>({
  keyword: '',
  category: '',
  status: ''
})
const loading = ref(false)

const mockData: DataItem[] = reactive([
  { id: '1', name: '科技项目 A', category: 'tech', value: 12000, count: 120, date: '2024-01-15', status: 'active' },
  { id: '2', name: '财经项目 B', category: 'finance', value: 8500, count: 85, date: '2024-01-14', status: 'active' },
  { id: '3', name: '健康项目 C', category: 'health', value: 6800, count: 68, date: '2024-01-13', status: 'pending' },
  { id: '4', name: '教育项目 D', category: 'education', value: 9200, count: 92, date: '2024-01-12', status: 'active' },
  { id: '5', name: '科技项目 E', category: 'tech', value: 5600, count: 56, date: '2024-01-11', status: 'inactive' },
  { id: '6', name: '财经项目 F', category: 'finance', value: 7800, count: 78, date: '2024-01-10', status: 'active' },
  { id: '7', name: '健康项目 G', category: 'health', value: 4500, count: 45, date: '2024-01-09', status: 'pending' },
  { id: '8', name: '教育项目 H', category: 'education', value: 11000, count: 110, date: '2024-01-08', status: 'active' }
])

const chartData = ref<ChartData>({
  categories: mockData.map(item => item.name),
  values: mockData.map(item => item.value),
  counts: mockData.map(item => item.count)
})

const tableData = ref<DataItem[]>(mockData)

const handleSearch = () => {
  loading.value = true
  console.log('搜索条件:', queryForm.value)
  
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const handleReset = () => {
  console.log('重置表单')
}

const handleDelete = (id: string) => {
  const index = tableData.value.findIndex(item => item.id === id)
  if (index > -1) {
    tableData.value.splice(index, 1)
    
    chartData.value = {
      categories: tableData.value.map(item => item.name),
      values: tableData.value.map(item => item.value),
      counts: tableData.value.map(item => item.count)
    }
  }
}
</script>

<style scoped lang="less">
.data-view {
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
