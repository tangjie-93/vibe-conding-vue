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
import { ref } from 'vue'
import type { DraggableComponent, ResizeHandle } from '@/types/draggable-components'
import { AVAILABLE_COMPONENTS } from '@/types/draggable-components'
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

const isDragging = ref(false)
const isResizing = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const currentComponentId = ref<string>()
const resizeHandle = ref<ResizeHandle>()

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

const handleComponentMouseDown = (event: MouseEvent, id: string) => {
  if (isResizing.value) return
  
  isDragging.value = true
  currentComponentId.value = id
  
  const component = props.components.find(c => c.id === id)
  if (component) {
    dragOffset.value = {
      x: event.clientX - component.x,
      y: event.clientY - component.y
    }
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleResizeStart = (event: MouseEvent, id: string, handle: ResizeHandle) => {
  isResizing.value = true
  currentComponentId.value = id
  resizeHandle.value = handle
  
  const component = props.components.find(c => c.id === id)
  if (component) {
    emit('select-component', id)
  }
  
  document.addEventListener('mousemove', handleResizeMove)
  document.addEventListener('mouseup', handleResizeEnd)
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !currentComponentId.value) return
  
  const component = props.components.find(c => c.id === currentComponentId.value)
  if (component) {
    const newX = event.clientX - dragOffset.value.x
    const newY = event.clientY - dragOffset.value.y
    emit('move-component', currentComponentId.value, newX, newY)
  }
}

const handleResizeMove = (event: MouseEvent) => {
  if (!isResizing.value || !currentComponentId.value) return
  
  const component = props.components.find(c => c.id === currentComponentId.value)
  if (!component) return
  
  const minSize = AVAILABLE_COMPONENTS.find(c => c.type === component.type)?.minSize
  const minWidth = minSize?.width || 100
  const minHeight = minSize?.height || 80
  
  let newWidth = component.width
  let newHeight = component.height
  
  switch (resizeHandle.value) {
    case 'e':
      newWidth = Math.max(minWidth, event.clientX - component.x)
      break
    case 'w':
      newWidth = Math.max(minWidth, component.width + (component.x - event.clientX))
      if (newWidth !== component.width) {
        emit('move-component', currentComponentId.value, event.clientX, component.y)
      }
      break
    case 's':
      newHeight = Math.max(minHeight, event.clientY - component.y)
      break
    case 'n':
      newHeight = Math.max(minHeight, component.height + (component.y - event.clientY))
      if (newHeight !== component.height) {
        emit('move-component', currentComponentId.value, component.x, event.clientY)
      }
      break
    case 'se':
      newWidth = Math.max(minWidth, event.clientX - component.x)
      newHeight = Math.max(minHeight, event.clientY - component.y)
      break
    case 'sw':
      newWidth = Math.max(minWidth, component.width + (component.x - event.clientX))
      newHeight = Math.max(minHeight, event.clientY - component.y)
      if (newWidth !== component.width) {
        emit('move-component', currentComponentId.value, event.clientX, component.y)
      }
      break
    case 'ne':
      newWidth = Math.max(minWidth, event.clientX - component.x)
      newHeight = Math.max(minHeight, component.height + (component.y - event.clientY))
      if (newHeight !== component.height) {
        emit('move-component', currentComponentId.value, component.x, event.clientY)
      }
      break
    case 'nw':
      newWidth = Math.max(minWidth, component.width + (component.x - event.clientX))
      newHeight = Math.max(minHeight, component.height + (component.y - event.clientY))
      if (newWidth !== component.width) {
        emit('move-component', currentComponentId.value, event.clientX, component.y)
      }
      if (newHeight !== component.height) {
        emit('move-component', currentComponentId.value, component.x, event.clientY)
      }
      break
  }
  
  emit('resize-component', currentComponentId.value, newWidth, newHeight)
}

const handleMouseUp = () => {
  isDragging.value = false
  currentComponentId.value = undefined
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleResizeEnd = () => {
  isResizing.value = false
  currentComponentId.value = undefined
  resizeHandle.value = undefined
  document.removeEventListener('mousemove', handleResizeMove)
  document.removeEventListener('mouseup', handleResizeEnd)
}

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

const ChartRenderer = {
  template: '<div class="component-renderer chart-renderer">📊 图表内容</div>'
}

const TableRenderer = {
  template: '<div class="component-renderer table-renderer">📋 表格内容</div>'
}

const TextRenderer = {
  template: '<div class="component-renderer text-renderer">📝 文本内容</div>'
}

const ImageRenderer = {
  template: '<div class="component-renderer image-renderer">🖼️ 图片内容</div>'
}

const MetricRenderer = {
  template: '<div class="component-renderer metric-renderer">📈 指标卡内容</div>'
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
