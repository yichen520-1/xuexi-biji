# Vue3＋TS：综合任务板与验收

> **版本口径**：Vue3＋TypeScript 主线；旧 Vue2/Options API 保留为迁移对照，不与 Vue3 API 混用。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

综合项目的目的不是把 API 摆满，而是建立清晰的数据流：输入事件 → 业务 action → 源状态 → computed 派生 → 组件渲染。路由只管理页面位置，Pinia 管跨页面任务，表单草稿留在组件本地，TS 描述任务和组件契约。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

完整可运行工程见 `示例/vue3-ts-demo`。入口 main.ts 安装 Pinia 与 Router；store 管任务增删改；TaskList.vue 管展示和发事件；Stats.vue 复用同一份状态显示统计；App.vue 负责导航。

```ts
export interface Task { id: string; title: string; done: boolean }
export function makeTask(title: string): Task {
  const normalized = title.trim();
  if (!normalized) throw new Error('标题不能为空');
  return { id: crypto.randomUUID(), title: normalized, done: false };
}
```

**添加一项的完整过程**：组件读取草稿 → trim 校验 → action 生成稳定 id → 写入任务数组 → computed 重新得到完成数量 → 模板更新 → 清空草稿。不能用标题作 id，同名任务也应能独立操作。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

| 决策 | 本工程做法 | 为什么 |
| --- | --- | --- |
| 是否依赖课程接口 | 不依赖 | 课程服务可能失效，离线状态也可练习 |
| 表单草稿放哪 | 组件本地 | 尚未提交，不是全局业务事实 |
| 完成统计 | computed | 从任务派生，避免重复维护 |
| 页面刷新保存吗 | 不默认持久化 | 避免把内存状态误说成自动存储 |

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

按以下顺序验收：添加两个同名任务 → 完成其中一条 → 切统计页 → 返回列表 → 删除另一条 → 检查总数与完成数 → 刷新页面观察内存重置。

> [!success]- 参考答案
> 导航期间 Pinia 状态保留；默认刷新后回到初始化数据。若要持久化，应额外设计存储格式、版本迁移和运行时数据校验，而不是声称 Pinia 自动实现了它。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P3、P10、P16、P24—P25、P29、P31、P45、P48、P51、P53、P60](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=3)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)

[[前端/VUE/00-Vue学习索引|返回学习索引]]
