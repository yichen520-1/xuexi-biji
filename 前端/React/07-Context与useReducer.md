# React：Context、useReducer 与更新范围

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Context 传递某个组件子树的值，useReducer 组织复杂状态的纯更新规则；它们可组合，但不是自动变成完整 Redux。Context value 变化时，读取该 Context 的消费者可能重新渲染，memo 不会取消 Context 订阅。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
type Action = { type: 'add'; step: number } | { type: 'reset' };
function reducer(state: number, action: Action): number {
  return action.type === 'add' ? state + action.step : 0;
}
const CountContext = createContext<number | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);
export function CounterProvider({ children }: { children: ReactNode }) {
  const [count, dispatch] = useReducer(reducer, 0);
  return <CountContext.Provider value={count}>
    <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
  </CountContext.Provider>;
}
export function CountLabel() {
  const count = useContext(CountContext);
  if (count === null) throw new Error('缺少 CounterProvider');
  return <p>{count}</p>;
}
```

状态和 dispatch 分开后，只需要 dispatch 的消费者不必因为 CountContext 的数字变化而订阅那个值。reducer 根据输入返回下一状态，不访问网络、不修改外部对象。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- 默认值只在上方没有对应 Provider 时使用，不是 Provider value 为 undefined 时自动替换。
- Provider 的作用域由组件树决定，不是文件 import 层级。
- reducer 中直接改变旧对象仍是错误；与 Redux Toolkit 的 Immer 写法不同，普通 useReducer 不自动提供 draft。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为什么把登录用户、鼠标位置、整个任务列表都塞进同一个 Context 对象可能不合适？

> [!success]- 参考答案
> 它们更新频率和订阅范围不同，任一值变化可能影响不相关消费者。按实际职责拆分，而不是提前套满缓存工具。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P29、P133](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=29)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
