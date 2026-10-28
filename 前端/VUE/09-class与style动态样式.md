# class 与 style 动态样式

> **当前主线**：用户指定的 Vue3＋TS 71 集课程；本篇为主题对照与自主讲解，旧 Vue2 演示保留为迁移参考。
> 示例版本：Vue 3.5.13；版本固定用于复现，不表示最新版本。

---

<span style="background-color:rgb(255, 249, 227)">一：学习目标与使用场景</span>

把状态映射到 CSS 类和样式，同时保持语义化和可访问性。

---

<span style="background-color:rgb(255, 249, 227)">二：先把原理讲清楚</span>

Vue 的 :class 支持字符串、对象和数组。对象的键是类名，值的真假决定是否添加这个类。静态 class 与动态 :class 可以同时存在，因此通用样式和状态样式不必互相覆盖。

:style 可以绑定对象，属性名一般使用 camelCase，例如 backgroundColor。对于数值属性，写清单位比依赖隐式处理更容易理解；例如 width: progress + '%'。复杂可复用视觉状态更适合定义 CSS 类，动态数值才放进 style。

状态颜色应当配合文字或图标，不能只靠绿色和红色传达成功失败。一个“选中”按钮还应声明 aria-pressed，让辅助技术知道当前状态。Vue 能更新这些属性，但不会自动替你设计正确语义。

如果一大段样式判断塞进模板，可以改用 computed 返回类对象或样式对象。这样模板保留结构，脚本负责状态推导，也便于在多个节点复用同一状态规则。

---

<span style="background-color:rgb(255, 249, 227)">三：运行方式</span>

直接打开同目录下的 [配套演示](示例/09-class与style动态样式.html)。运行库放在示例/vendor，已本地保存，普通示例不需要联网。Obsidian 的代码块用于阅读，不会自动执行 HTML。也可以把下面整段内容保存到示例目录中的新 HTML 文件；改变位置时需要相应调整运行库相对路径。

---

<span style="background-color:rgb(255, 249, 227)">四：完整代码演示</span>

```html
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>class 与 style 动态样式</title>
<style>
body{font-family:system-ui,sans-serif;line-height:1.7;margin:2rem auto;padding:0 1rem;max-width:58rem;color:#202124;background:#fff}button,input,select{font:inherit;padding:.4rem;margin:.3rem}button{cursor:pointer}label{display:inline-block;margin:.3rem}section{border:1px solid #aaa;padding:1rem;margin:1rem 0}li{margin:.4rem 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #b45309}.active{background:#166534;color:#fff}nav{display:flex;gap:1rem;flex-wrap:wrap}
</style>
</head>
<body>
<div id="app">
<h1>状态样式</h1><button class="toggle" :class="{active: selected}" :aria-pressed="selected" @click="selected = !selected">{{ selected ? '已选中' : '未选中' }}</button><label>进度 <input type="range" min="0" max="100" v-model.number="progress"></label><div style="background:#ddd;height:24px"><div :style="{width: progress + '%', height:'100%', backgroundColor:'#15803d'}"></div></div><p>{{ progress }}%</p>
</div>
<script src="./vendor/vue-3.5.13.js"></script>
<script>
const {createApp, ref} = Vue;
createApp({setup(){
  const selected = ref(false), progress = ref(40);
  return {selected, progress};
}}).mount('#app');
</script>
</body>
</html>
```

---

<span style="background-color:rgb(255, 249, 227)">五：按执行顺序解释</span>

1. 静态 toggle 类一直保留，active 类只在 selected 为真时存在。
2. aria-pressed 与选中状态绑定，视觉和语义一起改变。
3. range 输入使用 number 修饰符，使 progress 适合数值计算。
4. 进度宽度拼接百分号，外容器固定高度，避免变化时布局跳动。

---

<span style="background-color:rgb(255, 249, 227)">六：预期结果与验证步骤</span>

按钮文字随点击切换；拖动滑块后绿色条宽度和数字同步改变。

操作时同时打开浏览器开发者工具：Elements 查看模板生成的节点，Console 查看是否有语法错误或 Vue 警告。若页面显示双大括号原文，优先检查运行库路径、脚本加载顺序和挂载目标。

---

<span style="background-color:rgb(255, 249, 227)">七：图解</span>

```mermaid
flowchart TD
  响应式状态 --> class或style对象 --> CSS生效 --> 可见反馈
```

---

<span style="background-color:rgb(255, 249, 227)">八：注意事项与易错点</span>

- 动态 class 的对象键含连字符时需要加引号。
- style 接收的是样式值而不是任意代码，不应拼接不可信 CSS 字符串。
- 不要只用颜色区分重要状态，要保留文字说明与可见焦点。

---

<span style="background-color:rgb(255, 249, 227)">九：动手练习</span>

进度达到 100 时增加 completed 类，并显示“完成”。

<details>
<summary>参考答案与思路（先自己尝试）</summary>

```js
<p :class="{completed: progress === 100}">{{ progress === 100 ? '完成' : progress + '%' }}</p>
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

[[前端/VUE/08-watch与副作用清理|上一篇：watch 与副作用清理]] · [[前端/VUE/10-生命周期与nextTick|下一篇：生命周期与 nextTick]] · [[前端/VUE/00-Vue学习索引]]

---

<span style="background-color:rgb(255, 249, 227)">十二：官方参考与来源边界</span>

- [Vue 3 中文指南](https://cn.vuejs.org/guide/introduction.html)
- [Vue 2 中文指南](https://v2.cn.vuejs.org/v2/guide/)
- [Vue 2 维护结束说明](https://v2.vuejs.org/eol/)

原有示例和参考继续保留；当前课程目录已另行核验。没有取得字幕，不将自主讲解声称为视频逐字内容。

---

<span style="background-color:rgb(255, 249, 227)">专题深化：动态样式也是状态的投影</span>

class 对象绑定适合“类名对应布尔条件”，数组适合组合多个来源。style 对象的属性值仍需符合 CSS 语义，数值是否需要单位取决于具体属性，不能任意把 number 当作 px。

**建议结构**：交互状态保存在 ref/props，computed 推导 class 或 style，模板只做绑定。不要一边用模板绑定、一边在事件里手工改同一个 DOM style，两套写入来源会互相覆盖。

调试时检查条件值，再看最终 class，再检查 CSS 选择器优先级与作用域；并不是所有“没变色”都意味着响应式失效。

- [指定课程 P5](https://www.bilibili.com/video/BV1Za4y1r7KE/?p=5)
- [[前端/VUE/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [Vue 官方指南](https://vuejs.org/guide/introduction.html)
- [Vue 与 TypeScript](https://vuejs.org/guide/typescript/composition-api.html)
