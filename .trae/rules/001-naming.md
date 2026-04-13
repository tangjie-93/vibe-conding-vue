# 命名规范

## 变量命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量 | 小驼峰 (camelCase) | `userName`, `orderList` |
| 常量 | 全大写下划线 | `MAX_LENGTH`, `API_BASE_URL` |
| 布尔值 | is/has/can 开头 | `isActive`, `hasPermission`, `canEdit` |
| 函数 | 动词开头 | `getUser()`, `calculateTotal()` |
| 类/接口 | 大驼峰 (PascalCase) | `UserService`, `IUser` |
| 私有方法 | `_` 前缀 | `_internalMethod()` |

## 文件命名

| 文件类型 | 命名规范 | 示例 |
|---------|---------|------|
| 组件文件 | 大驼峰 (PascalCase) | `UserCard.vue`, `OrderList.vue` |
| Hook 文件 | 小驼峰 + use 前缀 | `useUser.ts`, `useOrderHook.ts` |
| 工具文件 | 小驼峰 | `dateUtil.ts`, `httpClient.ts` |
| 类型文件 | 小驼峰 | `user.ts`, `order.ts` |
| 样式文件 | 小驼峰 | `global.less`, `variables.less` |
| 配置文件 | 小驼峰 | `defaultSettings.ts` |
