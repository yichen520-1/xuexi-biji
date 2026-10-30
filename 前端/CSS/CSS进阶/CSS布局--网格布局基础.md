# CSS布局--网格布局基础

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Grid 用行、列轨道共同组织二维布局。容器决定网格轨道和间隔，项目决定占据哪些单元格/网格线。先会建立轨道，再去读现有“项目的对齐方式”，不先背 justify/align 的四组名字。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```html
<div class="grid">
  <article>A</article><article>B</article><article>C</article><article>D</article>
</div>
<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
  .grid article { min-width: 0; padding: 16px; background: #eef4ff; }
</style>
```

1. 建立三个相等的列轨道。
2. gap 先占空间，fr 分配可用的剩余空间。
3. 默认自动放置项目，第四项进入后续行。
4. `minmax(0, 1fr)` 让轨道的最小值不被某些内容固有宽度无意撑大，但仍需设计文本换行/溢出。

| 需求 | 属性思路 |
| --- | --- |
| 定义列 | grid-template-columns |
| 定义行 | grid-template-rows / 自动行规则 |
| 项目跨两列 | grid-column: span 2 |
| 项目在格内对齐 | justify-items、align-items 或单项 self 属性 |

完成基础后读 [[前端/CSS/CSS进阶/CSS布局--网格布局--项目的对齐方式]]。响应式阶段可用媒体查询改变列数，再进一步学习 auto-fit 与 minmax 的组合。

---

<span style="background-color:rgb(255, 249, 227)">三：易错点</span>

- `1fr` 不等于整张页面的固定三分之一；要扣掉间隔并考虑其他轨道约束。
- 网格容器对齐与项目在格内对齐不是同一个问题。
- gap 不是每个项目四边都添加 margin。
- 选择 Flex 或 Grid 看布局维度与约束，不把其中一种当另一种的“升级替代品”。

---

<span style="background-color:rgb(255, 249, 227)">四：练习</span>

网格内容宽 600px，三等列，两处列间隔各 16px，每列是多少？

> [!success]- 答案
> `(600 - 32) / 3`，约 189.33px。这里已明确内容宽度，未另加容器 padding/border。

---

**继续学习**：[[前端/CSS/CSS|返回总学习路线]]。

**官方参考**：[MDN：Grid](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids)
