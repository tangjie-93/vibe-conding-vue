# Vue Hook 规范

## 命名与存放

- **文件名**: 小驼峰命名法，以 `use` 开头，如 `useClipboard.ts`
- **函数名**: 与文件名保持一致
- **存放位置**:
  - 全局 Hook: `src/hooks/`
  - 业务 Hook: 模块目录下的 `hooks/`

## 类型定义

```typescript
// 入参接口
export interface ClipboardOptions {
    autoParse?: boolean;
    trimCells?: boolean;
}

// 返回值接口
export interface ClipboardData {
    excelData: string[][];
    isLoading: boolean;
}

export interface ClipboardActions {
    readClipboardData: () => Promise<string[][] | null>;
    clearData: () => void;
}

export type UseClipboardReturn = ClipboardData & ClipboardActions;
```

## 内部结构

```typescript
export function useHookName(options: HookOptions = {}) {
    // 1. 解构配置参数
    const { param1 = true, param2 = 10 } = options;
    
    // 2. 定义响应式状态
    const state = ref(initialValue);
    const computedValue = computed(() => { ... });
    
    // 3. 定义方法
    const method1 = () => { ... };
    
    // 4. 生命周期钩子
    onMounted(() => { ... });
    onUnmounted(() => { ... });
    
    // 5. 返回暴露的内容
    return {
        state,
        computedValue,
        method1
    };
}
```
