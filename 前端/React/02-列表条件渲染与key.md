# React：列表、条件渲染与稳定 key

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

数组 map 把数据变成元素，filter 决定显示哪些，key 帮 React 在同级列表中识别原来的哪一项。key 的核心是稳定身份，不能把数组位置与业务身份混为一谈。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
type Task = { id: string; title: string; done: boolean };
export function TaskList({ tasks }: { tasks: readonly Task[] }) {
  const pending = tasks.filter(task => !task.done);
  return <section>
    {pending.length === 0 ? <p>没有待办</p> :
      <ul>{pending.map(task => <li key={task.id}>{task.title}</li>)}</ul>}
  </section>;
}
```

每次渲染从 props 推导 pending；不额外存一份过滤结果。用明确三元表达式处理数量为零，比 `count && <List />` 更稳妥，因为数值 0 自身可被渲染出来。

### 2. 为什么下标会错

若一行内有未提交输入，删除第一项后，下标 key 会让原来第二个位置的身份被重新解释，输入状态可能跟着位置走。用持久 id 才让状态跟随数据。随机数每次都变同样不行，会强迫重建。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- key 只在同级比较，不要求整个应用全局唯一。
- key 不会作为普通 prop 自动传到子组件；需要 id 仍要显式传。
- map 用花括号函数体时要写 return，否则得到一组 undefined。
- 排序会改变数组；来自 state/props 的数组先复制再 sort，不能在渲染中原地改源数据。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

新增、删除和排序都支持的评论列表，用标题、下标还是数据库 id 作 key？

> [!success]- 参考答案
> 稳定且唯一的记录 id。标题可重复，下标随位置变化，渲染时临时随机生成的值不稳定。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P6—P8、P13—P14、P18](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=6)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
