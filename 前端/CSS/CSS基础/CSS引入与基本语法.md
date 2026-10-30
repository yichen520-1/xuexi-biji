# CSS引入与基本语法

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

HTML 描述内容与结构，CSS 描述这些内容如何呈现。浏览器先解析文档和样式规则，匹配选择器，按层叠等规则确定使用值，再进行布局与绘制。学习选择器前，先确认样式表确实被加载、规则没有写在错误位置。

一条规则由“选择器 + 声明块”组成，声明由“属性: 值”组成。分号分隔声明，不把 HTML 的属性等号写法搬进 CSS。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>第一条 CSS 规则</title>
  <style>
    .message { color: #174ea6; font-size: 20px; }
  </style>
</head>
<body><p class="message">样式作用于这个段落。</p></body>
</html>
```

1. `<style>` 内是 CSS，`.message` 匹配具有该类的元素。
2. `color` 改文字颜色；`font-size` 接收合法长度值。
3. 浏览器不会因为某条声明非法就自动替你纠正；用 DevTools 的 Styles/Computed 看匹配和最终结果。

| 引入方式 | 示例 | 常见用途 |
| --- | --- | --- |
| 外部样式表 | `<link rel="stylesheet" href="./style.css">` | 多页面复用，推荐作为正式练习方式 |
| 内部样式表 | head 中的 style | 单文件演示 |
| 行内样式 | `style="color: red"` | 特定动态/局部需求，不作为组织全站样式的默认方式 |

外部 CSS 的 `url(...)` 相对地址通常以样式表文件地址为基准，不是以任意 HTML 页面位置为基准。加载失败先检查路径和网络响应，而不是直接给规则加 `!important`。

---

<span style="background-color:rgb(255, 249, 227)">三：易错点</span>

- CSS 注释是 `/* ... */`，不是 HTML 的 `<!-- ... -->`。
- 同一个元素命中多条规则时，不能只说“写后面的永远赢”；来源、重要性、层、优先级等都会参与，后续在“CSS三大特性”继续学。
- `width: 200` 对需要长度的常见场景不是正确替代 `200px`；零值、无单位数与各种单位各有规则。
- C++17 的类型检查直觉不能完全迁移：很多非法样式声明会被忽略，需观察实际计算样式。

---

<span style="background-color:rgb(255, 249, 227)">四：练习</span>

把演示的 style 内容移到同目录 `style.css`，并用 link 引入。故意把文件名拼错，观察 Network，再修复。

> [!success]- 答案与判断标准
> 正确路径能加载 CSS，段落变色；错误路径通常得到加载失败。先确认资源存在，再查选择器与层叠。下一篇进入基础选择器。

---

**继续学习**：[[前端/CSS/CSS|返回总学习路线]]。

**官方参考**：[MDN：CSS 入门](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started)
