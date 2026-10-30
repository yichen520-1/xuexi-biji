# CSS布局--定位基础

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

定位改变盒子的定位参照与参与布局的方式。先问“是否保留流内占位、参照哪个包含块、什么时候开始偏移”，再写 top/right/bottom/left。不要把所有位置问题都当作设置一个更大的 z-index。

| position | 常见含义 | 先检查 |
| --- | --- | --- |
| static | 默认正常流行为 | 常见 inset 偏移不按定位元素方式生效 |
| relative | 相对原位置偏移 | 原占位通常保留 |
| absolute | 通常脱离正常流定位 | 找实际包含块 |
| fixed | 常见场景相对视口固定 | transform 等祖先可能改变包含块 |
| sticky | 流内到阈值后的粘性定位 | inset 阈值、滚动祖先与可移动范围 |

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```html
<div class="card"><span class="badge">新品</span><p>卡片内容</p></div>
<style>
  .card { position: relative; min-height: 120px; padding: 24px; border: 1px solid #8091a5; }
  .badge { position: absolute; top: 8px; right: 8px; background: #174ea6; color: white; }
</style>
```

这里父元素 relative 建立该例需要的定位参照，子元素 absolute 把角标放到右上。父元素并不必须先实际偏移，单是 relative 就可建立相应定位语境。

“子绝父相”是常用搭配，不是语法强制要求“必须亲父”；实际包含块也可能由更上层祖先或其他机制建立。脱离正常流的角标通常不会自己撑开父元素高度，因此主体内容仍需有正常占位。

---

<span style="background-color:rgb(255, 249, 227)">三：易错点</span>

- sticky 没指定如 top: 0 的有效阈值时，可能看不出预期粘性。
- 检查祖先 overflow 和滚动范围，不把所有 sticky 问题归咎于浏览器。
- z-index 受层叠上下文约束，不是全页面统一比较一个整数。
- 整页布局优先正常流/Flex/Grid；定位用于局部覆盖、角标、固定工具等合适场景。

---

<span style="background-color:rgb(255, 249, 227)">四：练习</span>

只给角标 absolute，没给卡片建立预期包含块，角标为何可能跑到更大的祖先边缘？

> [!success]- 答案
> 它的实际定位参照不是这张卡片。先定位包含块，再补正确结构/属性，而不是不断试 top 和 right 数值。

---

**继续学习**：[[前端/CSS/CSS|返回总学习路线]]。

**官方参考**：[MDN：定位](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning)
