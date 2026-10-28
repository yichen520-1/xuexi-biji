# React＋TS：组件、事件、children 与 Hooks

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

TS 为组件输入、回调载荷、状态可能性和 DOM ref 加上契约，但不改变 React 的渲染模型。标注应帮助表达真实边界，不能把所有 null 用 `!` 去掉，或用 React.FC 取代对 props 设计的思考。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
type ButtonProps = ComponentPropsWithoutRef<'button'> & { children: ReactNode };
export function Button({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}
type User = { id: number; name: string };
export function UserPanel() {
  const [user, setUser] = useState<User | null>(null);
  return <Button onClick={() => setUser({ id: 1, name: '小陈' })}>
    {user ? user.name : '加载示例用户'}
  </Button>;
}
```

使用原生 button 的 props 类型能保留 disabled、事件、aria 等能力；不是只收一个 onClick 后丢掉所有原生语义。状态 `User | null` 显式表示尚未存在，不需要伪造一个空用户。

| 情形 | 类型策略 |
| --- | --- |
| 初值为字符串/数字 | 通常让 useState 推断 |
| 空数组 | 提供 `Task[]` 等元素类型 |
| 初值为 null | 写出真实联合 |
| 回调 prop | 明确输入载荷和返回契约 |
| 多种可渲染 children | 常用 ReactNode，按需要收窄 |

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

类型在运行时会被擦除；从服务器获取 User 仍需结构校验。事件处理器在 JSX 中可由上下文推断，单独提取时再明确标注。泛型组件设计不要比业务需要更复杂。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为什么把 user 初始化为 `{ id: 0, name: '' }` 不总能替代 null？

> [!success]- 参考答案
> 它可能把“尚未加载”和“确实有空名字用户”混在一起，让界面失去真实状态。用类型表达可能性，比隐藏它更清楚。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P146—P153](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=146)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
