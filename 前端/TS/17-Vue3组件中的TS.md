# TS：Vue3 组件中的类型关系

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Vue 的运行时响应式与 TS 的静态检查各管一层。`ref<number>(0)` 约束脚本里的值类型，但页面输入仍可能是字符串，网络数据仍可能不符合接口。组件的 props 与 emits 是最值得明确标注的公共边界。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
interface Task { id: number; title: string; done: boolean }
const props = defineProps<{ task: Task }>();
const emit = defineEmits<{ toggle: [id: number] }>();
const saving = ref(false);
const label = computed(() => props.task.done ? '已完成' : '待完成');
</script>

<template>
  <button :disabled="saving" @click="emit('toggle', props.task.id)">
    {{ props.task.title }}：{{ label }}
  </button>
</template>
```

父组件持有状态，子组件读 props、发事件。不能把“TS 允许改 task 内部某属性”解释成推荐修改父状态；单向数据流仍是架构约束。`defineProps/defineEmits` 是 SFC 编译宏，不需要像普通函数那样从 vue 导入。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- 普通 `tsc` 不能完成 Vue 模板的全部类型检查，示例工程使用 `vue-tsc --noEmit`。
- 响应式对象解构与 Vue 版本有关；本文示例保留 `props.task` 访问，避免把 Vue3.5 的编译器特性泛化到所有版本。
- `ref<Task | null>(null)` 要在使用前判空；模板 ref 也通常要处理挂载前与卸载后的 null。
- `reactive<T>` 泛型与深层 ref 解包有边界，不应为了“看起来类型齐全”一律强行传泛型。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

让子组件通知父组件删除任务，该增加什么类型契约？

> [!success]- 参考答案
> 在 emits 中增加 `remove: [id: number]`，点击时 emit('remove', id)，父组件按 id 更新自己的数组。类型与数据流方向一致。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
