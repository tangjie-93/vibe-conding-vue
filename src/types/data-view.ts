export interface DataQuery {
  keyword?: string
  dateRange?: [string, string]
  category?: string
  status?: string
}

export interface DataItem {
  id: string
  name: string
  category: string
  value: number
  count: number
  date: string
  status: 'active' | 'inactive' | 'pending'
}

export interface ChartData {
  categories: string[]
  values: number[]
  counts: number[]
}

export interface QueryFormProps {
  modelValue: DataQuery
}

export interface QueryFormEmits {
  'update:modelValue': [value: DataQuery]
  search: []
  reset: []
}

export interface ChartCardProps {
  title: string
  data: ChartData
  type?: 'bar' | 'line' | 'pie'
}

export interface DataTableProps {
  data: DataItem[]
  loading?: boolean
}

export interface DataTableEmits {
  sort: [field: string, order: 'asc' | 'desc']
  delete: [id: string]
}
