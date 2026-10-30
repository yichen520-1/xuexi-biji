# CSS弹性盒

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Flex 主要解决一个主轴上的空间分配。容器设置 `display: flex` 后，直接子元素成为 flex items；不是所有后代都自动参与同一套 Flex 排布。先分清容器属性与项目属性，再学主轴和交叉轴。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```html
<div class="cards">
  <article>第一项</article><article>第二项</article><article>第三项</article>
</div>
<style>
  .cards { display: flex; flex-wrap: wrap; gap: 16px; }
  .cards article {
    flex: 1 1 14rem;
    min-width: 0;
    padding: 16px;
    background: #eef4ff;
  }
</style>
```

`flex: 1 1 14rem` 依次表示 grow、shrink、basis：允许增长，允许收缩，以 14rem 作为相应基础尺寸。最终大小还受内容最小尺寸、约束和剩余空间影响，不是“每项永远固定 14rem”。

| 容器属性 | 作用 |
| --- | --- |
| flex-direction | 确定主轴方向 |
| justify-content | 主轴上的剩余空间分配 |
| align-items | 项目在交叉轴上的对齐 |
| flex-wrap | 是否允许多条 flex line |
| gap | 项目/行之间间距 |

`align-content` 处理多条行的整体分布，单行时不要靠它修复单个项目对齐。更细的轴向讲解见 [[前端/CSS/CSS进阶/CSS弹性盒布局--主轴和交叉轴]]。

---

<span style="background-color:rgb(255, 249, 227)">三：易错点</span>

- 先确认轴向，不能永远把 justify-content 背成水平对齐。
- 一段不换行文本可能受自动最小尺寸限制，必要时在正确项目上设 `min-width: 0`，并设计文本溢出策略。
- Flex 可以换行，但多行之间并不等同于 Grid 的共享列轨道；需要严格二维网格时学习 Grid。
- 不用大量 margin 人工计算间隙来模拟所有 gap 场景。

---

<span style="background-color:rgb(255, 249, 227)">四：练习</span>

容器内容宽 600px，三项各 200px 且不允许缩小，间隔为 16px，能同一行放下吗？

> [!success]- 答案
> 不能，合计 632px。需允许合理缩小、换行或重新设计尺寸；先算空间，再决定属性。

---

**继续学习**：[[前端/CSS/CSS|返回总学习路线]]。

**官方参考**：[MDN：Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox)
