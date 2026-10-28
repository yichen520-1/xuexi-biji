# ref、reactive 与组合式 API

> **当前主线**：用户指定的 Vue3＋TS 71 集课程；本篇为主题对照与自主讲解，旧 Vue2 演示保留为迁移参考。
> 示例版本：Vue 3.5.13；版本固定用于复现，不表示最新版本。

---

<span style="background-color:rgb(255, 249, 227)">一：学习目标与使用场景</span>

理解响应式代理、解构陷阱和组合函数的基本边界。

---

<span style="background-color:rgb(255, 249, 227)">二：先把原理讲清楚</span>

ref 可以包装原始值和对象，脚本通过 value 访问；reactive 主要把对象包装成响应式代理。Vue 3 追踪的是代理上的访问与修改，不是任意同名的普通变量。保持响应式引用链比记住大量 API 名称更重要。

对 reactive 对象解构普通数值字段，会把当前数值复制到新变量里，后续修改原对象不会自动改变这份副本。toRefs(state) 可以把每个属性转换成与原属性关联的 ref；需要保持字段联动时可使用它。

ref 包装对象时，替换整个 .value 是常用做法。reactive 则通常保持代理对象本身稳定，更新属性或使用 Object.assign。若把变量重新指向一个全新普通对象，原来依赖的代理关系可能断开。

组合函数是把一组相关响应式逻辑组织成可复用函数，常以 use 开头。例如 useCounter 返回 count、increment，让多个组件复用行为。函数内创建状态代表每次调用各自独立；模块顶层创建状态则是共享状态，二者要有意选择。

---

<span style="background-color:rgb(255, 249, 227)">三：运行方式</span>

直接打开同目录下的 [配套演示](示例/13-ref-reactive与组合式API.html)。运行库放在示例/vendor，已本地保存，普通示例不需要联网。Obsidian 的代码块用于阅读，不会自动执行 HTML。也可以把下面整段内容保存到示例目录中的新 HTML 文件；改变位置时需要相应调整运行库相对路径。

---

<span style="background-color:rgb(255, 249, 227)">四：完整代码演示</span>

```html
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ref、reactive 与组合式 API</title>
<style>
body{font-family:system-ui,sans-serif;line-height:1.7;margin:2rem auto;padding:0 1rem;max-width:58rem;color:#202124;background:#fff}button,input,select{font:inherit;padding:.4rem;margin:.3rem}button{cursor:pointer}label{display:inline-block;margin:.3rem}section{border:1px solid #aaa;padding:1rem;margin:1rem 0}li{margin:.4rem 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #b45309}.active{background:#166534;color:#fff}nav{display:flex;gap:1rem;flex-wrap:wrap}
</style>
</head>
<body>
<div id="app">
<h1>代理与解构</h1><p>state.count：{{ state.count }}</p><p>普通快照：{{ snapshot }}</p><p>toRefs 关联：{{ count }}</p><button @click="state.count++">增加</button>
</div>
<script src="./vendor/vue-3.5.13.js"></script>
<script>
const {createApp, reactive, toRefs} = Vue;
createApp({setup(){
  const state = reactive({count:0});
  const snapshot = state.count;
  const {count} = toRefs(state);
  return {state,snapshot,count};
}}).mount('#app');
</script>
</body>
</html>
```

---

<span style="background-color:rgb(255, 249, 227)">五：按执行顺序解释</span>

1. state 是代理，访问 state.count 时 Vue 可以收集依赖。
2. snapshot 是取值时的数字 0，它不会因为来源变化而自动变化。
3. toRefs 返回的 count ref 仍然指向 state.count，读写会联动。
4. 模板中解包 count，点击后它与 state.count 一起改变，snapshot 保持 0。

---

<span style="background-color:rgb(255, 249, 227)">六：预期结果与验证步骤</span>

点击三次后，state.count 和 toRefs 关联都显示 3，普通快照仍显示 0。

操作时同时打开浏览器开发者工具：Elements 查看模板生成的节点，Console 查看是否有语法错误或 Vue 警告。若页面显示双大括号原文，优先检查运行库路径、脚本加载顺序和挂载目标。

---

<span style="background-color:rgb(255, 249, 227)">七：图解</span>

```mermaid
flowchart TD
  原始对象 --> reactive代理 --> 访问追踪 --> 修改触发 --> 依赖更新
```

---

<span style="background-color:rgb(255, 249, 227)">八：注意事项与易错点</span>

- reactive 不能直接包装数字并达到预期，应使用 ref。
- 不要把所有对象解构都当成错误；关键是解构结果是否仍然是 ref 或其他响应式引用。
- Vue 2.7 提供部分 Composition API，但仍保留 Vue 2 响应式限制，不等于完整 Vue 3。

---

<span style="background-color:rgb(255, 249, 227)">九：动手练习</span>

写 useCounter，让两个按钮拥有各自独立计数。

<details>
<summary>参考答案与思路（先自己尝试）</summary>

```js
function useCounter(){
  const count = Vue.ref(0);
  const increment = () => count.value++;
  return {count, increment};
}
// setup 内分别调用两次并返回结果。
```

练习片段需要放入本篇已有的模板或 setup 对应位置，不是另一份独立文件。修改后重做上面的验证步骤，并检查空值、重复操作和恢复状态。

</details>

---

<span style="background-color:rgb(255, 249, 227)">十：复习问题</span>

1. 本篇中哪些数据是真正的源状态，哪些是推导结果或 DOM 表示？
2. 如果页面没有按预期更新，应该先检查运行环境、API 版本还是依赖关系？结合示例说明。
3. 能否不用背代码，用自己的话描述图中每一步的输入和输出？



---

<span style="background-color:rgb(255, 249, 227)">十一：相关笔记</span>

[[前端/VUE/12-slot插槽与作用域插槽|上一篇：slot 插槽与作用域插槽]] · [[前端/VUE/14-Vue2与OptionsAPI完整示例|下一篇：Vue 2 与 Options API 完整示例]] · [[前端/VUE/00-Vue学习索引]]

---

<span style="background-color:rgb(255, 249, 227)">十二：官方参考与来源边界</span>

- [Vue 3 中文指南](https://cn.vuejs.org/guide/introduction.html)
- [Vue 2 中文指南](https://v2.cn.vuejs.org/v2/guide/)
- [Vue 2 维护结束说明](https://v2.vuejs.org/eol/)

原有示例和参考继续保留；当前课程目录已另行核验。没有取得字幕，不将自主讲解声称为视频逐字内容。

---

<span style="background-color:rgb(255, 249, 227)">专题深化：保住响应式访问链</span>

把 `state.count` 读成普通数字后再存到变量，得到的是当时的值，不是永远跟着原属性走的“引用别名”。`toRef(state, 'count')` 或 `toRefs(state)` 才能建立相关 ref。C++ 引用的直觉在这里最容易误导。

Vue3.5 对 `<script setup>` 的 props 解构有编译器增强，但不能把这个特殊场景推广到所有普通 reactive 解构。读代码时区分语言原生行为与 SFC 编译转换。

组合函数内部新建状态使每次调用独立；模块顶层新建状态可能在多个调用间共享。服务端渲染时模块共享状态还涉及请求隔离，不能只按浏览器单用户场景推断。

- [指定课程 P7—P15、P29](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=7)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)
