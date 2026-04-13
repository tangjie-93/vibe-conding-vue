<template>
  <div class="table-renderer">
    <div class="table-header">
      <h4 class="table-title">{{ tableData.title }}</h4>
      <button class="refresh-btn" @click="handleRefresh">
        🔄 刷新
      </button>
    </div>
    <div class="table-body">
      <table class="data-table">
        <thead>
          <tr>
            <th
              v-for="(column, index) in tableData.columns"
              :key="index"
              :style="{ width: column.width }"
            >
              {{ column.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in tableData.data"
            :key="rowIndex"
            :class="{ 'row-hover': rowIndex % 2 === 0 }"
          >
            <td
              v-for="(cell, colIndex) in row"
              :key="colIndex"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts" name="tableRenderer">
import { computed } from 'vue'

interface TableColumn {
  name: string
  width?: string
}

interface TableData {
  title: string
  columns: TableColumn[]
  data: any[][]
}

interface Props {
  component?: {
    props?: {
      tableData?: Partial<TableData>
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  component: () => ({})
})

const tableData = computed<TableData>(() => {
  const data = props.component?.props?.tableData
  return {
    title: data?.title || '数据表格',
    columns: data?.columns || [
      { name: '序号', width: '80px' },
      { name: '姓名', width: '120px' },
      { name: '年龄', width: '100px' },
      { name: '地址', width: '200px' }
    ],
    data: data?.data || [
      ['1', '张三', '25', '北京市朝阳区'],
      ['2', '李四', '30', '上海市浦东新区'],
      ['3', '王五', '28', '广州市天河区'],
      ['4', '赵六', '35', '深圳市南山区'],
      ['5', '孙七', '32', '杭州市西湖区']
    ]
  }
})

const handleRefresh = () => {
  console.log('Refreshing table data...')
}
</script>

<style scoped lang="less">
.table-renderer {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 4px;

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .table-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .refresh-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      background: #f5f5f5;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #e6f7ff;
        border-color: #1890ff;
        color: #1890ff;
      }
    }
  }

  .table-body {
    flex: 1;
    overflow: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    thead {
      tr {
        background: #fafafa;
        border-bottom: 2px solid #e8e8e8;

        th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #333;
          border-right: 1px solid #e8e8e8;

          &:last-child {
            border-right: none;
          }
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #e8e8e8;
        transition: background 0.3s;

        &.row-hover {
          background: #fafafa;
        }

        &:hover {
          background: #e6f7ff;
        }

        td {
          padding: 12px 16px;
          color: #666;
          border-right: 1px solid #e8e8e8;

          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
}
</style>
