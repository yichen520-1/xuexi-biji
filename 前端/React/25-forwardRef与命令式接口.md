# React18：forwardRef 与 useImperativeHandle

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

多数交互用 props/state 表达；聚焦、滚动等少量操作可暴露命令式接口。React18 的函数组件通过 forwardRef 接受父 ref，再用 useImperativeHandle 选择暴露哪些能力，避免把全部内部 DOM 实现交给外部。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { forwardRef, useImperativeHandle, useRef } from 'react';
type InputHandle = { focus: () => void };
export const FocusInput = forwardRef<InputHandle, { label: string }>(function FocusInput(props, ref) {
  const input = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({ focus() { input.current?.focus(); } }), []);
  return <label>{props.label}<input ref={input} /></label>;
});
export function Demo() {
  const input = useRef<InputHandle>(null);
  return <><FocusInput ref={input} label="任务" />
    <button onClick={() => input.current?.focus()}>聚焦</button></>;
}
```

父组件只知道 focus 方法，内部以后从 input 改成其他实现时可保持接口。ref 可能为空，只有挂载后才可操作；不要在渲染阶段调用它来改变 DOM。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

**版本单独说明**：React19 可以把 ref 作为 prop 传入函数组件，官方说明 forwardRef 不再是同样的必要前提；本课程与示例固定 React18，因此保留 forwardRef 的协议，不混入 React19 写法。

`useImperativeHandle` 中读取的反应性值需要正确依赖。例子只使用稳定 ref 与不读取状态的方法，空依赖合理；若方法读取当前 props/state，不能照抄空数组造成旧闭包。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

用 ref 暴露“设置整个任务数组”来绕过父组件状态设计，是否合适？

> [!success]- 参考答案
> 通常不合适，业务数据应由明确的所有者和事件回调管理。命令式 ref 保留给必须直接操作的少量能力。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P138—P139](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=138)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)
- [React forwardRef 与版本说明](https://react.dev/reference/react/forwardRef)

[[前端/React/00-React学习索引|返回学习索引]]
