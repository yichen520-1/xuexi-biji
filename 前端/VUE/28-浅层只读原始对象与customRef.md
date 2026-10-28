# Vue3：浅层响应式、只读、原始对象与 customRef

> **版本口径**：Vue3＋TypeScript 主线；旧 Vue2/Options API 保留为迁移对照，不与 Vue3 API 混用。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

这些 API 调整“追踪多深、允许谁写、哪些对象交给框架管理”。不要为了性能直觉就把所有状态改成 shallow，再困惑嵌套赋值为什么不更新。

| API | 主要作用 | 典型边界 |
| --- | --- | --- |
| shallowRef | 主要追踪 .value 引用 | 深层对象修改不自动触发同样的深追踪 |
| shallowReactive | 仅根层响应式 | 嵌套值不按深 reactive 自动转换 |
| readonly/shallowReadonly | 深/浅只读代理视图 | 不是复制；源仍可能被所有者更新 |
| toRaw | 临时取得代理背后的原对象 | 不把长期原始引用当另一套写入口 |
| markRaw | 标记对象避免相应代理转换 | 身份比较与嵌套对象仍需谨慎 |
| customRef | 自己控制 track/trigger | 必须正确管理时机与资源清理 |

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
import { customRef, onScopeDispose } from 'vue';
export function useDebouncedRef(initial: string, delay = 300) {
  let value = initial;
  let timer: ReturnType<typeof setTimeout> | undefined;
  onScopeDispose(() => { if (timer !== undefined) clearTimeout(timer); });
  return customRef<string>((track, trigger) => ({
    get() { track(); return value; },
    set(next) {
      if (timer !== undefined) clearTimeout(timer);
      timer = setTimeout(() => { value = next; trigger(); }, delay);
    },
  }));
}
```

该函数在组件 setup/有效 effect scope 内调用。读取时 track 建依赖；写入只重设计时器；延迟结束更新值并 trigger；离开作用域取消待执行任务，避免组件消失后仍触发工作。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

大型外部图表实例可考虑 markRaw/shallowRef，因为它不一定需要所有内部字段都被代理。关键是边界与修改入口，而不是“浅的一定快且适用所有对象”。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

shallowRef 保存 `{ count: 0 }`，只改 `.value.count++` 与替换整个 `.value` 有何区别？

> [!success]- 参考答案
> 前者不依赖深层自动追踪；替换 value 会触发 ref 层的更新。需要时可显式 triggerRef，但应先确认浅层设计是否合适。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P64—P67](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=64)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)

[[前端/VUE/00-Vue学习索引|返回学习索引]]
