# Vue 组件规范

## 组件结构顺序

```vue
<template>
    <!-- 模板内容 -->
</template>

<script setup lang="ts" name="componentName">
// 脚本逻辑
</script>

<style scoped lang="less">
/* 样式内容 */
</style>
```

## Script 部分规范

```typescript
<script setup lang="ts" name="componentName">
// 1. 类型导入
import type { OrderItem } from '@/types/order';

// 2. 依赖导入
import { ref, computed, watch, onMounted } from 'vue';
import { useOrderHook } from './hooks/useOrderHook';

// 3. Props 定义
const props = defineProps<{
    /** 是否显示编辑模态框 */
    editModalVisible: boolean;
    /** 序列号 */
    serialNumber: string;
    /** 是否禁用 */
    disabled?: boolean;
}>();

// 4. Emits 定义
const emit = defineEmits<{
    /** 保存编辑操作 */
    saveEdit: [serialNumber: string];
    /** 取消编辑操作 */
    cancelEdit: [];
    /** 更新编辑模态框显示状态 */
    'update:editModalVisible': [visible: boolean];
}>();

// 5. 响应式状态定义
const localData = ref<OrderItem>({} as OrderItem);
const isSubmitting = ref(false);

// 6. 计算属性
const isValid = computed(() => {
    return localData.value.id && localData.value.name;
});

// 7. 方法定义
const handleSubmit = async () => {
    if (!isValid.value) return;
    isSubmitting.value = true;
    try {
        emit('submit', localData.value);
    } finally {
        isSubmitting.value = false;
    }
};

// 8. 生命周期钩子
onMounted(() => {
    localData.value = { ...props.data };
});

// 9. Watch 监听
watch(() => props.data, (newVal) => {
    localData.value = { ...newVal };
}, { deep: true });
</script>
```

## Template 部分规范

- **模板缩进**: 4 个空格
- **模板拆分**: HTML 超过 50 行需拆分为子组件
- **属性顺序**: 指令 → 自定义指令 → 原生属性 → 事件绑定 → 其他属性

```vue
<!-- 正确示例 -->
<a-button
    v-if="isVisible"
    v-permission="'order:edit'"
    id="submit-btn"
    class="primary-btn"
    :class="{ active: isActive }"
    type="primary"
    :loading="isLoading"
    :disabled="isDisabled"
    @click="handleSubmit"
    @mouseenter="handleMouseEnter"
>
    提交
</a-button>
```

## Style 部分规范（Less 嵌套语法 - 强制）

**必须使用嵌套语法组织样式，禁止平铺 CSS！**

```vue
<style scoped lang="less">
.component {
    padding: 16px;
    background: #fff;

    &__header {
        display: flex;
        justify-content: space-between;

        &--compact {
            padding: 8px;
        }
    }

    &__content {
        margin-top: 12px;

        &:hover {
            background: #f5f5f5;
        }
    }

    @media (max-width: 768px) {
        padding: 12px;

        &__header {
            flex-direction: column;
        }
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>
```

## 组件通信规范

- **Props 向下传递**: 父组件通过 Props 向子组件传递数据
- **Events 向上传递**: 子组件通过 Events 向父组件传递消息
- **兄弟组件通信**: 通过父组件中转或使用 Event Bus
- **深层嵌套**: 使用 Provide/Inject
- **全局状态**: 使用 Pinia

## 组件代码质量要求

- **单一职责**: 一个组件只负责一个功能
- **可复用性**: 可复用逻辑抽离为 Hook 或组件
- **可维护性**: 组件代码行数控制在 300 行以内
- **逻辑拆分**: 超过 100 行逻辑拆分为 Hook
- **模板拆分**: 超过 50 行 HTML 拆分为子组件
