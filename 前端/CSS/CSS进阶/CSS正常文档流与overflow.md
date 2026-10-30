# CSS正常文档流与overflow

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

正常文档流是浏览器默认组织内容的方式。常见水平书写模式下，块级盒通常按块方向排列，行内内容在行内排布并换行。Flex/Grid 是有意建立新的布局方式，absolute/fixed 通常脱离正常流；不要把所有可见移动都当成脱离文档流。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```html
<div class="box">这是一段很长的文字，用来观察宽度限制与溢出。</div>
<p>后面的内容仍然按文档流排列。</p>
<style>
  .box {
    box-sizing: border-box;
    width: 220px;
    height: 70px;
    padding: 12px;
    border: 1px solid #8091a5;
    overflow: auto;
  }
</style>
```

先观察未限制高度的自动增长，再加高度与 overflow。`visible` 允许内容在相应条件下显示到盒外，`hidden` 裁剪内容，`auto` 根据溢出情况提供滚动，`scroll` 明确采用滚动机制。溢出处理不是布局尺寸计算的替代品。

| 改动 | 原来的占位通常怎样 |
| --- | --- |
| relative 偏移 | 保留原位置占位 |
| transform 视觉变换 | 通常不重排周围文档流，但可能影响溢出等行为 |
| absolute/fixed | 通常脱离正常流，由相应包含块定位 |
| display: none | 不生成相应布局盒 |

---

<span style="background-color:rgb(255, 249, 227)">三：易错点</span>

- 不给每个“不整齐”的区域都加绝对定位；先确认正常流、盒模型及布局容器。
- `overflow: hidden` 会裁剪内容，不能把它当万能修复；可能裁掉阴影、弹出层或焦点指示。
- 若只是要建立独立块格式化上下文处理特定包裹需求，可了解 `display: flow-root`，不要把“清除浮动”与“隐藏内容”混成同一个目的。
- float 未从 CSS 中废弃；它仍适合文字环绕，整页结构通常优先考虑 Flex/Grid。

---

<span style="background-color:rgb(255, 249, 227)">四：练习</span>

把一个盒子 relative 下移 20px，后面的段落会自动把原占位也移走吗？

> [!success]- 答案
> 不会，relative 通常保留原来的流内占位。看起来移动与真正改变文档流排布是两回事。

---

**继续学习**：[[前端/CSS/CSS|返回总学习路线]]。

**官方参考**：[MDN：正常流](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction)
