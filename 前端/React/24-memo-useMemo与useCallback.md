# React：memo、useMemo 与 useCallback

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

memo 尝试跳过 props 未变的组件渲染；useMemo 缓存某次计算结果；useCallback 缓存函数引用。它们是性能手段，不是正确性补丁。先确保状态与 Effect 设计正确，再测量是否真的存在昂贵计算或无意义重渲染。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { memo, useCallback, useMemo, useState } from 'react';
const Row = memo(function Row({ id, onPick }: { id: string; onPick: (id: string) => void }) {
  return <button onClick={() => onPick(id)}>{id}</button>;
});
export function SearchList({ ids }: { ids: readonly string[] }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const visible = useMemo(() => ids.filter(id => id.includes(query)), [ids, query]);
  const onPick = useCallback((id: string) => setSelected(id), []);
  return <><input value={query} onChange={e => setQuery(e.currentTarget.value)} />
    <p>{selected}</p>{visible.map(id => <Row key={id} id={id} onPick={onPick} />)}</>;
}
```

例子用于区分三个工具，实际小数组 filter 不一定值得缓存。依赖变更时仍会重算；父级每次创建新 ids 数组，也可能让 memo 失效。正确优化必须看整个引用链。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- memo 不阻止组件自身 state 与所订阅 Context 引发的渲染。
- 自定义 props 比较不能忽略函数，否则闭包可能保留旧状态；比较本身也有成本。
- 空依赖不是“最高性能模式”，而是承诺回调不需要其他反应性值。
- 缓存可以被框架丢弃，业务正确性不能依赖“某个 useMemo 永远只执行一次”。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

只有 `const fullName = first + last`，是否应该立即加 useMemo？

> [!success]- 参考答案
> 通常不用。先避免多余状态与 Effect；简单计算的缓存维护成本往往高于收益。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P134—P137](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=134)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
