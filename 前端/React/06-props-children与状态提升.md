# React：props、children 与状态提升

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

props 是输入，回调 prop 是子组件通知父组件的方式，children 是调用方提供的可渲染内容。两个兄弟需要共享状态时，通常把状态提升到最近共同祖先，而不是让它们互相查询 DOM。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { useState, type ReactNode } from 'react';
function Panel({ children }: { children: ReactNode }) {
  return <section className="panel">{children}</section>;
}
function StepButton({ onStep }: { onStep: (step: number) => void }) {
  return <button onClick={() => onStep(1)}>增加</button>;
}
export function Dashboard() {
  const [count, setCount] = useState(0);
  return <Panel>
    <p>{count}</p>
    <StepButton onStep={step => setCount(current => current + step)} />
  </Panel>;
}
```

Dashboard 是唯一状态所有者，子组件只表达增加多少的意图。`onStep` 是普通函数 prop，命名习惯有意义，但不会自动成为 DOM 冒泡机制。

### 2. 提升到哪里才合适

只让需要共享的最近范围持有状态。提到整个应用顶层虽然能访问，却会增大耦合；过深层透传明显繁琐时再考虑 Context 或状态库。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

不要把 props 复制进 state 却不设计同步规则；“初始值”与“始终受父控制的当前值”是两种不同契约。也不要修改 props 对象，即使 TS 的浅只读规则没有覆盖嵌套写入，数据流约束仍存在。

与 Vue 对比：Vue 常用 emits，React 常把回调函数直接当 prop；二者都可表达单向输入与显式通知，语法不同但所有权应清楚。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

筛选按钮与任务列表要共享当前筛选条件，应该各保存一份再互发事件吗？

> [!success]- 参考答案
> 通常放共同父组件，分别传当前值和修改回调，避免两份状态互相追赶。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P24—P28](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=24)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
