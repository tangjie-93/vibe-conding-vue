import { ref } from 'vue'
import type { DraggableComponent } from '@/types/draggable-components'

export interface DragOffset {
  x: number
  y: number
}

export interface UseComponentDragOptions {
  components: DraggableComponent[]
  onMoveComponent: (id: string, x: number, y: number) => void
}

export interface UseComponentDragReturn {
  isDragging: Ref<boolean>
  currentComponentId: Ref<string | undefined>
  handleComponentMouseDown: (event: MouseEvent, id: string) => void
  handleMouseUp: () => void
}

export function useComponentDrag(options: UseComponentDragOptions = {}) {
  const { components, onMoveComponent } = options

  const isDragging = ref(false)
  const currentComponentId = ref<string>()
  const dragOffset = ref<DragOffset>({ x: 0, y: 0 })

  const handleComponentMouseDown = (event: MouseEvent, id: string) => {
    isDragging.value = true
    currentComponentId.value = id

    const component = components.find(c => c.id === id)
    if (component) {
      dragOffset.value = {
        x: event.clientX - component.x,
        y: event.clientY - component.y
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.value || !currentComponentId.value) return

    const component = components.find(c => c.id === currentComponentId.value)
    if (component) {
      const newX = event.clientX - dragOffset.value.x
      const newY = event.clientY - dragOffset.value.y
      onMoveComponent?.(currentComponentId.value, newX, newY)
    }
  }

  const handleMouseUp = () => {
    isDragging.value = false
    currentComponentId.value = undefined
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return {
    isDragging,
    currentComponentId,
    handleComponentMouseDown,
    handleMouseUp
  }
}
