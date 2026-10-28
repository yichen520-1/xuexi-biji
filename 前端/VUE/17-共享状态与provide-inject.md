# 共享状态与 provide/inject

> **当前主线**：用户指定的 Vue3＋TS 71 集课程；本篇为主题对照与自主讲解，旧 Vue2 演示保留为迁移参考。
> 示例版本：Vue 3.5.13；版本固定用于复现，不表示最新版本。

---

<span style="background-color:rgb(255, 249, 227)">一：学习目标与使用场景</span>

理解状态归属、深层依赖传递和状态管理库的适用边界。

---

<span style="background-color:rgb(255, 249, 227)">二：先把原理讲清楚</span>

组件各自拥有状态是最简单的起点。当兄弟组件要协作，通常把状态提升到共同父组件，再通过 props 和事件协调。不要因为学习了状态管理就把所有输入框、开关和临时弹窗状态都放到全局。

当相隔很远的后代都需要同一份服务或状态时，可以使用 provide/inject，避免每一层都转发相同 props。它是依赖注入机制，仍然需要明确谁拥有状态、谁能修改。提供 readonly 状态和明确的动作函数，可以集中约束修改入口。

共享状态若放在模块顶层，所有导入它的组件都会使用同一份实例。这在单页应用中可能正合需求，在服务端渲染中则要注意请求隔离，不能把不同用户数据写入共享单例。状态管理工具不能自动修复错误的生命周期设计。

大型项目可以使用 Pinia 组织 store、派生状态和动作，并获得开发工具支持。本篇先用原生 Vue 展示共享机制，目的是理解数据流；这不是 Pinia API 演示。读到 defineStore、storeToRefs 时，应另外查阅 Pinia 文档，不要把它们当成 Vue 自带方法。

---

<span style="background-color:rgb(255, 249, 227)">三：运行方式</span>

直接打开同目录下的 [配套演示](示例/17-共享状态与provide-inject.html)。运行库放在示例/vendor，已本地保存，普通示例不需要联网。Obsidian 的代码块用于阅读，不会自动执行 HTML。也可以把下面整段内容保存到示例目录中的新 HTML 文件；改变位置时需要相应调整运行库相对路径。

---

<span style="background-color:rgb(255, 249, 227)">四：完整代码演示</span>

```html
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>共享状态与 provide/inject</title>
<style>
body{font-family:system-ui,sans-serif;line-height:1.7;margin:2rem auto;padding:0 1rem;max-width:58rem;color:#202124;background:#fff}button,input,select{font:inherit;padding:.4rem;margin:.3rem}button{cursor:pointer}label{display:inline-block;margin:.3rem}section{border:1px solid #aaa;padding:1rem;margin:1rem 0}li{margin:.4rem 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #b45309}.active{background:#166534;color:#fff}nav{display:flex;gap:1rem;flex-wrap:wrap}
</style>
</head>
<body>
<div id="app">
<h1>共享主题</h1><theme-switch></theme-switch><theme-status></theme-status>
</div>
<script src="./vendor/vue-3.5.13.js"></script>
<script>
const {createApp, ref, readonly, provide, inject} = Vue;
const ThemeSwitch = {setup(){return inject('themeService');},template:'<button @click="toggle">切换主题</button>'};
const ThemeStatus = {setup(){return inject('themeService');},template:'<p>当前主题：{{ theme }}</p>'};
createApp({components:{ThemeSwitch,ThemeStatus},setup(){
  const theme = ref('light');
  function toggle(){theme.value = theme.value === 'light' ? 'dark' : 'light';}
  provide('themeService',{theme:readonly(theme),toggle});
  return {};
}}).mount('#app');
</script>
</body>
</html>
```

---

<span style="background-color:rgb(255, 249, 227)">五：按执行顺序解释</span>

1. 根组件提供一个服务对象，包含只读主题与 toggle 动作。
2. 两个后代通过相同 key 注入服务，读取的是同一份主题状态。
3. 子组件只调用 toggle，不直接修改 readonly ref。
4. 生产项目可用 Symbol 作为注入 key，减少字符串冲突，并约定缺失注入时的行为。

---

<span style="background-color:rgb(255, 249, 227)">六：预期结果与验证步骤</span>

点击切换按钮，另一个组件中的主题在 light 和 dark 之间切换，体现跨组件共享。

操作时同时打开浏览器开发者工具：Elements 查看模板生成的节点，Console 查看是否有语法错误或 Vue 警告。若页面显示双大括号原文，优先检查运行库路径、脚本加载顺序和挂载目标。

---

<span style="background-color:rgb(255, 249, 227)">七：图解</span>

```mermaid
flowchart TD
  父级状态 --> provide服务 --> 后代inject --> 调用动作 --> 共享状态更新
```

---

<span style="background-color:rgb(255, 249, 227)">八：注意事项与易错点</span>

- Vue 2 Options API provide 普通值不自动具有 Vue 3 ref 一样的响应式行为，不能机械照搬。
- 不要把密码或敏感令牌当普通可持久化前端共享状态随意暴露。
- 跨页面共享状态和持久化是两回事，刷新后是否保留需要单独设计。

---

<span style="background-color:rgb(255, 249, 227)">九：动手练习</span>

增加 reset 动作，让任意后代可以恢复 light。

<details>
<summary>参考答案与思路（先自己尝试）</summary>

```js
// 提供的对象增加 reset: () => { theme.value = 'light'; }
// 子组件注入后通过 <button @click="reset">恢复</button> 调用。
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

[[前端/VUE/16-VueRouter路由基础|上一篇：Vue Router 路由基础]] · [[前端/VUE/18-异步请求与界面状态|下一篇：异步请求与界面状态]] · [[前端/VUE/00-Vue学习索引]]

---

<span style="background-color:rgb(255, 249, 227)">十二：官方参考与来源边界</span>

- [Vue 3 中文指南](https://cn.vuejs.org/guide/introduction.html)
- [Vue 2 中文指南](https://v2.cn.vuejs.org/v2/guide/)
- [Vue 2 维护结束说明](https://v2.vuejs.org/eol/)
- [Pinia 指南](https://pinia.vuejs.org/zh/introduction.html)

原有示例和参考继续保留；当前课程目录已另行核验。没有取得字幕，不将自主讲解声称为视频逐字内容。

---

<span style="background-color:rgb(255, 249, 227)">专题深化：共享范围要与所有权一致</span>

props/emits 适合显式父子关系，provide/inject 适合某个子树范围的依赖，Pinia 适合跨页面共享业务状态。不要因为使用状态库就把每个输入框光标和临时弹窗开关都放进全局。

provide 建议把状态与修改函数一起组织，必要时暴露 readonly 视图。TS 的 InjectionKey 可让提供方和消费方共享契约，但注入仍可能缺失，应提供默认值或显式处理 undefined。

解构 Pinia store 的响应式状态要用 storeToRefs，action 可按需要直接取；不要把 storeToRefs 用到任意普通对象上。

- [指定课程 P43—P51、P60](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=43)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)
