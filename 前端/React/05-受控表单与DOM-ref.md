# React：受控表单与 DOM ref

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

受控输入让 value 由 React state 决定，onChange 把用户输入写回源状态；ref 则是保存不会因赋值自动触发渲染的可变引用，适合访问 DOM 或外部实例。不要用 ref 代替需要显示在界面的状态。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { useRef, useState, type FormEvent } from 'react';
export function CommentForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');
  const input = useRef<HTMLInputElement>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText('');
    input.current?.focus();
  }
  return <form onSubmit={submit}>
    <label>评论<input ref={input} value={text}
      onChange={e => setText(e.currentTarget.value)} /></label>
    <button type="submit">发表</button>
  </form>;
}
```

输入改变 state，下一次渲染给 value；提交是用户动作，逻辑放 submit，不放 Effect。清空和聚焦是不同操作：前者写 state，后者操作 DOM ref。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- 受控 value 初值应与实际类型一致，例如空字符串，避免从 undefined 切换造成受控/非受控混用。
- checkbox 使用 checked 与相应 onChange，不把文本框 value 规则硬套过去。
- ref 在挂载前/卸载后可为 null，不能靠非空断言假设永远存在。
- 数字输入读到的常是字符串，提交时需要明确解析、校验和金额单位。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

输入只包含空格时，为什么要在提交入口拒绝，而不只依赖按钮 disabled？

> [!success]- 参考答案
> disabled 是界面反馈，提交函数仍需维护业务不变量；键盘提交、调用路径变化都不应产生空评论。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P19—P23](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=19)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
