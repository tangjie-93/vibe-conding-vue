<template>
  <div class="image-renderer">
    <div class="image-header">
      <h4 class="image-title">{{ imageData.title }}</h4>
    </div>
    <div class="image-body">
      <div
        class="image-placeholder"
        :style="{ 'aspect-ratio': imageData.aspectRatio || '4/3' }"
      >
        <img
          v-if="imageData.src"
          :src="imageData.src"
          :alt="imageData.alt"
          class="image-content"
          @error="handleImageError"
        />
        <div v-else class="image-fallback">
          <span class="image-icon">🖼️</span>
          <span class="image-text">{{ imageData.alt || '图片' }}</span>
        </div>
      </div>
      <p v-if="imageData.description" class="image-description">
        {{ imageData.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts" name="imageRenderer">
import { computed, ref } from 'vue'

interface ImageData {
  title: string
  src?: string
  alt: string
  description?: string
  aspectRatio?: string
}

interface Props {
  component?: {
    props?: {
      imageData?: Partial<ImageData>
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  component: () => ({})
})

const hasError = ref(false)

const imageData = computed<ImageData>(() => {
  const data = props.component?.props?.imageData
  return {
    title: data?.title || '图片标题',
    src: data?.src,
    alt: data?.alt || '图片',
    description: data?.description,
    aspectRatio: data?.aspectRatio || '4/3'
  }
})

const handleImageError = () => {
  hasError.value = true
}
</script>

<style scoped lang="less">
.image-renderer {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 4px;

  .image-header {
    margin-bottom: 12px;

    .image-title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #333;
    }
  }

  .image-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 4px;
    overflow: hidden;

    .image-content {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-fallback {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;

      .image-icon {
        font-size: 48px;
        opacity: 0.5;
      }

      .image-text {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .image-description {
    margin: 12px 0 0 0;
    padding: 8px 12px;
    background: #fafafa;
    border-radius: 4px;
    font-size: 13px;
    color: #666;
    line-height: 1.5;
  }
}
</style>
