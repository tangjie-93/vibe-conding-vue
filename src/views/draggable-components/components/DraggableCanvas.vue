<template>
  <div
    class="canvas"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @click="handleCanvasClick"
  >
    <div
      v-for="component in components"
      :key="component.id"
      class="canvas-component"
      :class="{ selected: selectedComponentId === component.id }"
      :style="{
        left: component.x + 'px',
        top: component.y + 'px',
        width: component.width + 'px',
        height: component.height + 'px'
      }"
      @mousedown="handleComponentMouseDown($event, component.id)"
      @click.stop="handleComponentClick($event, component.id)"
    >
      <div class="component-header">
        <span class="component-title">{{ component.name }}</span>
        <button class="delete-btn" @click.stop="handleDeleteComponent(component.id)">
          ×
        </button>
      </div>
      
      <div class="component-content">
        <ChartRenderer
          v-if="component.type === 'chart'"
          :component="component"
        />
        <TableRenderer
          v-else-if="component.type === 'table'"
          :component="component"
        />
        <TextRenderer
          v-else-if="component.type === 'text'"
          :component="component"
        />
        <ImageRenderer
          v-else-if="component.type === 'image'"
          :component="component"
        />
        <MetricRenderer
          v-else-if="component.type === 'metric'"
          :component="component"
        />
      </div>

      <div
        v-if="selectedComponentId === component.id"
        class="resize-handles"
      >
        <div class="resize-handle nw" @mousedown.stop="handleResizeStart($event, component.id, 'nw')"></div>
        <div class="resize-handle n" @mousedown.stop="handleResizeStart($event, component.id, 'n')"></div>
        <div class="resize-handle ne" @mousedown.stop="handleResizeStart($event, component.id, 'ne')"></div>
        <div class="resize-handle e" @mousedown.stop="handleResizeStart($event, component.id, 'e')"></div>
        <div class="resize-handle se" @mousedown.stop="handleResizeStart($event, component.id, 'se')"></div>
        <div class="resize-handle s" @mousedown.stop="handleResizeStart($event, component.id, 's')"></div>
        <div class="resize-handle sw" @mousedown.stop="handleResizeStart($event, component.id, 'sw')"></div>
        <div class="resize-handle w" @mousedown.stop="handleResizeStart($event, component.id, 'w')"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="draggableCanvas">
import type { DraggableComponent, ResizeHandle } from '@/types/draggable-components'
import { useComponentDrag, useComponentResize } from '../hooks'
import ChartRenderer from '@/components/renderers/ChartRenderer.vue'
import TableRenderer from '@/components/renderers/TableRenderer.vue'
import TextRenderer from '@/components/renderers/TextRenderer.vue'
import ImageRenderer from '@/components/renderers/ImageRenderer.vue'
import MetricRenderer from '@/components/renderers/MetricRenderer.vue'

interface Props {
  components: DraggableComponent[]
  selectedComponentId?: string
}

const props = withDefaults(defineProps<Props>(), {
  components: () => [],
  selectedComponentId: undefined
})

const emit = defineEmits<{
  (e: 'add-component', type: string, x: number, y: number): void
  (e: 'move-component', id: string, x: number, y: number): void
  (e: 'resize-component', id: string, width: number, height: number): void
  (e: 'select-component', id?: string): void
  (e: 'delete-component', id: string): void
}>()

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!event.dataTransfer) return
  
  const type = event.dataTransfer.getData('componentType')
  const action = event.dataTransfer.getData('action')
  
  if (type && action === 'new') {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    emit('add-component', type, x, y)
  }
}

const handleMoveComponent = (id: string, x: number, y: number) => {
  emit('move-component', id, x, y)
}

const handleResizeComponent = (id: string, width: number, height: number) => {
  emit('resize-component', id, width, height)
}

const {
  isDragging,
  currentComponentId,
  handleComponentMouseDown,
  handleMouseUp
} = useComponentDrag({
  components: props.components,
  onMoveComponent: handleMoveComponent
})

const {
  isResizing,
  resizeHandle,
  handleResizeStart,
  handleResizeEnd
} = useComponentResize({
  components: props.components,
  onMoveComponent: handleMoveComponent,
  onResizeComponent: handleResizeComponent
})

const handleComponentClick = (event: MouseEvent, id: string) => {
  event.stopPropagation()
  emit('select-component', id)
}

const handleCanvasClick = () => {
  emit('select-component', undefined)
}

const handleDeleteComponent = (id: string) => {
  emit('delete-component', id)
}
</script>

<style scoped lang="less">
.canvas {
  flex: 1;
  background: #fafafa;
  position: relative;
  overflow: auto;
  background-image: 
    linear-gradient(#e8e8e8 1px, transparent 1px),
    linear-gradient(90deg, #e8e8e8 1px, transparent 1px);
  background-size: 20px 20px;
}

.canvas-component {
  position: absolute;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: move;
  user-select: none;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &.selected {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.3);
  }
}

.component-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f5f5f5;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
  cursor: move;
}

.component-title {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.delete-btn {
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  color: #999;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: #ff4d4f;
    color: #fff;
  }
}

.component-content {
  padding: 12px;
  height: calc(100% - 40px);
  overflow: auto;
}

.component-renderer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 14px;
  color: #999;
}

.resize-handles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  pointer-events: auto;
  background: #1890ff;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s;

  .canvas-component.selected &:hover {
    opacity: 1;
  }

  &.n, &.s {
    left: 8px;
    right: 8px;
    height: 6px;
  }

  &.e, &.w {
    top: 8px;
    bottom: 8px;
    width: 6px;
  }

  &.n { top: -3px; cursor: n-resize; }
  &.s { bottom: -3px; cursor: s-resize; }
  &.e { right: -3px; cursor: e-resize; }
  &.w { left: -3px; cursor: w-resize; }
  
  &.ne { top: -3px; right: -3px; width: 8px; height: 8px; cursor: ne-resize; }
  &.nw { top: -3px; left: -3px; width: 8px; height: 8px; cursor: nw-resize; }
  &.se { bottom: -3px; right: -3px; width: 8px; height: 8px; cursor: se-resize; }
  &.sw { bottom: -3px; left: -3px; width: 8px; height: 8px; cursor: sw-resize; }
}
</style>
