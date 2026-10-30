# CSS布局--轮播图

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

这篇是“定位 + 溢出裁剪 + Flex + transform + animation”的综合练习，应在这些基础之后学习。原定位子目录可以提前查看结构，但不必在没学动画时强行理解全部切换过程。

轮播的可视窗口与滑动轨道是两层：窗口裁掉越界内容，轨道装入每一页并整体平移。不要把轨道直接设成 300% 后仍机械沿用百分比位移，否则百分比的参照会跟着轨道尺寸改变。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

以下片段放到普通 HTML 的 body；style 可在 head。使用纯色卡片，不依赖缺失图片或 JS 服务。

```html
<div class="demo">
  <input class="pause" id="pause-slides" type="checkbox">
  <label for="pause-slides">暂停自动切换</label>
  <div class="carousel" tabindex="0" aria-label="三张演示卡片，聚焦可暂停">
    <div class="slides">
      <section class="slide">卡片 A</section>
      <section class="slide">卡片 B</section>
      <section class="slide">卡片 C</section>
    </div>
  </div>
</div>
<style>
  .carousel { width: min(100%, 600px); aspect-ratio: 16 / 9; overflow: hidden; }
  .slides { display: flex; height: 100%; animation: slide 12s infinite; }
  .slide { flex: 0 0 100%; display: grid; place-items: center; font-size: 2rem; }
  .slide:nth-child(1) { background: #dceaff; }
  .slide:nth-child(2) { background: #ddf5e8; }
  .slide:nth-child(3) { background: #fff0d5; }
  .pause:checked ~ .carousel .slides,
  .carousel:hover .slides,
  .carousel:focus-within .slides { animation-play-state: paused; }
  .carousel:focus-visible { outline: 3px solid #174ea6; }
  @keyframes slide {
    0%, 25% { transform: translateX(0); }
    33.333%, 58.333% { transform: translateX(-100%); }
    66.666%, 91.666% { transform: translateX(-200%); }
    100% { transform: translateX(0); }
  }
  @media (prefers-reduced-motion: reduce) { .slides { animation: none; } }
</style>
```

轨道本身的常见块宽等于窗口宽；每张卡片用 100% basis 占一屏且不缩小。位移 -100% 在此等于移动一个轨道自身宽度，恰好一屏。回到 0 的末段会回滑，不是无缝循环；无缝与手动前后翻页是后续可另行实现的需求。

---

<span style="background-color:rgb(255, 249, 227)">三：易错点</span>

- 有自动运动就要考虑暂停和减少动态效果偏好，本例有复选框、悬停与焦点暂停。
- 这是布局教学演示，不冒充完整生产级无障碍轮播；真正产品还需当前页语义、手动控制、读屏与键盘等设计。
- 仅把图片堆在 absolute 下不会自动切换；动画/脚本要明确控制哪个属性。

---

<span style="background-color:rgb(255, 249, 227)">四：练习</span>

把 track 设成 300% 后，为什么原来的 -100% 可能一次滑出三屏？

> [!success]- 答案
> transform 的百分比参照相关变换参考盒，不是自动等于外层视窗宽。先确定轨道宽度与每页尺寸，再计算位移。

---

**继续学习**：[[前端/CSS/CSS|返回总学习路线]]。

**官方参考**：[MDN：使用 CSS 动画](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
