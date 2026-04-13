<template>
  <div class="text-renderer">
    <div
      class="text-content"
      :style="{
        'font-size': textData.fontSize + 'px',
        'color': textData.color,
        'text-align': textData.align,
        'font-weight': textData.bold ? 'bold' : 'normal'
      }"
    >
      {{ textData.content }}
    </div>
  </div>
</template>

<script setup lang="ts" name="textRenderer">
import { computed } from 'vue'

interface TextData {
  content: string
  fontSize?: number
  color?: string
  align?: 'left' | 'center' | 'right'
  bold?: boolean
}

interface Props {
  component?: {
    props?: {
      textData?: Partial<TextData>
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  component: () => ({})
})

const textData = computed<TextData>(() => {
  const data = props.component?.props?.textData
  return {
    content: data?.content || '这是一段文本内容',
    fontSize: data?.fontSize || 14,
    color: data?.color || '#333',
    align: data?.align || 'left',
    bold: data?.bold || false
  }
})
</script>

<style scoped lang="less">
.text-renderer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 4px;

  .text-content {
    line-height: 1.6;
    word-wrap: break-word;
  }
}
</style>
