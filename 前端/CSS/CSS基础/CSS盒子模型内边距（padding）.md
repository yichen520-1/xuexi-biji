# CSS盒子模型内边距（padding）

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

padding 是内容边缘与边框之间的空间，属于盒子内部。margin 在边框外部。背景通常会绘制到 padding 区域，而 margin 不是本元素背景的一部分；不要靠颜色边缘误判两者。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```css
.card {
  box-sizing: border-box;
  width: 200px;
  padding: 16px;
  border: 2px solid #8091a5;
  background: #eef4ff;
}
.card p { margin: 0; }
```

在此例里，border-box 把 padding 和 border 包含在指定宽度内：内容宽度是 `200 - 16×2 - 2×2 = 164px`。如果改成 content-box，内容宽度是 200px，边框盒宽度会变成 236px，不含 margin。

| 简写 | 展开含义 |
| --- | --- |
| `padding: 10px` | 四边相同 |
| `padding: 10px 20px` | 上下 10，左右 20 |
| `padding: 10px 20px 30px` | 上 10，左右 20，下 30 |
| `padding: 10px 20px 30px 40px` | 上、右、下、左 |

先写单边如 `padding-left` 帮助理解，再学习简写。对需要适应不同书写方向的界面，可进一步了解 `padding-inline`、`padding-block`，不必永远把左等同于阅读起点。

---

<span style="background-color:rgb(255, 249, 227)">三：易错点</span>

- padding 不能为负值；不要把 margin 的全部规则搬过来。
- 百分比 padding 的参照需另查尺寸规则，不能把 `padding-top: 10%` 简单理解为自身高度的 10%。
- 给行内元素加 padding 不代表它自动具有普通块盒同样的宽高和行高行为，先确认 display。
- 内边距和文字本身的 line-height 会共同影响观感，调大 padding 不能修复所有文本布局问题。

---

<span style="background-color:rgb(255, 249, 227)">四：练习</span>

content-box 下，width 为 240px，左右 padding 各 20px，左右 border 各 1px，边框盒宽度是多少？改 border-box 后呢？

> [!success]- 答案
> content-box 为 282px；border-box 的指定边框盒宽度是 240px，对应内容宽度 198px。两者都不包含 margin。

---

**继续学习**：[[前端/CSS/CSS|返回总学习路线]]。

**官方参考**：[MDN：盒模型](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model)
