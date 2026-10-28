# Vue3：Teleport、Suspense 与应用级 API

> **版本口径**：Vue3＋TypeScript 主线；旧 Vue2/Options API 保留为迁移对照，不与 Vue3 API 混用。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Teleport 改变部分 DOM 实际挂载的位置，但不把组件的逻辑父子关系也搬走；props、事件和注入仍按组件树工作。它适合模态框等需要离开局部 CSS 堆叠上下文的内容。

Suspense 组织异步依赖的默认内容与 fallback，但仍是实验性功能；不能把所有请求都当成它会自动接管，也不能无条件把“加载中”逻辑全部删掉。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```vue
<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);
</script>
<template>
  <button @click="open = true">打开</button>
  <Teleport to="body">
    <div v-if="open" role="dialog" aria-modal="true" aria-label="学习提示">
      <p>逻辑上仍属于当前组件。</p>
      <button @click="open = false">关闭</button>
    </div>
  </Teleport>
</template>
```

这是传送与状态关系的最小片段，不是完整可访问模态框。实际还要处理焦点进入/恢复、键盘关闭、背景不可交互等；Teleport 本身不自动实现这些交互。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- Vue2 一些全局 API 移到 app 对象，如 app.component、app.directive、app.use，作用域更清楚。
- Vue3 不支持照搬 Vue2 实例事件总线 API；事件通信需选组件事件、外部总线或状态机制。
- 多根组件的 attrs 透传目标需明确，不能假定所有属性自动落到“唯一根”上。
- 迁移不要求把所有 Options API 改为 Composition API；先保持可验证的行为。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

弹窗传送到 body 后，是否还可以通过 inject 得到逻辑祖先提供的数据？

> [!success]- 参考答案
> 可以。Teleport 主要调整渲染 DOM 位置，不改变这条组件依赖关系。不要把 DOM 树与组件树混成一棵树。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P68—P71](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=68)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)

[[前端/VUE/00-Vue学习索引|返回学习索引]]
