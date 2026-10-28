# React：环境、JSX 与组件模型

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

React 根据当前 props/state 计算界面描述，再提交必要的 DOM 更新。函数组件是返回可渲染内容的函数，不是一个“构造一次后永远保存局部变量”的对象。组件可能多次执行，渲染期间应保持纯粹，不发请求、不改外部数据、不创建必须清理的订阅。

JSX 是描述界面的语法，会经工具转换；花括号中放表达式，不是任意 if/for 语句。JSX 元素是界面描述，和真实 DOM 节点不是同一个对象。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { createRoot } from 'react-dom/client';
function Greeting({ name }: { name: string }) {
  return <section className="card">
    <h1>你好，{name}</h1>
    <p>{new Date(0).toISOString()}</p>
  </section>;
}
const container = document.getElementById('root');
if (!container) throw new Error('缺少 root 容器');
createRoot(container).render(<Greeting name="小陈" />);
```

入口先找容器，再建立 React 根，根渲染组件树。组件名大写，原生元素小写。相邻元素可用 Fragment 组织，class 写作 className，事件使用 camelCase 名称。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

课程部分使用 Create React App；它已被官方弃用，不作为新练习默认脚手架。本目录示例采用 Vite，但 React 固定 18.3.1 来匹配课程概念，未直接照搬 React19 的新 API。

渲染的“重执行”不等于整个 DOM 都销毁重建。组件身份、key 和协调过程影响状态是否保留；不要以 C++ 普通函数局部变量的生命周期推断 React state。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为什么 `let count = 0` 放在组件函数内，每次重新渲染都重新初始化，而 useState 可以保留状态？

> [!success]- 参考答案
> 普通局部变量属于该次函数调用；React 的状态由框架按组件身份与 Hook 调用顺序保存，并在新渲染时提供当前快照。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P5、P9—P10](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=1)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
