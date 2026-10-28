# TS：React 组件与 Hooks 中的类型

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

React＋TS 的重点是状态可能性、props 契约、事件与 ref，而不是给所有表达式加断言。JSX 使用 `.tsx`；TSX 的泛型箭头函数与标签语法可能冲突，可用 `<T,>` 或普通泛型函数声明来消歧。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { useRef, useState } from 'react';
type Task = { id: string; title: string };
type Props = { onAdd: (task: Task) => void };
export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const input = useRef<HTMLInputElement>(null);
  function submit() {
    const value = title.trim();
    if (!value) return;
    onAdd({ id: crypto.randomUUID(), title: value });
    setTitle('');
    input.current?.focus();
  }
  return <>
    <input ref={input} value={title} onChange={e => setTitle(e.currentTarget.value)} />
    <button onClick={submit}>添加</button>
  </>;
}
```

`onChange` 在 JSX 的上下文中能推断事件类型。若把处理器提出来，可明确写 `ChangeEvent<HTMLInputElement>`。取输入元素自身用 `currentTarget` 往往比依赖事件起点 `target` 更清楚。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- `useState([])` 在严格场景可能推断得过窄，需要 `useState<Task[]>([])`；初始 null 则用 `Task | null`。
- React18 课程中的 `forwardRef` 与 React19 的 ref-as-prop 写法要分开看，不能在 React18 示例中混入后者。
- TS 不改变 React 状态快照和不可变更新规则；对类型正确的数组直接 push 仍可能是错误的状态更新方式。
- `ReactNode` 比只允许单个元素的类型更宽，children 契约应按真实渲染需求选择。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为什么空数组状态应写出 Task[]，而标题字符串状态通常不用显式写 string？

> [!success]- 参考答案
> 空数组缺少元素类型证据；空字符串已有明确字符串推断。标注应补充缺失信息，不是重复所有推断结果。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
