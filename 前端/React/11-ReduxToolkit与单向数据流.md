# React：Redux Toolkit 与单向数据流

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Redux 把共享状态集中到 store，组件 dispatch action 描述发生了什么，reducer 纯粹计算下一状态，选择器读取需要的部分。Redux Toolkit 是官方推荐的现代工具集，减少样板；它与 React 连接仍需 react-redux 的 Provider 与订阅 Hooks。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
const counter = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});
export const { increment } = counter.actions;
export const store = configureStore({ reducer: { counter: counter.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
store.dispatch(increment(2));
console.log(store.getState().counter.value);
```

这里能写 `state.value += ...`，因为 createSlice 的 reducer 由 Immer 管理 draft，并不是普通 React state 可以随意原地修改。也不能在同一 reducer 中既改 draft 又返回互相矛盾的新值。

**组件流程**：Provider 包裹应用 → useSelector 订阅所需值 → 点击处理器 dispatch → reducer 更新 → 相关订阅触发重渲染。不要在组件渲染中无条件 dispatch。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- Redux 不是所有表单草稿的必选存储；先判断共享范围。
- 状态与 action 尽量可序列化，DOM 节点、函数、Promise 不直接塞进 store。
- useSelector 每次返回新对象可能导致额外更新；订阅需要的粒度，必要时用合适的 memoized selector。
- C++ 的全局单例直觉不够：Redux 还定义可追踪的更新协议与订阅，不是任意全局对象。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为什么普通 useReducer 不能照搬这里直接改旧 state 的写法？

> [!success]- 参考答案
> 普通 useReducer 没有自动使用 Immer draft，仍要显式不可变更新。语法相同不代表运行环境相同。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P38—P41、P43](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=38)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
