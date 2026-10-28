# React：Router6 嵌套路由与导航

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Router6 把地址匹配与组件层次连接起来。父路由 element 包含 Outlet 才能显示子页面；index 路由表示父路径默认内容，不应再同时给它写 path。Link/NavLink 表达链接导航，useNavigate 适合动作完成后的命令式跳转。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { createBrowserRouter, Link, Outlet } from 'react-router-dom';
function Layout() {
  return <><nav><Link to="/">首页</Link> <Link to="/tasks">任务</Link></nav><Outlet /></>;
}
export const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    { index: true, element: <h1>首页</h1> },
    { path: 'tasks', element: <h1>任务列表</h1> },
    { path: '*', element: <h1>未找到页面</h1> },
  ] },
]);
```

根入口用 RouterProvider 传入该 router，且只建立一套相应路由上下文。子路径 `tasks` 相对父路径解析；路径结构与物理目录不是自动绑定关系。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- React Router6 示例不能混入旧版 Switch 等不兼容 API；本目录固定 6.30.1 核验。
- NavLink 的 active 状态可用于菜单高亮，避免手工维护一份会和 URL 失步的 selectedKey。
- 页面链接优先真实 Link，保留键盘、复制地址等语义；不是所有跳转都写 onClick + navigate。
- 未显示子页面时先检查 Outlet 与路由匹配，而不只检查 import 是否成功。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

父页正常显示导航，地址已变成 /tasks，正文仍为空，最先检查什么？

> [!success]- 参考答案
> 父 element 是否有 Outlet、子 route 是否正确挂在父 children 中，以及路径是否匹配。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P52—P54、P56—P57、P99—P101](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=52)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
