# Vue3：Pinia 状态、action 与 storeToRefs

> **版本口径**：Vue3＋TypeScript 主线；旧 Vue2/Options API 保留为迁移对照，不与 Vue3 API 混用。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Pinia 统一共享状态及修改逻辑。state 是源，getter 是派生值，action 是业务动作；组合式 store 可用 ref/computed/函数分别组织。它不是自动持久化工具，刷新后要恢复的数据需你设计存储与验证策略。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
import { computed, ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubled = computed(() => count.value * 2);
  function increment(): void { count.value++; }
  return { count, doubled, increment };
});
// 组件 setup 中（app 已安装 createPinia 后）
const store = useCounterStore();
const { count, doubled } = storeToRefs(store);
const { increment } = store;
```

先在入口创建并安装 Pinia，再在组件/合适上下文中使用 store。直接解构 `store.count` 常得到普通值；storeToRefs 为状态和 getter 建立关联 ref，action 不靠它转换。

### 2. 修改与订阅

可直接改状态、用 `$patch` 对象或函数批量修改，也可把多步业务集中到 action。`$subscribe` 适合观察修改与保存快照，需明确订阅生命周期及持久化字段；不要把 token、用户隐私等所有状态无差别写入公开示例或日志。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- 组合式 store 应返回需要由 Pinia 管理的状态；把状态藏在未返回闭包里会影响工具和 SSR 等行为。
- 多 store 组合需避免初始化时互相读取造成循环。
- 本地表单输入不必全进全局 store；跨页面共享的任务集合更适合。
- action 是业务入口，不意味着所有直接赋值都被框架禁止；这是团队组织约定与 API 能力的区别。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

完成数量依赖任务数组，应存一个独立数字还是 getter？

> [!success]- 参考答案
> 通常用 getter/computed，避免两份可写状态不同步。只有真实外部统计与本地任务不等价时才另建状态。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P43—P51](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=43)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)

[[前端/VUE/00-Vue学习索引|返回学习索引]]
