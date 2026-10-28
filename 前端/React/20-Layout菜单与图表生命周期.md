# React：Layout、菜单高亮与图表生命周期

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

布局组件维持导航和公共框架，Outlet 展示子页面。菜单选中状态尽量由当前路由推导，避免另存 selectedKey 后与浏览器前进后退失步。用户信息是可共享业务状态，图表实例则是可释放的外部资源。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { NavLink, Outlet } from 'react-router-dom';
export function AdminLayout() {
  return <div>
    <nav aria-label="后台导航">
      <NavLink to="/admin" end>概览</NavLink>
      <NavLink to="/admin/articles">文章</NavLink>
    </nav>
    <main><Outlet /></main>
  </div>;
}
```

end 控制概览链接是否只在精确路径激活。实际 UI 库菜单可以从路由匹配结果得到选中项，不靠点击时单独记一份状态。

### 2. 图表与 React 的分工

图表库可能自行管理 canvas/DOM。用 ref 保存容器与实例，Effect 中初始化；数据变化调用实例的更新 API；卸载清理 resize 监听并 dispose 实例。不要每次渲染都初始化，也不要保留无用全局实例。

若容器因侧栏折叠或标签切换改变大小，光监听 window.resize 可能不够，可按需求观察容器尺寸。把实例创建和数据更新拆清楚，避免把一次数据改变变成整个图表销毁重建。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- 组件渲染应保持纯粹；第三方实例创建属于外部同步过程。
- ref 不是全局单例，每个组件实例要有自己的资源所有权。
- StrictMode 暴露重复初始化时，检查 setup/cleanup 是否对称，不直接关掉检查。
- 图表 tooltip/富文本内容同样可能涉及不可信输入，不绕开内容边界。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

进入概览、离开、再进入，页面出现多个 resize 回调，哪一步缺失？

> [!success]- 参考答案
> 清理监听或实例释放不对称。每次建立外部资源都必须有对应解除路径。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P98—P107](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=98)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
