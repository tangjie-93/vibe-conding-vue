export interface ComponentDefinition {
  type: string
  name: string
  icon: string
  defaultWidth?: number
  defaultHeight?: number
  minSize?: {
    width: number
    height: number
  }
}

export interface DraggableComponent {
  id: string
  type: string
  name: string
  x: number
  y: number
  width: number
  height: number
  props?: Record<string, any>
}

export interface CanvasState {
  components: DraggableComponent[]
  selectedComponentId?: string
}

export interface DragInfo {
  type: 'new' | 'move' | 'resize'
  componentId?: string
  componentType?: string
  startX: number
  startY: number
  initialX?: number
  initialY?: number
  initialWidth?: number
  initialHeight?: number
  resizeHandle?: ResizeHandle
}

export type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

export const AVAILABLE_COMPONENTS: ComponentDefinition[] = [
  {
    type: 'chart',
    name: '图表',
    icon: '📊',
    defaultWidth: 400,
    defaultHeight: 300,
    minSize: { width: 200, height: 150 }
  },
  {
    type: 'table',
    name: '表格',
    icon: '📋',
    defaultWidth: 500,
    defaultHeight: 300,
    minSize: { width: 300, height: 200 }
  },
  {
    type: 'text',
    name: '文本',
    icon: '📝',
    defaultWidth: 300,
    defaultHeight: 100,
    minSize: { width: 150, height: 50 }
  },
  {
    type: 'image',
    name: '图片',
    icon: '🖼️',
    defaultWidth: 300,
    defaultHeight: 200,
    minSize: { width: 100, height: 100 }
  },
  {
    type: 'metric',
    name: '指标卡',
    icon: '📈',
    defaultWidth: 200,
    defaultHeight: 120,
    minSize: { width: 150, height: 80 }
  }
]
