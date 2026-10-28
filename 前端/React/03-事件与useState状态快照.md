# React：事件、useState 与状态快照

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

一次渲染中的 state 值是那次渲染的快照。调用 setter 是排队请求后续更新，不会把当前闭包里捕获的数值立刻改掉。把它简单叫“异步赋值”不够准确，重点是快照和更新队列。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { useState } from 'react';
export function Counter() {
  const [count, setCount] = useState(0);
  function addThree() {
    setCount(current => current + 1);
    setCount(current => current + 1);
    setCount(current => current + 1);
  }
  return <button onClick={addThree}>{count}</button>;
}
```

三次 updater 按队列依次拿到上一计算结果，所以一次点击加 3。若都写 `setCount(count + 1)`，三次使用的是同一快照的 count，常见结果只加 1。依赖前值时用函数式更新；直接设置确定值时 `setCount(0)` 没问题。

**传处理器**：`onClick={addThree}` 交给 React 事件发生时调用，`onClick={addThree()}` 则在渲染中立即执行，返回值也不是处理器。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- updater 必须纯粹，不能顺便发请求、生成随机业务 id 或修改外部对象；开发检查可能重复调用它来暴露不纯行为。
- 需要 id 时在用户事件中先生成，再把确定的新对象交给纯 updater。
- 批处理减少更新次数，不代表所有来源的更新时机与立即读取 DOM 的策略都一样。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

点击后 setTimeout 再输出 count，为什么可能还是事件发生那一刻的数？

> [!success]- 参考答案
> 回调捕获该次渲染的闭包。需要基于最新状态修改时用 updater；要读外部可变最新值时另行设计 ref 等，不靠删依赖掩盖问题。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P9、P11—P12](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=9)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
