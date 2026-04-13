# TypeScript 编码规范

## 类型定义

- **禁止使用 `any` 类型**，使用 `unknown` 替代
- **类型推断优先**，复杂对象显式注解
- 接口命名：`User` 或 `IUser`（可选前缀）
- 接口用于对象类型定义，类型别名用于联合/交叉类型

```typescript
// ❌ 不好
const data: any = fetchData();

// ✅ 好
interface UserData {
    id: string;
    name: string;
}
const data: UserData = fetchData();
```

## 工具类型使用

```typescript
// Partial - 所有属性变为可选
type PartialUser = Partial<User>;

// Pick - 选择部分属性
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - 排除部分属性
type SafeUser = Omit<User, 'password'>;

// Record - 构造对象类型
type UserMap = Record<string, User>;
```

## 错误处理

```typescript
try {
    await fetchData();
} catch (error) {
    console.error('获取数据失败:', error);
    // 或显示用户提示
    message.error('获取数据失败');
}
```
