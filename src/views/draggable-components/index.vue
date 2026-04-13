<template>
  <div class="draggable-components-view">
    <div class="toolbar">
      <h1 class="page-title">可视化组件设计器</h1>
      <div class="toolbar-actions">
        <button class="btn btn-primary" @click="handleSave">
          💾 保存布局
        </button>
        <button class="btn btn-default" @click="handleClear">
          🗑️ 清空画布
        </button>
      </div>
    </div>

    <div class="workspace">
      <ComponentPanel
        @component-drag-start="handleComponentDragStart"
      />
      
      <DraggableCanvas
        :components="components"
        :selected-component-id="selectedComponentId"
        @add-component="handleAddComponent"
        @move-component="handleMoveComponent"
        @resize-component="handleResizeComponent"
        @select-component="handleSelectComponent"
        @delete-component="handleDeleteComponent"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="draggableComponentsView">
import { ref } from 'vue'
import ComponentPanel from './components/ComponentPanel.vue'
import DraggableCanvas from './components/DraggableCanvas.vue'
import type { DraggableComponent } from '@/types/draggable-components'
import { AVAILABLE_COMPONENTS } from '@/types/draggable-components'

const components = ref<DraggableComponent[]>([])
const selectedComponentId = ref<string>()
let componentIdCounter = 0

const generateId = () => `component_${++componentIdCounter}`

const handleComponentDragStart = (type: string) => {
  console.log('Drag started for component type:', type)
}

const handleAddComponent = (type: string, x: number, y: number) => {
  const componentDef = AVAILABLE_COMPONENTS.find(c => c.type === type)
  if (!componentDef) return

  const newComponent: DraggableComponent = {
    id: generateId(),
    type,
    name: componentDef.name,
    x,
    y,
    width: componentDef.defaultWidth || 300,
    height: componentDef.defaultHeight || 200
  }

  components.value.push(newComponent)
  selectedComponentId.value = newComponent.id
}

const handleMoveComponent = (id: string, x: number, y: number) => {
  const component = components.value.find(c => c.id === id)
  if (component) {
    component.x = Math.max(0, x)
    component.y = Math.max(0, y)
  }
}

const handleResizeComponent = (id: string, width: number, height: number) => {
  const component = components.value.find(c => c.id === id)
  if (component) {
    component.width = width
    component.height = height
  }
}

const handleSelectComponent = (id?: string) => {
  selectedComponentId.value = id
}

const handleDeleteComponent = (id: string) => {
  const index = components.value.findIndex(c => c.id === id)
  if (index > -1) {
    components.value.splice(index, 1)
    if (selectedComponentId.value === id) {
      selectedComponentId.value = undefined
    }
  }
}

const handleSave = () => {
  const layout = {
    components: components.value,
    timestamp: new Date().toISOString()
  }
  console.log('Saving layout:', layout)
  localStorage.setItem('draggable-layout', JSON.stringify(layout))
  alert('布局已保存！')
}

const handleClear = () => {
  if (confirm('确定要清空画布吗？')) {
    components.value = []
    selectedComponentId.value = undefined
  }
}

const loadLayout = () => {
  const saved = localStorage.getItem('draggable-layout')
  if (saved) {
    try {
      const layout = JSON.parse(saved)
      components.value = layout.components || []
      const maxId = components.value.reduce((max, c) => {
        const num = parseInt(c.id.split('_')[1])
        return num > max ? num : max
      }, 0)
      componentIdCounter = maxId
    } catch (e) {
      console.error('Failed to load layout:', e)
    }
  }
}

loadLayout()
</script>

<style scoped lang="less">
.draggable-components-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.toolbar-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

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

.workspace {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
