# Vue3：Router4 参数、嵌套路由与部署

> **版本口径**：Vue3＋TypeScript 主线；旧 Vue2/Options API 保留为迁移对照，不与 Vue3 API 混用。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

路由把 URL 映射到组件层次。嵌套路由不仅是路径更长，还要求父组件中有 RouterView 放子页面。命名路由让导航按业务名定位，query 与 params 则属于不同层的参数。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
import { createRouter, createWebHashHistory } from 'vue-router';
import { defineComponent, h } from 'vue';
const Home = defineComponent({ render: () => h('p', '首页') });
const User = defineComponent({
  props: { id: { type: String, required: true } },
  setup: props => () => h('p', `用户：${props.id}`),
});
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/users/:id', name: 'user', component: User, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});
```

`router.push({ name: 'user', params: { id: '12' }, query: { tab: 'posts' } })` 把 id 填入动态段，tab 放查询串。若选择 path 字符串导航，不要再以为任意 params 都会自动帮你拼接进去。

### 2. 复用组件与参数变化

从 `/users/1` 到 `/users/2` 可能复用同一个 User 实例。数据加载应观察 id 的变化，而不是仅在首次 mounted 时读取。`props: true` 可以减少页面对全局 route 对象的耦合。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

push 增加历史，replace 替换当前项；重定向表达地址规则，不应拿来藏无限导航循环。history 模式的服务器必须为深层前端路径回退入口，同时不要错误吞掉真实静态资源 404。hash 模式的片段不发送给服务器，部署简单但 URL 形态不同。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

刷新一个深层 history 地址失败，而首页正常，应先检查组件还是服务器回退？

> [!success]- 参考答案
> 先看服务器实际返回，通常是前端路由路径未回退入口。开发服务器的便利行为不能保证生产服务器也已配置。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P30—P42](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=30)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)

[[前端/VUE/00-Vue学习索引|返回学习索引]]
