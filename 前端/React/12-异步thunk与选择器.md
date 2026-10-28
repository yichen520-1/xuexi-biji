# React：异步 thunk、请求状态与选择器

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

reducer 不负责发网络请求。异步 thunk 把请求放在 reducer 外，按 pending/fulfilled/rejected 等 action 把过程反馈给状态层。状态层仍要表达 loading、错误、当前请求身份，避免旧响应覆盖新查询。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
import { createAsyncThunk } from '@reduxjs/toolkit';
interface User { id: number; name: string }
export const loadUser = createAsyncThunk<User, string>(
  'users/load',
  async (id, { signal }) => {
    const response = await fetch(`/api/users/${encodeURIComponent(id)}`, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('id' in data)
      || typeof data.id !== 'number' || !('name' in data)
      || typeof data.name !== 'string') throw new Error('用户结构错误');
    return { id: data.id, name: data.name };
  },
);
```

在 slice 的 extraReducers 中处理三种生命周期。若同一位置可连续发请求，把 `action.meta.requestId` 存为当前身份，只有匹配的 fulfilled/rejected 可以提交结果；取消与失败应按需要区分。

**调用方等结果**：createAsyncThunk dispatch 返回的 Promise 与普通“失败就 reject”的直觉不同。需要在组件 try/catch 中得到原始成功值或失败时，可使用返回任务的 `.unwrap()`，不要误以为直接 await 就总按业务异常抛出。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

选择器从 RootState 推导展示数据。简单值直接取，昂贵派生或需稳定引用的计算再考虑 memoized selector。selector 不改状态、不请求网络、不生成随机 id。

课程接口地址与返回结构可能随时间变化；示例表达请求契约，实际工程用本地数据验证 Redux 流程，不声称课程后台仍在线。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

用户快速点开 A 再点 B，A 最后回来，应由哪条规则阻止覆盖？

> [!success]- 参考答案
> 请求身份或取消逻辑；仅设置一个 loading 布尔值不足以区分结果属于哪个请求。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P42—P43、P65、P91—P93](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=42)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
