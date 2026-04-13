import { ref } from 'vue'
import type { DraggableComponent, ResizeHandle } from '@/types/draggable-components'
import { AVAILABLE_COMPONENTS } from '@/types/draggable-components'

export interface UseComponentResizeOptions {
  components: DraggableComponent[]
  onMoveComponent: (id: string, x: number, y: number) => void
  onResizeComponent: (id: string, width: number, height: number) => void
}

export interface UseComponentResizeReturn {
  isResizing: Ref<boolean>
  currentComponentId: Ref<string | undefined>
  resizeHandle: Ref<ResizeHandle | undefined>
  handleResizeStart: (event: MouseEvent, id: string, handle: ResizeHandle) => void
  handleResizeEnd: () => void
}

export function useComponentResize(options: UseComponentResizeOptions = {}) {
  const { components, onMoveComponent, onResizeComponent } = options

  const isResizing = ref(false)
  const currentComponentId = ref<string>()
  const resizeHandle = ref<ResizeHandle>()

  const handleResizeStart = (event: MouseEvent, id: string, handle: ResizeHandle) => {
    isResizing.value = true
    currentComponentId.value = id
    resizeHandle.value = handle

    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)
  }

  const handleResizeMove = (event: MouseEvent) => {
    if (!isResizing.value || !currentComponentId.value) return

    const component = components.find(c => c.id === currentComponentId.value)
    if (!component) return

    const minSize = AVAILABLE_COMPONENTS.find(c => c.type === component.type)?.minSize
    const minWidth = minSize?.width || 100
    const minHeight = minSize?.height || 80

    let newWidth = component.width
    let newHeight = component.height
    let newX = component.x
    let newY = component.y

    switch (resizeHandle.value) {
      case 'e':
        newWidth = Math.max(minWidth, event.clientX - component.x)
        break
      case 'w':
        newWidth = Math.max(minWidth, component.width + (component.x - event.clientX))
        newX = event.clientX
        break
      case 's':
        newHeight = Math.max(minHeight, event.clientY - component.y)
        break
      case 'n':
        newHeight = Math.max(minHeight, component.height + (component.y - event.clientY))
        newY = event.clientY
        break
      case 'se':
        newWidth = Math.max(minWidth, event.clientX - component.x)
        newHeight = Math.max(minHeight, event.clientY - component.y)
        break
      case 'sw':
        newWidth = Math.max(minWidth, component.width + (component.x - event.clientX))
        newHeight = Math.max(minHeight, event.clientY - component.y)
        newX = event.clientX
        break
      case 'ne':
        newWidth = Math.max(minWidth, event.clientX - component.x)
        newHeight = Math.max(minHeight, component.height + (component.y - event.clientY))
        newY = event.clientY
        break
      case 'nw':
        newWidth = Math.max(minWidth, component.width + (component.x - event.clientX))
        newHeight = Math.max(minHeight, component.height + (component.y - event.clientY))
        newX = event.clientX
        newY = event.clientY
        break
    }

    if (newX !== component.x || newY !== component.y) {
      onMoveComponent?.(currentComponentId.value, newX, newY)
    }

    onResizeComponent?.(currentComponentId.value, newWidth, newHeight)
  }

  const handleResizeEnd = () => {
    isResizing.value = false
    currentComponentId.value = undefined
    resizeHandle.value = undefined
    document.removeEventListener('mousemove', handleResizeMove)
    document.removeEventListener('mouseup', handleResizeEnd)
  }

  return {
    isResizing,
    currentComponentId,
    resizeHandle,
    handleResizeStart,
    handleResizeEnd
  }
}
