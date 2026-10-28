# Vue3：watch 五类源、watchEffect 与取消

> **版本口径**：Vue3＋TypeScript 主线；旧 Vue2/Options API 保留为迁移对照，不与 Vue3 API 混用。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

watch 显式指定“观察什么”，回调可获得新旧值；watchEffect 在同步执行时自动追踪读取的响应式依赖。二者都用于副作用，不代替 computed 的纯派生计算。

| 源 | 典型写法 | 要注意 |
| --- | --- | --- |
| 基本 ref | watch(id, callback) | 传 ref，不传 id.value |
| 对象 ref | watch(user, callback) | 默认关注引用替换，深度需明确 |
| reactive 对象 | watch(state, callback) | 隐式深层，可能成本较大 |
| 对象属性 | watch(() => state.id, callback) | getter 保留追踪路径 |
| 多个源 | watch([id, () => state.query], callback) | 新旧值按源顺序组成数组 |

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
import { ref, watch } from 'vue';
const userId = ref('1');
const name = ref('');
const error = ref('');
watch(userId, async (id, _oldId, onCleanup) => {
  const controller = new AbortController();
  onCleanup(() => controller.abort());
  error.value = '';
  try {
    const response = await fetch(`/api/users/${encodeURIComponent(id)}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('name' in data)
        || typeof data.name !== 'string') throw new Error('结构无效');
    if (!controller.signal.aborted) name.value = data.name;
  } catch (cause) {
    if (!controller.signal.aborted) error.value = cause instanceof Error ? cause.message : '未知错误';
  }
}, { immediate: true });
```

片段放在组件 setup 或相应组合函数。注册清理后，源改变或停止监视会中止旧请求；取消不会被当成红色网络错误。接口为示意契约，运行工程使用本地数据，不依赖此地址存在。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

watchEffect 只自动追踪同步阶段、即第一次 await 前读取的依赖。`deep` 不是快照功能；`flush: 'post'` 影响相对组件更新的时机，不等于等待所有外部任务。只关心某个字段时用精确 getter，避免全对象深度遍历。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

把 id 连续改为 1、2、3，并让第 1 个请求最慢，最终应该显示谁？

> [!success]- 参考答案
> 只允许当前 id=3 的结果提交。取消或身份校验必须覆盖成功、错误和 loading 收尾路径，旧请求不能覆盖新状态。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P17—P22](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=17)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)

[[前端/VUE/00-Vue学习索引|返回学习索引]]
