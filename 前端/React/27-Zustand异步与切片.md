# React：Zustand、异步与切片边界

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Zustand 提供外部 store 和 Hook 订阅方式。组件用 selector 读取需要的部分，action 在 store 中组织修改。API 简洁不代表没有所有权、并发和持久化问题，异步 action 仍要自己管理 loading/error 与过时结果。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
import { create } from 'zustand';
interface CounterState {
  count: number;
  increment: () => void;
  reset: () => void;
}
export const useCounterStore = create<CounterState>()(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
```

组件分别取 `useCounterStore(s => s.count)` 与 `useCounterStore(s => s.increment)`。只需要 action 的组件不必订阅整个对象。set 默认浅合并一层，不会深合并嵌套对象；整对象替换还可能连 action 一起替掉，需明确意图。

### 2. 切片是组织代码，不是自动隔离运行时

把任务、筛选、用户等 slice 函数组合到同一个 store，仍共享同一个状态空间。命名冲突、跨 slice 依赖与初始化顺序要设计。异步函数可以 await 后 set，但不能不考虑连续请求的返回顺序。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

Zustand5 对 selector 返回稳定性的要求需要注意；每次构造新数组/对象的组合选择器可能带来不必要更新或更严重问题，按官方建议选择原始值或使用合适的浅比较工具。不要只把 Redux 的 dispatch 换成 set，而保留所有不必要样板。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

新增任务需要同时改完成数量吗？

> [!success]- 参考答案
> 通常直接从任务派生统计，不维护一份重复数字。状态库改变，单一事实来源原则不变。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P143—P145](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=143)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)
- [Zustand 官方文档源码](https://github.com/pmndrs/zustand/tree/main/docs)

[[前端/React/00-React学习索引|返回学习索引]]
