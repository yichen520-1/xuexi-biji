# Vue3＋TS：工程、setup 与编译宏

> **版本口径**：Vue3＋TypeScript 主线；旧 Vue2/Options API 保留为迁移对照，不与 Vue3 API 混用。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Composition API 把同一业务的状态、派生值、事件和清理放在一起；`<script setup>` 是 SFC 编译语法糖，不是一个新的运行时组件系统。组件每建立一个实例，setup 的实例状态会重新创建；普通模块顶层则可能被所有实例共享。

| 层 | 责任 | 常见误判 |
| --- | --- | --- |
| Vue 运行时 | 响应式追踪、组件渲染、更新 | 以为 TS 类型会让普通变量响应式 |
| SFC 编译器 | 转换模板与编译宏 | 在普通 .ts 文件直接调用 defineProps |
| TS/vue-tsc | 检查脚本和模板类型 | 只看 Vite 启动成功就认为类型无误 |

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
const count = ref(0);
const doubled = computed(() => count.value * 2);
function increment(): void { count.value++; }
</script>

<template>
  <button @click="increment">{{ count }} / {{ doubled }}</button>
</template>
```

脚本中 ref 的值通过 `.value` 访问，模板中合适位置自动解包。computed 在脚本读取 count，建立依赖；点击只改源状态，派生值不单独维护。

**工程路径**：入口 main.ts 创建 app → 安装 router/Pinia → 挂载 App.vue → 根组件里的 RouterView 决定当前页面。组件不是被 main.ts 一个个手动 new 出来的。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- setup 中不能用 this 当 Options API 实例。
- 顶层声明普通 `let count = 0` 即使类型为 number，也不会自动响应式。
- 构建工具、类型检查器、开发服务器各自解决不同问题；生产环境不运行 npm run dev。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

同时渲染两个计数组件，要求独立计数；再把 ref 移到模块顶层观察差别。

> [!success]- 参考答案
> setup 内创建 ref 每实例独立；模块共享 ref 可能让两个实例共同修改一份数据。共享必须有意设计，不是无意省略代码。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P10](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=1)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)

[[前端/VUE/00-Vue学习索引|返回学习索引]]
