# React＋TS：移动资讯 API、路由与无限加载

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

移动资讯项目连接频道、文章列表、详情和分页请求。无限加载的核心不是一个滚动事件，而是明确“是否还有更多、当前是否在请求、游标属于哪个频道、旧结果能否提交”。UI 组件库只是交互外壳。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
interface Article { id: string; title: string }
interface Page { items: Article[]; nextCursor: string | null }
export function mergeArticles(current: readonly Article[], incoming: readonly Article[]): Article[] {
  const seen = new Set(current.map(article => article.id));
  const result = [...current];
  for (const article of incoming) {
    if (!seen.has(article.id)) { seen.add(article.id); result.push(article); }
  }
  return result;
}
export function hasMore(page: Page): boolean { return page.nextCursor !== null; }
```

游标的含义由真实 API 定义，不擅自假设它一定是页码或时间。切换频道时重置该频道对应的游标/列表或命中独立缓存，取消旧请求；请求中的触底事件不应再启动同一页。

### 2. 请求层与 Hook 的分工

请求层验证 HTTP 与返回结构，业务 API 描述频道/文章契约，Hook 维护当前查询生命周期，组件负责 loading/error/empty/list。把这些层混在一个 onScroll 中，会让重试和频道切换越来越难修。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- `axios.get<Response>()` 不校验 JSON，泛型不是解析器。
- URL id 需要验证，详情不存在与网络错误应区分。
- 合并时去重防止相邻页重叠，但不能掩盖错误游标一直请求同一页。
- 加载到末尾要停止请求；失败保留已有列表并提供重试，不清成“暂无内容”。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

A 频道第一页未返回时切到 B，随后 A 返回，应该追加到 B 吗？

> [!success]- 参考答案
> 不应。响应应绑定查询身份（频道＋游标/请求号），不能只因为“Promise 完成了”就更新当前列表。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P154—P165](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=154)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
