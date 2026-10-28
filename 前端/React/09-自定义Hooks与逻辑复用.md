# React：自定义 Hooks 与逻辑复用

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

自定义 Hook 复用的是状态逻辑，不默认共享同一份状态。每个组件调用一次 useCounter，得到各自的 Hook 状态。Hook 以 use 开头，保持调用顺序稳定；不能在条件、循环或任意事件函数里临时调用。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { useState } from 'react';
export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(current => current + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}
export function TwoCounters() {
  const left = useCounter();
  const right = useCounter(10);
  return <>
    <button onClick={left.increment}>{left.count}</button>
    <button onClick={right.increment}>{right.count}</button>
  </>;
}
```

两次调用占据不同 Hook 槽位，所以点击左边不改右边。若需要共享，必须把状态放共同父组件、Context 或外部 store，而不是以为同名函数天然是单例。

### 2. 抽象边界

优先返回业务能力，如 `tasks/add/remove`，而非把所有 setter 原样暴露。请求 Hook 还应表达 loading/error/data、参数变化、清理和过时结果处理；把 fetch 包进函数并不自动解决这些问题。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

`initial` 只影响 useState 初始化，不是父传值改变就自动重置；示例 reset 捕获当前渲染的 initial，应明确这是否符合预期。共享逻辑不等于共享数据，闭包不等于永久最新值。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

让两个计数器同步，应修改 Hook 名字，还是修改状态的存放位置？

> [!success]- 参考答案
> 修改所有权与共享范围。名字并不决定实例共享，框架根据组件身份和调用次序管理状态。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P33—P34、P36—P37](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=33)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
