# CSS基础

本页是基础学习目录，原有选择器内容保留在文末。优先按以下路线打开对应专题，不再把“基础”误当成只讲选择器。

---

<span style="background-color:rgb(255, 249, 227)">一：先把规则作用到页面</span>

1. [[前端/CSS/CSS基础/CSS引入与基本语法|CSS引入与基本语法]]：样式表、规则、声明和 DevTools
2. [[前端/CSS/CSS基础/CSS选择器|CSS选择器]]：基础 → 关系 → 属性与各类伪类/伪元素
3. [[前端/CSS/CSS基础/CSS三大特性|CSS三大特性]]：理解层叠、继承与优先级；不要只背最后出现的规则

---

<span style="background-color:rgb(255, 249, 227)">二：文字与显示行为</span>

4. [[前端/CSS/CSS基础/CSS字体样式|CSS字体样式]]：先认识单项字体属性
5. [[前端/CSS/CSS基础/CSSfont简写属性|CSSfont简写属性]]：掌握单项后再用简写
6. [[前端/CSS/CSS基础/CSS文本布局|CSS文本布局]]：对齐、行高与文字排布
7. [[前端/CSS/CSS基础/CSS鼠标样式|CSS鼠标样式]]：简单交互反馈
8. [[前端/CSS/CSS基础/CSS元素显示模式（display）的转换|CSS元素显示模式（display）的转换]]：区分 block、inline、inline-block 等基本行为

---

<span style="background-color:rgb(255, 249, 227)">三：建立盒子与练习</span>

9. [[前端/CSS/CSS基础/CSS盒子模型|CSS盒子模型]]：边框 → padding → margin → 尺寸计算 → 装饰
10. [[前端/CSS/CSS基础/CSS画盒子案例--网页基本布局|CSS画盒子案例--网页基本布局]]：用盒模型理解页面分区，再进入现代布局

[[前端/CSS/CSS|返回CSS总学习路线]]

---

<span style="background-color:rgb(255, 249, 227)">补充：原有基础选择器讲解（完整保留）</span>

一：概念

### 选择器是 CSS 的“瞄准镜”

CSS 规则由 **选择器** 和 **声明块** 两部分组成[https://cloud.tencent.cn/developer/article/2209845?policyId=1004#1](https://cloud.tencent.cn/developer/article/2209845?policyId=1004#1)[https://www.shuzhiduo.com/A/pRdBNpBedn/#1](https://www.shuzhiduo.com/A/pRdBNpBedn/#1)。选择器的作用就是**找到你想要美化的那个（些）标签**[https://www.shuzhiduo.com/A/pRdBNpBedn/#1](https://www.shuzhiduo.com/A/pRdBNpBedn/#1)。基础选择器主要有四种：

- **标签选择器**：直接使用 HTML 标签名，能选中页面中**所有**这类标签，适合做全局基础设置，但无法差异化选择[https://cloud.tencent.cn/developer/article/2209845?policyId=1004#1](https://cloud.tencent.cn/developer/article/2209845?policyId=1004#1)。
- **类选择器**：通过 `.类名` 来定义，需要在 HTML 标签中用 `class="类名"` 来调用。**这是开发中最常用、最灵活的选择器**，可以给多个标签赋予同一个类名，实现批量样式设置[https://cloud.tencent.cn/developer/article/2209845?policyId=1004#1](https://cloud.tencent.cn/developer/article/2209845?policyId=1004#1)。
- **ID 选择器**：通过 `#id名` 来定义，在 HTML 标签中用 `id="id名"` 来调用。ID 在一个页面中必须是**唯一**的，类似身份证号，通常配合 JavaScript 使用，不推荐用它来设置样式[https://www.cnblogs.com/destiny-2015/p/15440838.html#1](https://www.cnblogs.com/destiny-2015/p/15440838.html#1)。
- **通配符选择器**：用 `*` 表示，能选中页面中**所有**元素。主要用在 CSS 初始化中清除默认的 `margin` 和 `padding`，开发中极少用于其他场景[https://www.cnblogs.com/destiny-2015/p/15440838.html#1](https://www.cnblogs.com/destiny-2015/p/15440838.html#1)。
二：格式
在 CSS 文件中，选择器的写法遵循固定格式：

```css

选择器 {
    属性名: 属性值;
    属性名: 属性值;
}
```

- **标签选择器**：`标签名 { ... }`
- **类选择器**：`.类名 { ... }`
- **ID 选择器**：`#id名 { ... }`
- **通配符选择器**：`* { ... }`

**书写建议**：推荐使用展开格式，选择器和大括号之间保留一个空格，冒号后面也保留一个空格，代码更清晰易读[https://cloud.tencent.cn/developer/article/2209845?policyId=1004#1](https://cloud.tencent.cn/developer/article/2209845?policyId=1004#1)[https://www.shuzhiduo.com/A/pRdBNpBedn/#1](https://www.shuzhiduo.com/A/pRdBNpBedn/#1)。
三：代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>基础选择器练习</title>
    <style>
        /* 1. 标签选择器：选中所有 p 标签 */
        p {
            color: blue;
        }
        /* 2. 类选择器：选中 class="highlight" 的标签 */
        .highlight {
            background-color: yellow;
        }
        /* 3. ID选择器：选中 id="unique" 的标签 */
        #unique {
            font-size: 24px;
        }
        /* 4. 通配符选择器：清除所有标签默认边距 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <p>我是普通的段落，被标签选择器选中，颜色是蓝色。</p>
    <p class="highlight">我带有 class，被类选择器选中，背景变黄了。</p>
    <p id="unique">我带有 id，被 ID 选择器选中，字体变大了。</p>
    <div>div 也会被通配符选择器清除默认边距。</div>
</body>
</html>
```

四：总结
