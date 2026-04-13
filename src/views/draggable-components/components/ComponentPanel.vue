<template>
  <div class="component-panel">
    <h3 class="panel-title">组件库</h3>
    <div class="component-list">
      <div
        v-for="component in components"
        :key="component.type"
        class="component-item"
        draggable="true"
        @dragstart="handleDragStart($event, component)"
      >
        <span class="component-icon">{{ component.icon }}</span>
        <span class="component-name">{{ component.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="componentPanel">
import { AVAILABLE_COMPONENTS } from '@/types/draggable-components'
import type { ComponentDefinition } from '@/types/draggable-components'

const emit = defineEmits<{
  (e: 'component-drag-start', type: string): void
}>()

const components: ComponentDefinition[] = AVAILABLE_COMPONENTS

const handleDragStart = (event: DragEvent, component: ComponentDefinition) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('componentType', component.type)
    event.dataTransfer.setData('action', 'new')
    event.dataTransfer.effectAllowed = 'copy'
  }
  emit('component-drag-start', component.type)
}
</script>

<style scoped lang="less">
.component-panel {
  width: 200px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  padding: 16px;
  overflow-y: auto;
}

.panel-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.component-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: grab;
  transition: all 0.3s;
  user-select: none;

  &:hover {
    background: #e6f7ff;
    transform: translateX(4px);
  }

  &:active {
    cursor: grabbing;
  }

  .component-icon {
    font-size: 20px;
  }

  .component-name {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
}
</style>
