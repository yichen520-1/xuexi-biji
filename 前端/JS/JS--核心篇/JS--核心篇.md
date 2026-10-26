# JS--核心篇

> **这是什么**：应用篇 **Web APIs（浏览器端）** 的全部有效知识 —— 覆盖第 77-150 集，重组为 **39 个知识点 / 13 轮**。
> **定位**：这是"浏览器端"这一半的**核心底稿**。使命是**配合服务端 HTTP API 做全栈** —— 这一半到此打通。
> **来源**：黑马程序员《前端 JavaScript 入门到精通全套视频教程》BV1Y84y1L7Nn；权威参考 [MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/API)。
> **说明**：全文贯穿 **JS ↔ C++17 对照** —— 读者是资深 C++17 学习者，**只讲差异与坑**，不铺垫编程通识。

---

一：概念

## 1. Web APIs 是什么（先切开一个同名陷阱）

| 名字 | 指什么 |
| --- | --- |
| **Web API**（无 s） | HTTP 接口 —— Controller + 路由 + JSON，**后端那一半** |
| **Web APIs**（有 s） | 浏览器给 JS 的**一整套内置能力**：DOM / BOM / 定时器 / 存储 / 正则 —— **本文的主题** |

两者唯一的关系：**前端这半边最终调用后端那半边。**

**内核一句话**：HTML 是浏览器画页面的**原始材料**；解析后在内存里长成一棵**活的对象树**（DOM 树）；**JS 只能通过这棵树接触页面** —— 改树就是改屏幕。

## 2. 全景地图：39 个知识点分六类

| 类别 | 管什么 | 知识点 |
| --- | --- | --- |
| **一、找与改**（DOM） | 页面**内容** | ①DOM 是什么 ②获取元素 ③改内容 ④改属性 ⑤`style` ⑥`className`/`classList` ⑦表单 `value` ⑧`data-` ⑨`setInterval` |
| **二、听与拦**（事件） | 用户**操作** | ⑩`addEventListener` ⑪鼠标 ⑫焦点 ⑬键盘 ⑭事件对象 ⑮`this` ⑯事件流 ⑰解绑 ⑱事件委托 ⑲阻止默认 ⑳加载与滚动 ㉑坐标与尺寸 |
| **三、量与算**（时间） | 时间 | ㉒`Date` ㉓时间戳 |
| **四、结构与树** | 改**结构** | ㉔查找节点 ㉕增/克隆/删节点 ㉖触摸事件 ㉗Swiper |
| **五、环境与存储** | 浏览器**本身** | ㉘BOM 与 `setTimeout` ㉙事件循环 ㉚`location` ㉛`navigator`/`history` ㉜本地存储 ㉝`JSON` |
| **六、串与理**（数组·字符串） | 数据 → 界面 | ㉞`map`/`join` ㉟数据驱动 ㊱正则入门 ㊲正则进阶 ㊳表单验证 ㊴放大镜 |

## 3. ⭐ 三条贯穿全篇的线（比 39 个知识点更重要）

### 线一：**静默失败** —— 本课程真正的暗线

JS 里"编译期能挡住的 / 名字配置写错的 / 同一个词指不同东西的"，**多半一声不响**。

| 你写的 | 实际发生 |
| --- | --- |
| `querySelector('username')` 少了 `#` | 返回 `null`，下一行才炸 |
| `addEventListener('clik', fn)` | **永不触发，无报错** |
| `removeEventListener` 传了另一个函数 | **解绑失败，无报错** |
| `cloneNode()` 忘传 `true` | 拿到空壳，**无报错** |
| `setTimeout(closeAd(), 5000)` 多一对括号 | **定时器永不触发，无报错** |
| `arr.map(function (n) { n * 2; })` 忘 `return` | 一数组 `undefined`，**无报错** |
| `setItem('obj', {a:1})` | 存成 `'[object Object]'`，**数据全丢，无报错** |
| `str.replace('-', '/')` 忘了 `g` | 只换第一个，**无报错** |
| `backgroundPosition` 少了 `px` | 完全没反应，**无报错** |
| `offsetLeft` / `offsetTop` 参照系错 | 算出来的数就是错的，**无报错** |

> ⚠️ **但要记住一个反例**：`JSON.parse('abc')` **会**抛 `SyntaxError`。
> 所以准确的说法不是"JS 什么都不报"，而是 **"它说话的地方没有规律"** —— 这比"完全不说话"更难。

**由此得出的第一习惯**：不是"写得对"，而是 **"先确认它真的执行了"** —— `console.log` 打点、F12 看 Console、Network 看请求。

### 线二：**一切都在运行期**，没有编译期保护

|   | C++17 | JS |
| --- | --- | --- |
| 类型什么时候查 | 编译期 | **跑到那一行** |
| 名字打错 | 编译不过 | 读到 `undefined` |
| 类型用错 | 编译不过 | 隐式转换掉 |
| 重构重命名 | IDE 一键，编译器兜底 | 靠 grep + 人肉 |

**准确说法**：JS 是 **动态 + 弱** 两个维度都占 —— 「动态」指类型在**运行期**才查，「弱」指**允许隐式转换**（`'1' + 1` → `'11'`）。

**为什么长成这样**：1995 年布兰登·艾奇 **10 天**写出的脚本语言；跑在浏览器里、受众是"给网页加点交互"的非程序员。**这是取舍，不是做得差。**

**工程上的答案：TypeScript**

- JS 的超集，**编译期类型检查，产物仍是 JS**
- TypeScript 与 C++17 都有接口抽象、泛型、枚举等概念，但语法及类型系统不同
- ⭐ TypeScript 由 Anders Hejlsberg 等人主导设计；它是 JavaScript 的渐进式类型层，不是 C++ 的超集。
- ⚠️ **但顺序不能反**：TS 查编译期，JS 真正的坑全在**运行期** —— 先懂运行时，TS 才有意义

### 线三：**单线程 + 任务队列**

| 组成 | 是什么 |
| --- | --- |
| **调用栈** | 当前正在执行的函数（**只有一条主线程**） |
| **任务队列** | 等着执行的回调，排成一队 |
| **宿主环境** | 计时器 / 网络 / DOM 事件的真正执行者（浏览器的其他线程） |

**一条规则**：调用栈空了，就取任务队列里最前面的回调压栈执行。

一个模型解释了两个散点：

| 前面的结论 | 根 |
| --- | --- |
| `setInterval` 的"每隔 1 秒"实际是"**至少** 1 秒" | 定时器只是"到点了把回调**排进队列**" |
| `scroll` / `mousemove` 高频事件"别做重活" | **单线程**：主线程被占，页面直接卡死 |

**推论**：`setTimeout(fn, 0)` ≠ 立刻执行 —— 它的意思是"**等当前所有同步代码跑完**"。

**为什么单线程**：要操作 DOM。两条线程同时改一个元素根本没法协调，加锁会让网页卡死。
**代价**：任何**长时间的同步代码**都会冻死整个页面。
**C++17 对照**：`std::this_thread::sleep_for` 阻塞当前线程；浏览器计时器会排入任务队列，主线程阻塞会卡页面。Web Workers 与共享内存场景仍可能有并发问题。

## 4. C++17 类比可用度总账

| 档 | 代表 |
| --- | --- |
| ⚠️ **只借概念** | 可调用对象/容器算法可表达回调与数据处理；C++17 标准库没有 DOM、浏览器事件订阅、GUI 控件、JSON 或 XML DOM。时间、字符串与正则 API 也须逐项比较语义。 |
| ⚠️ **形似神不同** | 大部分 DOM / 事件 / 样式 / 定时器 / 日期 —— **借思路，必须记差异** |
| ❌ **无直接对应** | DOM 传播、浏览器默认行为、布局坐标与事件循环；JS 动态属性和 this 绑定也不能套用 C++ 类模型 |

---

二：格式

## 1. DOM：查询与修改

### 1.1 选择器 → JS 写法

| 目的 | 写法 | 返回 | 找不到时 |
| --- | --- | --- | --- |
| 按 id 抓一个 | `document.querySelector('#box')` | 第一个匹配的 `Element` | `null`**（不抛异常）** |
| 按 class 抓一个 | `document.querySelector('.box')` | 同上 | `null` |
| 抓一堆 | `document.querySelectorAll('li')` | **伪数组**（NodeList） | 空列表 |
| 老写法·按 id | `document.getElementById('box')` | `Element` | `null` |
| 老写法·按标签 | `document.getElementsByTagName('li')` | **动态集合** | 空集合 |

**要点**

- 参数是**字符串**，且必须是**合法 CSS 选择器**；非法选择器抛 `SYNTAX_ERR`（**唯一**会抛异常的情况）。
- 返回**文档顺序里第一个**匹配项。
- `querySelector` / `querySelectorAll` 也挂在**元素**上：`box.querySelector('li')` 只在 `box` 的**后代**里找。
- 伪数组：有 `length`、有下标、能 `for` 循环，但**没有 **`push`** / **`map`。

**最容易写错的六行**

| 你写的 | 实际发生 | 结果 |
| --- | --- | --- |
| `querySelector('username')` | 找 `<username>` **标签** | `null`（几乎必然） |
| `querySelector('.username')` | 找 class 是 username 的 | 元素 / `null` |
| `querySelector('#userName')` | 大小写不匹配 | `null` |
| `getElementById('#username')` | 找 id **字面值**是 `#username` 的 | `null` |
| `querySelectorAll('#username')` | 返回伪数组不是元素 | `.innerText` 失效 |

> **保命常识**：`Cannot read properties of null` = 上一步查询没查到。先查选择器，再查时序（`<script>` 是不是放 `<head>` 了）。

### 1.2 改内容

1. **能写 CSS 类就写类** → `classList.add` / `remove` / `toggle` / `contains`
2. 只塞文字 → `innerText`（读文本更稳的是 `textContent`）
3. 要塞 HTML 结构 → `innerHTML`（⚠️ 内容来自用户 = **XSS 入口**）
4. 真正动态算出来的值（坐标 / 进度 / 随机色）→ `style.xxx`

⚠️ `className = '...'`** 是整串替换**，会抹掉原有的类 —— **祖传 bug 第一名**。

### 1.3 改属性与 style

- **布尔属性**必须写真布尔 `el.disabled = true`。
- `el.href` 读的是浏览器**补全后的绝对地址**；`getAttribute('href')` 才是 HTML 里原样那串（**attribute vs property**）。
- `class` → `className`，`for` → `htmlFor`。
- `style`：CSS 连字符转小驼峰（`background-color` → `backgroundColor`，`float` → `cssFloat`）；**值必须是带单位的字符串**（`'200px'`）。
- `style` 只写**行内样式**，读不到 CSS 里写的值（要用 `getComputedStyle`）。

### 1.4 表单与 data-

| HTML | JS 读 | JS 写 |
| --- | --- | --- |
| `<input>` | `el.value` | `el.value = '...'` |
| `<input type="checkbox">` | `el.checked` | `el.checked = true` |
| `data-id="101"` | `el.dataset.id` | `el.dataset.id = '102'` |
| `data-user-name="张三"` | `el.dataset.userName` | 同上 |

- 表单元素用 `.value`，**不用 **`innerText`。
- `value`** 永远是字符串** —— 算数先 `Number()`。
- `dataset` 里**全是字符串**；规则：去掉 `data-`，剩下的连字符转小驼峰。⚠️ `el.dataset['user-name']` 是错的。

### 1.5 查找节点：两条轨

**树里不只有标签** —— 换行、缩进、注释都是节点。所以 DOM 给了两套指针。

| 你想做的事 | **节点轨**（含文本 / 注释） | **元素轨**（只含标签）⭐ 默认用这套 |
| --- | --- | --- |
| 父 | `parentNode` | `parentElement` |
| 所有子 | `childNodes` → `NodeList` | `children` → `HTMLCollection` |
| 第一个 / 最后一个子 | `firstChild` / `lastChild` | `firstElementChild` / `lastElementChild` |
| 下一个 / 上一个兄弟 | `nextSibling` / `previousSibling` | `nextElementSibling` / `previousElementSibling` |

**同一段 HTML，两个长度**：

| 表达式 | 结果 |
| --- | --- |
| `list.childNodes.length` | **7**（4 个换行文本节点 + 3 个 `li`） |
| `list.children.length` | **3** |
| `list.firstChild` | `#text`（一个换行） |
| `list.firstElementChild` | 第一个 `<li>` |

**四条坑**

1. `childNodes`** 是实时的** —— 边遍历边删会**每隔一个漏一个**，且**不报错**。
→ 清空子元素：`while (el.firstChild !== null) { el.removeChild(el.firstChild); }`
→ C++ 容器在遍历中修改的规则依容器和操作而异；`std::vector` 插入/删除可能使迭代器失效，继续使用失效迭代器会产生未定义行为。
2. `parentNode` vs `parentElement` **只在根上分岔**：`documentElement.parentNode` = `document`；`parentElement` = `null`。
3. 兄弟走到头是 `null`，遍历靠它收尾。
4. 两套都是**伪数组**。

`nodeType`：`1` 元素 ｜ `3` 文本 ｜ `8` 注释。
**C++17 标准库没有 XML/DOM 解析器**；第三方解析库各自决定空白节点处理，不能假定与浏览器 DOM 相同。

### 1.6 增 / 克隆 / 删节点

**「造」和「挂」是两步** —— `createElement` 的产物是**游离**的，页面看不见。C++17 标准库没有 GUI 控件或 DOM 树；具体 GUI 框架通常也有单独的创建与挂载步骤。

| 目的 | 写法 | 要点 |
| --- | --- | --- |
| 造元素 | `document.createElement('li')` | 游离态，**必须再插一次** |
| 挂到末尾 | `父.appendChild(child)` | **已在树中 = 移动，不是复制** |
| 挂到某节点之前 | `父.insertBefore(child, ref)` | `ref` 传 `null` = 末尾；**没有 **`insertAfter` |
| 拷一份 | `源.cloneNode(true)` | **必须写 **`true`，不写 = 空壳；克隆出的节点**没有父节点** |
| 删自己 | `el.remove()` | 返回 `undefined` |
| 由父删 | `父.removeChild(el)` | 返回**被删的节点**；参数不对 → `NotFoundError` / `TypeError` |

**克隆的两条硬规矩**（MDN 原文）

1. 克隆**复制所有属性及内联事件监听器**，**不复制** `addEventListener()` 添加的监听器 → **克隆出来的元素没有事件**。
2. **可能会造成重复的元素 ID** → 克隆后**必须改掉 **`id`。

⭐ **一句把事件和节点缝起来的话**：**监听器绑在节点实例上，不在 HTML 上** —— `cloneNode` **丢**事件，`removeChild` 的返回值**留**着事件。
→ **推论**：批量由模板生成元素时，**事件委托几乎是唯一不别扭的解法**。

**三条最容易踩的**

| ✗ | 后果 | ✓ |
| --- | --- | --- |
| `list.innerHTML += '<li>x</li>'` | 整段重解析 → **旧监听器全丢、**`input`** 已输入的值清空** | `createElement` + `appendChild` |
| `cloneNode()` 不传参数 | 拿到空壳（不报错） | `cloneNode(true)` |
| 循环里一边遍历 `children` 一边删 | 实时集合 → **每隔一个漏一个** | `while (el.firstChild !== null) {...}` |

---

## 2. 事件

### 2.1 绑定与解绑

```js
元素.addEventListener('事件类型', 处理函数);                 // 浏览器事件订阅；C++17 标准库没有对应的 DOM 事件 API
元素.addEventListener('事件类型', 处理函数, { once: true });  // 触发一次后自动解绑
元素.removeEventListener('事件类型', 处理函数);               // 浏览器事件解绑；C++17 标准库没有对应的 DOM 事件 API
```

| 写法 | 本质 | 能挂几个 |
| --- | --- | --- |
| `元素.addEventListener('click', fn)` | 往**列表**里加 | 多个，按**注册顺序**执行 |
| `元素.onclick = fn` | 给**属性**赋值 | 只留最后一个 |

- 两者**互不干扰**。
- `addEventListener` 返回 `undefined` —— 没有"靠返回值解绑"这条路。

**⚠️ 三要素**：事件源（哪个元素）｜事件类型（**不带 **`on`、**大小写敏感**）｜处理函数（由浏览器调用，**别写成 **`fn()`）。

### 2.2 事件名 + 冒泡属性

| 事件名 | 冒泡 | 可取消 | 何时触发 |
| --- | --- | --- | --- |
| `click` | 是 | 是 | 按下并松开 |
| `dblclick` | 是 | 是 | 双击 |
| `mousedown` / `mouseup` | 是 | 是 | 按下 / 松开 |
| `mousemove` | 是 | 是 | 移动（**触发极频繁**） |
| `mouseenter` / `mouseleave` | **否** | 否 | 只在自己边界进出各一次 |
| `mouseover` / `mouseout` | **是** | 是 | 进**子元素**也会触发 |
| `contextmenu` | 是 | 是 | 右键 |
| `focus` / `blur` | **否** | **否** | 获得 / 失去焦点 |
| `focusin` / `focusout` | **是** | 否 | 同上，只是会冒泡 |
| `keydown` | 是 | 是 | 按下键 |
| `keyup` | 是 | 是 | 松开键 |
| `keypress` | — | — | ⚠️ **已废弃** |
| `submit` | 是 | 是 | 表单提交 |
| `input` | 是 | 否 | 输入内容变化 |
| `scroll` | 否 | 否 | 滚动 |
| `touchstart` / `touchmove` / `touchend` | 是 | 是 | 触摸三件套 |

**能获得焦点的元素**：`input` / `textarea` / `select` / `button` / 带 `href` 的 `a` / 任何带 `tabindex` 的元素。

### 2.3 三个"差别"（事件部分的核心价值）

| 对比 | 结论 |
| --- | --- |
| `addEventListener` vs `onclick` | 前者挂列表（多个、按顺序）；后者改属性（只留最后一个） |
| `mouseenter` vs `mouseover` | 前者不冒泡、只认自己边界 → **做 hover 用它**；后者冒泡、进子元素也触发 |
| `focus` vs `focusin` | 前者不冒泡 → **做不了事件委托**；后者可以 |

⚠️ MDN 对 `mouseover` 的明确结论：「由于层次结构很深，发送到 `mouseover` 事件可能相当多，并导致严重的性能问题。在这种情况下，**最好是监听 **`mouseenter`** 事件**。」

### 2.4 重复绑定与解绑的匹配规则

| 场景 | 结果 |
| --- | --- |
| 同一函数引用绑两次 | **只算一次** |
| 两个内容相同的**匿名函数** | **算两个** |
| `removeEventListener` 传的不是同一个引用 | **解绑失败，且不报错** |
| `addEventListener(..., true)` 后不带 `true` 解绑 | ❌ `capture` 不匹配，无效 |

MDN：「唯一需要 `removeEventListener()` 检测的是 `capture` / `useCapture` 标志。**这个标志必须匹配**，但是其他的值不需要。」

**实践规则**：需要在循环里绑事件、或之后要解绑 → **一律用具名函数**。

**真需要解绑的场景**：定时器里绑的事件 / 只需生效一次的动作 / 单页应用切页面。

### 2.5 事件对象 `e`

**来源**：浏览器收到交互 → **新建一个 **`Event`** 对象** → 调用处理函数 → 当**第一个（也是唯一）实参**塞进去。
MDN：「事件监听器**仅仅接受事件对象这一个自动传入的参数**，并且它的**返回值还会被忽略**。」

| C++17 | JS |
| --- | --- |
| 自定义回调签名，如 `void handler(const EventData& e)` | `function (e) {}` |
| 参数个数与来源由应用或库约定 | DOM 监听器自动收到 e；target 与 currentTarget 角色不同 |
| 取消协议需自行定义 | addEventListener 忽略返回值；用 Event 方法控制传播/默认动作 |

| 成员 | 是什么 |
| --- | --- |
| `e.type` | 事件类型字符串 |
| `e.target` | **真正触发**的那个（最深的）元素，**会变** |
| `e.currentTarget` | **绑监听器**的那个元素，**不变**；**出了处理函数是 **`null` |
| `e.preventDefault()` | 阻止默认行为 |
| `e.stopPropagation()` | 阻止传播 |
| `e.clientX` / `offsetX` / `pageX` | 鼠标坐标 |
| `e.key` / `e.code` | 键盘按键 |

⭐ **核心：**`e.target`** ≠ **`e.currentTarget`**。** 监听器绑在 `ul` 上、点到某个 `li` 时：`e.target` 是那个 `li`，`e.currentTarget` 是 `ul`。

**两种"几乎一样"的报错要分清**

| 报错 | 含义 | 病根 |
| --- | --- | --- |
| `... of **null** (reading 'x')` | 查的元素不存在 | `querySelector` 没查到 |
| `... of **undefined** (reading 'x')` | 这个名字压根没定义 | **忘了写形参 **`e` |

`return false`** 的三种处境**

| 写法 | 阻止默认行为？ |
| --- | --- |
| `addEventListener('click', function () { return false; })` | **否** —— 返回值被忽略 |
| `onclick="return false"`（HTML 属性） | **是** —— 另一套机制 |
| `e.preventDefault()` | **是** —— 唯一该用的写法 |

### 2.6 键盘事件

| 属性 | 值 | 说明 |
| --- | --- | --- |
| `e.key` | 字符串 | **推荐**。`'a'` / `'Enter'` / `'ArrowUp'` / `'Escape'` |
| `e.code` | 字符串 | **物理按键位置**，忽略键盘布局：`'KeyY'` / `'Space'` |
| `e.keyCode` | 数字 | ⚠️ **已废弃**。`13` = 回车 |
| `e.repeat` | 布尔 | 是否"按住不放"引发的自动重复 |

- **全局快捷键绑 **`document` —— 键盘事件只发给**有焦点**的元素。
- 按住不放会持续触发 `keydown` → 要"只执行一次"就 `if (e.repeat) { return; }`。
- ⭐ **处理文本输入别用键盘事件，用 **`input`** 事件** —— MDN 明确建议。原因：中文输入法 / 粘贴 / 手写板都不给 `keydown`。

### 2.7 `this`（够用版）

```
e.target         →  真正触发的那个（会变）
e.currentTarget  →  绑监听器的那个（不变）
this             →  永远 === e.currentTarget（事件处理函数里）
```

| C++17 | JS |
| --- | --- |
| this 的类型受成员函数约束，地址取决于调用对象 | 普通函数 this 由调用形式决定；箭头函数沿用词法 this |

⚠️ **完整模型（对象方法 / **`call`**·**`apply`**·**`bind`** / 箭头函数没有自己的 **`this`**）属进阶篇。**
**实战建议：能用 **`e.currentTarget`** 就别用 **`this`**。**

### 2.8 事件流：三个阶段

```
① 捕获阶段  由外向内  document → div → button   ← 绑在祖先 + capture:true 的监听器在这触发
② 目标阶段  到达目标  真正被点的那个元素          ← 绑在目标自己身上的监听器在这触发
③ 冒泡阶段  由内向外  button → div → document   ← 绑在祖先 + 默认的监听器在这触发
```

- **冒泡无法关闭**，只能在处理器里截断。
- ⚠️ **「注册」≠「触发阶段」**：注册 = 写下 `addEventListener` 那一刻；冒泡阶段 = 将来事件真的发生时监听器**被调用的时机**。
- ⚠️ **目标元素不在这个选择题里**：MDN —— 「对于**事件目标**上的事件监听器来说，事件会处于"**目标阶段**"，而不是冒泡阶段或者捕获阶段。」
- **只有两种场合需要 **`capture: true`：① 想在事件**到达子元素之前**先手截住；② 在祖先上接住**不冒泡**的事件。

```js
元素.addEventListener('click', fn, true);              // 简写
元素.addEventListener('click', fn, { capture: true });  // 完整写法（推荐）
```

### 2.9 ⭐ 三个"拦截"是三个独立开关

```
① 事件发生 → ② 沿树传播 → ③ 监听器逐个执行 → ④ 浏览器执行默认动作
              ↑ 闸门A          ↑ 闸门B              ↑ 闸门C
```

| 闸门 | 管什么 | **不**管什么 |
| --- | --- | --- |
| `e.stopPropagation()` | 事件**还给不给祖先** | 浏览器的默认动作 |
| `e.stopImmediatePropagation()` | 同一元素上**后面的监听器** | 传播、默认动作 |
| `e.preventDefault()` | 浏览器的**默认动作** | **事件照常继续传播** |

MDN（`preventDefault`）：「告诉用户代理：此事件被显式处理，它**默认的动作**（例如页面滚动、链接跳转或粘贴文本）不应该照常执行。」紧接着：「**此事件仍会继续传播**」。

⚠️ **C++17 无标准 DOM 事件系统**：浏览器把传播控制与默认动作控制分成独立方法，不能用自定义回调的返回值推导。
C++17 标准库没有统一的“取消默认动作”事件 API；这是浏览器 DOM 的平台能力。

`preventDefault`** 的两个静默失效场景**

| 场景 | MDN 原话 |
| --- | --- |
| 事件**不可取消**（如 `focus` / `blur`） | 「调用 `preventDefault()` **没有任何效果**」；用 `Event.cancelable` 检查 |
| 监听器是 **passive** | 「不会发生任何事情，并且可能会生成**控制台警告**」 |

**有效时机**：MDN「在**事件流的任何阶段**调用都会取消事件」。

**常用落点**

| 目标 | 绑什么事件 |
| --- | --- |
| 链接不跳转 | `click` |
| 表单不刷新 | `submit`（⚠️ 别绑按钮的 `click` —— 按回车提交时没有 `click`） |
| 禁右键菜单 | `contextmenu` |

### 2.10 事件委托

MDN：「在它们的**父元素上设置事件监听器**，让发生在它们身上的事件**冒泡到它们的父元素上**，而不必在每个子元素上单独设置事件监听器。」

```js
父元素.addEventListener('click', function (e) {
  if (e.target.tagName !== 'LI') { return; }   // ① 身份检查（必做）
  e.target.classList.add('hot');               // ② 直接操作那个孩子
});
```

| 每个子元素各绑一次 | 事件委托 |
| --- | --- |
| ×N 个监听器 | ×1 个监听器 |
| 新增元素**必须手动再绑** | 新增元素**自动生效** ⭐ |
| 逻辑散落 N 处 | 逻辑只有一处 |

**能 / 不能委托**

| 事件 | 能委托吗 | 替代 |
| --- | --- | --- |
| `click` / `keydown` / `mousemove` | ✅ 会冒泡 | — |
| `focus` / `blur` | ❌ 不冒泡 | `focusin`** / **`focusout` |
| `mouseenter` / `mouseleave` | ❌ 不冒泡 | 只能换用 `mouseover`（接受性能代价） |

**四个坑**

1. `e.target` 可能是容器自己或更深的后代 → **必须身份检查**。
2. **不冒泡的事件全都不能委托**。
3. 子元素里写 `stopPropagation()` 会**直接掐死父元素的委托**。
4. 孩子们逻辑各异时，硬套委托反而绕。

> **C++17 对照**：DOM 委托沿节点包含关系传播；C++ 虚函数沿类型关系分派，异常沿调用栈传播。只可借“寻找处理者”的抽象思路，路径与停止规则均不同。

### 2.11 页面加载与滚动

|   | `DOMContentLoaded` | `load` |
| --- | --- | --- |
| 触发时机 | HTML 解析完 + **延迟脚本**执行完 | **所有依赖资源**（图片 / 样式 / 子框架）加载完 |
| 绑在哪个对象 | `document` | `window` |
| 可取消 | **不可取消** | **不可取消** |

⚠️ **MDN 点名的常见错误**：「有一个常见的错误就是在 `DOMContentLoaded` 事件**更合适时使用了 **`load`** 事件**。」
→ **只是要操作元素 → **`DOMContentLoaded`**；真需要图片真实宽高 → 才用 **`load`**。**

⚠️ `load`** 的特殊备注**：「**所有以 **`load`** 命名的事件都不会传递到 **`Window`** 上**」→ 必须**直接绑 **`window`。

**解决"script 放 head 拿不到元素"的三种解法**

| 解法 | 写法 | 评价 |
| --- | --- | --- |
| 放 `</body>` 前 | — | 简单；脚本大时首屏慢 |
| 包进事件 | `document.addEventListener('DOMContentLoaded', fn)` | 常用 |
| `defer` 属性 | `<script defer src="x.js">` | 现代做法 |

⭐ **真坑：监听器加晚了 → 回调永不执行。** MDN：「在你的脚本有机会运行前，`DOMContentLoaded` 可能就已经被触发。所以**最好先检查一下**。」
`document.readyState`：`'loading'` → `'interactive'`（≈ `DOMContentLoaded`）→ `'complete'`（≈ `load`）。

`scroll`

```js
window.addEventListener('scroll', function () {
  const top = document.documentElement.scrollTop;   // 读页面滚了多少
  document.documentElement.scrollTop = 0;           // 写 → 回到顶部
});
```

- 绑 `window`（整页滚动）或绑**有滚动条的元素**。
- 读距离用 `document.documentElement.scrollTop`（老教程的 `document.body.scrollTop` 不通用）。
- **高频事件**，里面别做重活。

### 2.12 触摸事件

| 事件 | 时机 |
| --- | --- |
| `touchstart` | 手指落下（触发一次） |
| `touchmove` | 滑动中（**反复触发**） |
| `touchend` | 手指离开 |
| `touchcancel` | 被系统打断 |

| 列表 | 装什么 |
| --- | --- |
| `e.touches` | 此刻**还在平面上**的所有触点 |
| `e.targetTouches` | 上面那些里、**起始于当前元素**的 |
| `e.changedTouches` | **本次事件里状态发生变化**的触点 |

⭐ **必背：**`touchend`** 时 **`e.touches`** 是空的** —— 要拿刚抬起的那个点，必须读 `changedTouches`。

⚠️ `preventDefault()`** 在触摸事件上默认无效** —— MDN：「Chrome 从版本 56 开始，`touchstart` 和 `touchmove` 的 `passive` 选项的**默认值就是 **`true`……将 `passive` 设置成 `false` 就行。」
→ 写法：`el.addEventListener('touchmove', fn, { passive: false })`

⚠️ **别用 touch 事件替代 **`click` —— MDN：「在很多情况下，**触摸事件和鼠标事件会一起触发**」→ 两套都绑，一次点击逻辑会跑两遍。

---

## 3. 尺寸与坐标

### 3.1 三套鼠标坐标（差别只在"从哪量起"）

| 坐标 | 从哪量起 | 特点 |
| --- | --- | --- |
| `e.offsetX` / `offsetY` | `e.target` 的左内边 | ⚠️ 跟的是 `target`，点到子元素上参照点就换了 |
| `e.clientX` / `clientY` | **视口**（可视区） | 不含滚动 |
| `e.pageX` / `pageY` | **文档** | 含滚动距离 ⭐ 常用 |

### 3.2 尺寸三兄弟

| 属性 | 含什么 | C++17 对照 |
| --- | --- | --- |
| `el.offsetWidth` | 内容 + 内边距 + 边框 + 滚动条 | `GUI 框架控件宽度（无标准 C++ API）` |
| `el.clientWidth` | 内容 + 内边距（**不含边框**） | `GUI 框架客户区宽度（无标准 C++ API）` ✅ |
| `el.scrollWidth` | 含**溢出**的内容 | — |

- **都是整数** —— 要小数用 `getBoundingClientRect()`（课程外）。
- `display: none` 时**全 0**。
- **内联元素** `clientWidth` 为 **0**。

### 3.3 位置

| 属性 | 相对谁 |
| --- | --- |
| `el.offsetLeft` / `offsetTop` | ❌ `el.offsetParent` —— 最近的一个「**有定位**」的祖先（`position` 不是 `static`）；一路找不到就到 `<body>` |

⚠️ **这是最容易搞错的一条**：父元素**没有** `position` 时，`offsetLeft` 会**跳过它**一路往上找。想拿"相对直接父元素"的位置，**不要用 **`offsetLeft`。

---

## 4. 日期与时间戳

### 4.1 创建

| 写法 | 含义 |
| --- | --- |
| `new Date()` | 现在这一刻 |
| `new Date(1792022400000)` | 毫秒时间戳 |
| `new Date('2026-10-15')` | 字符串，**只有日期 → 按 UTC 解析** |
| `new Date('2026-10-15T08:30:00')` | 字符串，**带时间 → 按本地解析** |
| `new Date(2026, 9, 15)` | 年、**月索引 0-11**、日 |

### 4.2 读取（⚠️ 两张错位表）

| 想要 | JS | C++17 | 错位 |
| --- | --- | --- | --- |
| 年 | `getFullYear()` | `std::tm::tm_year + 1900` | 需先将时间转为 std::tm |
| 月 | `getMonth()` → **0-11** | `std::tm::tm_mon` → 0-11 | ⚠️ 需先转换为日历时间 |
| **几号** | `getDate()` → 1-31 | `std::tm::tm_mday` → 1-31 | ⚠️ C++ 使用 `std::tm` 日历结构 |
| **星期几** | `getDay()` → 0-6（0=周日） | `std::tm::tm_wday` → 0-6（0=周日） | ⚠️ 需先转换为日历时间 |
| 时 / 分 / 秒 | `getHours()` / `getMinutes()` / `getSeconds()` | `std::tm::tm_hour` / `tm_min` / `tm_sec` | ⚠️ 需先转换为日历时间 |

**一句话**：JS 用 `getDay()` 表示星期、`getDate()` 表示几号；C++17 需从 `std::tm` 字段读取，字段名不同。

### 4.3 格式化

| 写法 | 输出示例 | 备注 |
| --- | --- | --- |
| `d.toLocaleDateString()` | `2026/10/15` | ⚠️ 格式跟随用户**系统区域** |
| `d.toLocaleString()` | `2026/10/15 20:18:19` | 同上 |

⚠️ **要固定格式就自己拼或用库** —— C++17 `<chrono>` 没有 C++20 日历格式化能力；JS 本地化格式也受区域设置影响。

### 4.4 时间戳（⚠️ 单位与起点）

| 来源 | 单位 | 起点 | 与 JS 的关系 |
| --- | --- | --- | --- |
| `Date.now()` / `d.getTime()` | **毫秒** | 1970-01-01 UTC | —— |
| Unix 时间戳（多数后端 / PHP） | **秒** | 1970-01-01 UTC | `毫秒 ÷ 1000` |
| C++17 `system_clock` 时间点 | 周期由实现定义 | epoch 由实现定义 | ⚠️ 转 Unix 毫秒需确认实现/平台约定 |
| C++17 `duration` 计数 | 周期由类型定义 | 不适用 | ❌ 计数本身没有固定纪元 |

- **C++ `duration` 的周期由类型定义；传输时显式转换为约定的秒或毫秒。**
- 🔥 **秒 / 毫秒差 1000 倍 = 前后端联调第一颗雷。** 判别：**10 位数 = 秒，13 位数 = 毫秒。**
- ⚠️ **精度可能被浏览器取整**（Firefox 默认 2ms，反指纹可到 100ms）→ **别用它做高精度测量**。

### 4.5 非法日期

| 输入 | 结果 |
| --- | --- |
| `new Date('乱写')` | `Invalid Date`（**不抛异常**） |
| `new Date(null)` | 1970-01-01（`null` → `0`） |
| `new Date(undefined)` | `Invalid Date`（`undefined` → `NaN`） |

检查办法：`isNaN(d.getTime())` → `true` 表示非法。
⚠️ `if (d)` **恒为真** —— `Invalid Date` 是**真值**。

### 4.6 ⭐ 倒计时的两条铁律

```js
const target = new Date('2026-12-31T00:00:00').getTime();

const id = setInterval(function () {
  const rest = Math.floor((target - Date.now()) / 1000);   // ① 用「目标 − 现在」算
  if (rest <= 0) {
    clearInterval(id);                                      // ② 到点必须停
    return;
  }
  // 再换算成 天 / 时 / 分 / 秒
}, 1000);
```

① **不能用"每秒减 1"** —— `setInterval` 真实间隔 ≥ 1000ms，页面卡一下就会少扣。
② **忘了 **`clearInterval`** 是最常见的性能漏点。**

---

## 5. BOM：window / 定时器 / 事件循环

### 5.1 `window` 是全局对象

|   | 管什么 | 顶层对象 | 有正式标准吗 |
| --- | --- | --- | --- |
| DOM | 页面**内容** | `document` | ✅ W3C / WHATWG |
| **BOM** | **浏览器本身** | `window` | ⚠️ 长期无标准，后由 HTML 规范收编 |

`document` / `location` / `setTimeout` / `console` **全都是 **`window`** 的属性**，`window.` 前缀可省。

```js
var a = 1;   let b = 2;
window.a     // 1          ← var 挂到了 window 上
window.b     // undefined  ← let / const 不挂
```

⚠️ **别用 **`name`** 当全局变量名** —— `window.name` 是浏览器内置属性。

| 常用成员 | 是什么 |
| --- | --- |
| `window.innerWidth` / `innerHeight` | **视口**宽高（不含滚动条） |
| `window.location` | 地址栏 |
| `window.navigator` | 浏览器信息 |
| `window.history` | 历史记录 |
| `alert` / `confirm` / `prompt` | 三个弹窗（调试用，别上线） |
| `setTimeout` / `setInterval` | 定时器 |

### 5.2 定时器

```js
const id = setTimeout(要做的事, 毫秒);
clearTimeout(id);
```

|   | `setTimeout` | `setInterval` |
| --- | --- | --- |
| 执行 | **一次** | **反复** |
| C++17 对照 | 浏览器定时器回调（C++17 需自行调度；sleep 会阻塞线程） | 浏览器宿主定时器 |

**⚠️ 最容易写错的一行**

| ✗ | 后果 | ✓ |
| --- | --- | --- |
| `setTimeout(closeAd(), 5000)` | **立刻调用** `closeAd`，把返回值交给定时器 → 定时器永不生效，**且不报错** | `setTimeout(closeAd, 5000)` |

**延时不准的两个来源**（MDN）

1. **最小延时**：嵌套调用多层后被强制到 **4ms**。
2. **后台节流**：标签页在后台时可能被压到 **1000ms 或更长**。
→ **别用定时器做"精确计时"。**

### 5.3 事件循环

```js
console.log(1);
setTimeout(function () { console.log(2); }, 0);
console.log(3);
// 输出：1 3 2
```

| 现象 | 结论 |
| --- | --- |
| `setTimeout(fn, 0)` **不等于**立刻执行 | 它表示「**等当前同步代码全部跑完**再说」 |
| 第二个参数是**最早**等待时间 | 到点只是「排进队列」，还要等队伍 |
| `setInterval` 的"每隔 1 秒"实际是"**至少** 1 秒" | 定时器只是把回调排进队列 |

---

## 6. location / navigator / history

### 6.1 `location` —— 浏览器端的"路由"

以 `https://localhost:5001/products/detail.html?id=101#reviews` 为例：

| 属性 | 值 | 备注 |
| --- | --- | --- |
| `protocol` | `'https:'` | ⚠️ **带冒号** |
| `host` | `'localhost:5001'` | 主机 + 端口 |
| `hostname` | `'localhost'` | 只要主机 |
| `port` | `'5001'` | 只要端口 |
| `pathname` | `'/products/detail.html'` | 路径 |
| `search` | `'?id=101'` | ⚠️ **含开头的 **`?` |
| `hash` | `'#reviews'` | ⚠️ **含开头的 **`#` |
| `href` | 上面一整串 | **赋值 = 跳转** |

**跳转三兄弟**

| 写法 | 动作 | 后退能回来吗 |
| --- | --- | --- |
| `location.href = 'a.html'` | 跳转（等价 `assign`） | ✅ 能 |
| `location.replace('a.html')` | 跳转并**替换当前历史记录** | ❌ **不能**（登录成功跳首页用它） |
| `location.reload()` | 刷新当前页 | —— |

**取查询参数**

```js
// location.search = '?id=101&name=abc'
const str   = location.search.slice(1);   // 'id=101&name=abc'
const parts = str.split('&');
for (let i = 0; i < parts.length; i++) {
  const pair = parts[i].split('=');
  console.log(pair[0], '=', pair[1]);
}
```

课程外的一行写法：`new URLSearchParams(location.search).get('id')`。

**后端 ↔ 前端对照（全栈缝合线）**

| 服务端 Web 框架 | 浏览器 |
| --- | --- |
| `RedirectTo可调用对象("Detail", new { id = 101 })` | `location.href = 'detail.html?id=' + id` |
| `[FromQuery] int id` | `location.search` 解析 |

### 6.2 `navigator`

| 成员 | 是什么 |
| --- | --- |
| `navigator.userAgent` | 用户代理字符串 ⭐ **后端 **`Request.Headers["User-Agent"]`** 读的是同一个字符串** |
| `navigator.language` | 浏览器语言 |
| `navigator.onLine` | 是否联网（粗略） |
| `navigator.clipboard` | 剪贴板 |
| `navigator.geolocation` | 定位（会弹权限） |

⚠️ **可随意伪造**，浏览器互相伪装（Chrome 的 UA 里至今有 `Safari`）→ **优先特性检测** `if ('geolocation' in navigator)`。

### 6.3 `history` 与 `pushState`

| 方法 | 干什么 |
| --- | --- |
| `history.back()` / `history.go(-1)` | 后退一页 |
| `history.forward()` / `history.go(1)` | 前进一页 |
| `history.go(0)` | **刷新当前页** |

⭐ `pushState`** 是"整页重载"的对手**

|   | `location.href = 'a.html'` | `history.pushState(null, '', 'a.html')` |
| --- | --- | --- |
| 地址栏 | 变 | 变 |
| 发新请求 | ✅ 发 | ❌ **不发** |
| 页面 | **整页重载**，变量 / DOM 全清零 | **纹丝不动** |
| 用户按 F5 | —— | ⚠️ **浏览器真去请求 **`a.html` |

> **前端改了地址，但刷新时接它的是后端。**
> → 后端必须配兜底路由（服务端 Web 框架：服务器配置 SPA fallback 到 `index.html`）。**这是 SPA 部署最经典的坑。**

---

## 7. 本地存储与 JSON

### 7.1 三种存储

|   | 本地存储 | 会话存储 | `cookie` |
| --- | --- | --- | --- |
| 存活期 | **除非手动清，一直在** | **关标签页就没** | 默认关浏览器就没；**可设过期** |
| 容量 | 约 5MB | 约 5MB | 约 **4KB** |
| 随 HTTP 请求发给服务器 | ❌ | ❌ | ✅ **会**（cookie 唯一的意义） |
| 后端能读到 | ❌ | ❌ | ✅ |

**四个方法**

```js
localStorage.setItem('键', '字符串值');    // 存
localStorage.getItem('键');               // 取；没有 → null
localStorage.removeItem('键');            // 删
localStorage.clear();                     // 全清（本域名下全部，危险）
```

**四条硬坑**

| ✗ | 实际发生 | ✓ |
| --- | --- | --- |
| `setItem('user', {name:'张三'})` | 得到 `'[object Object]'`，**数据全丢且不报错** | `JSON.stringify(obj)` 后再存 |
| `getItem('count') + 1` | `'51'`（字符串拼接） | `Number(...) + 1` |
| 换端口调试，以为能共享 | `localhost:5000` 与 `:5001` **不同源，不共享** | 开发时统一端口或用代理 |
| `localStorage.length = 1` | 顶掉**内置属性** | 一律用 `setItem`/`getItem`，**别用点号** |

### 7.2 `JSON`

| 方法 | 方向 | 记忆 | C++17 对照 |
| --- | --- | --- | --- |
| `JSON.stringify(值)` | 对象 → 字符串 | **字符串化** | `JsonSerializer.Serialize` |
| `JSON.parse(字符串)` | 字符串 → 对象 | **解析** | `JsonSerializer.Deserialize<T>` |

**标准写法**

```js
localStorage.setItem('user', JSON.stringify(user));               // 存

const user = JSON.parse(localStorage.getItem('user') || 'null');  // 取（兜底不能省）
```

⭐ `JSON` **会保留类型**（数字还是数字、布尔还是布尔）。

**五条必须知道的**

1. **JSON 是字符串格式，不是 JS 对象**：key 必须双引号；**不能有注释、函数、**`undefined`。
2. `undefined`** 和函数会被丢掉**，**不报错**。
3. **脏字符串会抛 **`SyntaxError`（少见的"会报错"时刻）：`JSON.parse('abc')` ✗、`JSON.parse('')` ✗；但 `JSON.parse(null)`** → **`null`（不报错）。
4. `parse`** 之后要校验** —— 数据经过了**用户的地盘**：
   ```js
   let user = JSON.parse(localStorage.getItem('user') || 'null');
   if (user === null || typeof user.name !== 'string') { user = { name: '游客' }; }
   ```
5. **循环引用会抛 **`TypeError`。

⚠️ **兜底为什么不能省**：首次访问 `getItem` 返回 `null` → 后面 `.push()` 就炸。

### 7.3 ⚠️ 安全铁律

**本地存储坐在用户电脑上，F12 → Application 双击就能改。**

- ✅ 可存：主题偏好、上次看的标签、草稿、本地缓存
- ❌ **绝不存**：密码、token 明文、余额、"我是不是 VIP"、"这条数据能不能删"

> **凡是"改了这个值就能占便宜"的判断，必须由后端说了算。**

**⭐ 一条架构级结论**：

> 前端存储 = **缓存的、可丢弃的、可被篡改的"副本"**；**权威数据永远在服务器**。
> 前端读出来只是"为了少发一次请求"，**动手前仍要向后端确认**。

---

## 8. 数组 map / join 与数据驱动

### 8.1 `map` 与 `join`

| C++17 | JS | 差异 |
| --- | --- | --- |
| `std::transform` 配合输出容器与 Lambda | `arr.map(function (x) { return f(x); })` | ⚠️ C++ 需显式准备输出范围/容器 |
| 自行拼接或使用字符串工具库 | `arr.join('-')` | ⚠️ C++17 标准库没有通用 join |

```js
const doubled = [1, 2, 3].map(function (item, index) {
  return item * 2;      // ① 必须 return
});
// [2, 4, 6]
```

| 要点 | 说明 |
| --- | --- |
| **必须 **`return` | ⚠️ 忘了 → 一数组 `undefined`，**不报错** |
| 长度 | **和原数组一样**（一对一） |
| 原数组 | **不变**（返回新数组） |

```js
['a','b','c'].join()      // 'a,b,c'（**不传参默认逗号**）
['a','b','c'].join('')    // 'abc'   ⭐ 渲染 HTML 必须用这个
```

### 8.2 ⭐ 渲染三步式（背下来）

```js
const html = 数组.map(function (item) {
  return '<li>' + item.name + '</li>';
}).join('');          // ⚠️ 空引号不能省，否则页面上多出逗号

容器.innerHTML = html;
```

### 8.3 数据驱动：四条铁律

1. **唯一的真相在数据里** —— 数组是原件，页面是复印件
2. **渲染是一个函数** —— 清空容器 + `map` / `join` 重画
3. **任何操作同一条路**：**改数据 → 存起来 → 重新渲染**
4. **绝不当场改 DOM**

**违反第 4 条的症状**：删了一行 → 页面看着对了 → **再添加一条时，删掉的那条又回来了**（因为数组里还在）。
**原因**：数据和页面各说各话。

> ⭐ **这就是 Vue / React 替你干的事** —— "数据一变，自动重画"。**手写一遍，是为了理解框架在替你做什么。**
> **对照 C++17**：数据与展示分离可迁移，但标准库不提供 UI 自动绑定。原生 JS 改数据后也要显式渲染；框架同步是额外能力。

**学号（不重复 ID）的生成**

```js
Date.now()          // ⭐ 课程用的：毫秒时间戳，删过也不会重号
arr.length + 1      // ⚠️ 删过之后会重号
```

⚠️ 生成的 `id` 是**数字**，而 `data-id` 取出来是**字符串** → 比较时用 `String()` 对齐。

---

## 9. 正则

### 9.1 基本

```js
const reg1 = /abc/;               // 字面量（推荐）
const reg2 = new RegExp('abc');   // 构造函数（模式需要拼接时）
reg.test(字符串);                  // true / false ⭐ 表单校验主力
字符串.replace(reg, '新');         // 替换
```

**对照 C++17**：`std::regex` 可作功能参照，但正则语法存在差异，需按 ECMAScript grammar 核验。

### 9.2 六个部件

| 部件 | 写法 |
| --- | --- |
| **字符类** | `[abc]` `[a-z]` `[^abc]`（⚠️ `[ ]`** 里的 **`^`** 是"非"**，与外面的 `^` 是两回事） |
| **预定义类** | `\d`(数字) `\D` `\w`(字母数字下划线) `\W` `\s`(空白) `\S` `.`(⚠️ **不含换行**) |
| **边界符** | `^` 开头　`$` 结尾 |
| **量词** | `*`(0+) `+`(1+) `?`(0或1) `{n}` `{n,}` `{n,m}` |
| **修饰符** | `i` 忽略大小写　`g`** 全局**　`m` 多行 |
| **分组** | `( )` 让量词作用于一组 |

### 9.3 ⚠️ 两条最容易踩的规则

**① 默认"包含"即匹配**

```js
/abc/.test('xxabcyy')     // true  ← 包含 abc 就算通过！
/^abc$/.test('xxabcyy')   // false ← 加了边界符必须整串相同
```

→ **表单校验必须自己加 **`^ $`**。** 不加的话校验"必须是 zhangsan"，`zhangsan123` 也会通过。

**② 量词只管"紧挨着它的那一个字符"**

```js
/^ab+$/     // 一个 a + 1 个或多个 b   ← 不是 "ab" 整体重复！
/^(ab)+$/   // "ab" 这个整体重复
```

### 9.4 `replace` 与 `g`

```js
'abcabc'.replace('a', 'x')       // 'xbcabc'   ← 只换第一个
'abcabc'.replace(/a/, 'x')       // 'xbcabc'   ← 正则不加 g 也只换第一个
'abcabc'.replace(/a/g, 'x')      // 'xbcxbc'   ← ⭐ 加 g 才换全部
'2026-10-15'.replace(/-/g, '/')  // '2026/10/15'
```

⚠️ **"只替换了第一个"是最容易中的坑，不报错。**
**对照 C++17**：`std::regex_replace` 默认替换所有匹配项；JS **默认只换第一个** —— 真实的语义差异。

### 9.5 常用校验正则（背下来）

```js
const RE_PHONE    = /^1[3-9]\d{9}$/;                       // 中国大陆手机号
const RE_USERNAME = /^[a-zA-Z0-9_-]{3,16}$/;               // 用户名
const RE_PWD      = /^[a-zA-Z0-9_-]{6,16}$/;               // 密码
const RE_EMAIL    = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

⚠️ **正则判不出"真的存在"** —— **正则只管格式，有效性必须靠后端**（发验证邮件）。

### 9.6 最容易写错的六行

| 你写的 | 实际发生 | 结果 |
| --- | --- | --- |
| `/abc/.test('xxabcyy')` | 默认"包含"即匹配 | `true` —— **校验形同虚设** |
| `/^abc/.test('abcx')` | 只锚开头 | `true`；想拒绝必须加 `$` |
| `/^ab+$/` 以为匹配 "abab" | `+` 只管紧邻的 `b` | `false`；要写 `/^(ab)+$/` |
| `str.replace('-', '/')` | 只换第一个 | `'2026/10-15'`；要全换用 `/-/g` |
| `new RegExp('^\d$')` | 字符串里 `\d` 被吃掉 | 需写 `'^\\d$'` |
| `if (reg.test(v))` 当成"不通过" | `test` 返回的是"**通过**" | ⚠️ 判断不通过要写 `if (!reg.test(v))` |

---

## 10. 六个速查骨架

### 10.1 渲染三步式

```js
const html = 数组.map(function (item) { return '<li>' + item.name + '</li>'; }).join('');
容器.innerHTML = html;
```

### 10.2 事件委托

```js
父元素.addEventListener('click', function (e) {
  if (e.target.tagName !== 'LI') return;   // 身份检查不能省
  const id = e.target.dataset.id;          // 从 data- 上认人
});
```

### 10.3 表单校验

```js
function check某字段() {
  if (!/正则/.test(输入框.value)) {     // ⚠️ 最容易漏的 !
    提示.innerText = '错误信息';
    return false;
  }
  提示.innerText = '√';
  return true;
}

// 提交时：
e.preventDefault();                     // ⚠️ 必须拦
if (!checkA()) return;
if (!checkB()) return;
// 全过 → 跳转 / 提交
```

### 10.4 存取

```js
localStorage.setItem('键', JSON.stringify(值));
const 值 = JSON.parse(localStorage.getItem('键') || 'null');
```

### 10.5 坐标计算（放大镜）

```js
let x = e.pageX - box.offsetLeft - mask.offsetWidth / 2;   // 遮罩位置
big.style.backgroundPosition = (-x * 倍率) + 'px ' + (-y * 倍率) + 'px';  // 背景反向
```

⚠️ 前提：`box` 必须有 `position: relative`（否则 `offsetLeft` 参照系错）；背景值**必须带 **`px`。

### 10.6 倒计时

```js
const rest = Math.floor((target - Date.now()) / 1000);   // 用减法，不用每秒减 1
if (rest <= 0) { clearInterval(id); return; }            // 到点必须停
```

---

三：代码

## 1. 待办清单 —— 串起 17 个知识点

**用到**：①DOM ②查询 ③`innerHTML` ⑥`classList` ⑦`value` ⑧`data-` ⑩监听 ⑬键盘 ⑭事件对象 ⑱委托 ㉜存储 ㉝`JSON` ㉞`map`/`join` ㉟数据驱动 ㊱㊲正则。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; }
    #list { list-style: none; padding: 0; }
    #list li { padding: 8px 0; border-bottom: 1px solid #eee; }
    #list li button { float: right; }
    #tip { color: #c00; height: 20px; }
    .done { text-decoration: line-through; color: #999; }
  </style>
</head>
<body>
  <h1>我的待办（<span id="count">0</span> 项）</h1>

  <input id="todo" placeholder="输入内容后回车">
  <button id="add">添加</button>
  <p id="tip"></p>

  <ul id="list"></ul>

  <script>
    const todoIn = document.querySelector('#todo');
    const list   = document.querySelector('#list');
    const tip    = document.querySelector('#tip');
    const count  = document.querySelector('#count');

    // 唯一的真相：这个数组。页面加载时从存储恢复
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');

    function render() {
      const html = todos.map(function (t, i) {
        return '<li>' +
                 '<span data-index="' + i + '">' + t.text + '</span>' +
                 '<button data-index="' + i + '">×</button>' +
               '</li>';
      }).join('');

      list.innerHTML = html;
      count.innerText = todos.length;      // ⭐ 计数也从数据算出来
    }

    function save() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    function add() {
      const text = todoIn.value.trim();

      if (!/^\S{1,20}$/.test(text)) {      // 非空 + 长度校验
        tip.innerText = '请输入 1-20 个字，不能只有空格';
        return;
      }
      tip.innerText = '';

      todos.push({ text: text });          // ① 改数据
      save();                              // ② 存
      render();                            // ③ 重画

      todoIn.value = '';
      todoIn.focus();
    }

    document.querySelector('#add').addEventListener('click', add);

    todoIn.addEventListener('keydown', function (e) {     // 回车也能添加
      if (e.key === 'Enter') add();
    });

    list.addEventListener('click', function (e) {         // 事件委托
      const target = e.target;

      if (target.tagName === 'BUTTON') {
        const index = Number(target.dataset.index);       // ⚠️ 取出来是字符串
        todos.splice(index, 1);
        save();
        render();
        return;
      }

      if (target.tagName === 'SPAN') {
        target.classList.toggle('done');                  // 能写类就写类
      }
    });

    render();
  </script>
</body>
</html>
```

## 2. 学生信息表 —— 数据驱动的完整版

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 6px 10px; }
  </style>
</head>
<body>
  <input id="name" placeholder="姓名">
  <input id="age" placeholder="年龄">
  <button id="add">录入</button>
  <button id="clear">清空全部</button>

  <table>
    <thead><tr><th>学号</th><th>姓名</th><th>年龄</th><th>操作</th></tr></thead>
    <tbody id="tbody"></tbody>
  </table>

  <script>
    const tbody  = document.querySelector('#tbody');
    const nameIn = document.querySelector('#name');
    const ageIn  = document.querySelector('#age');

    let students = JSON.parse(localStorage.getItem('students') || '[]');

    function render() {
      const html = students.map(function (s) {
        return '<tr>' +
                 '<td>' + s.id + '</td>' +
                 '<td>' + s.name + '</td>' +
                 '<td>' + s.age + '</td>' +
                 '<td><a href="javascript:;" data-id="' + s.id + '">删除</a></td>' +
               '</tr>';
      }).join('');
      tbody.innerHTML = html;
    }

    function save() {
      localStorage.setItem('students', JSON.stringify(students));
    }

    document.querySelector('#add').addEventListener('click', function () {
      const name = nameIn.value;
      const age  = ageIn.value;

      if (name === '' || age === '') {
        alert('姓名和年龄都要填');
        return;
      }

      students.push({
        id: Date.now(),          // 用时间戳当学号，删过也不会重号
        name: name,
        age: age
      });

      save();
      render();

      nameIn.value = '';
      ageIn.value = '';
    });

    tbody.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;

      const id = e.target.dataset.id;

      const rest = [];
      for (let i = 0; i < students.length; i++) {
        if (String(students[i].id) !== id) {    // 两边都转字符串再比
          rest.push(students[i]);
        }
      }
      students = rest;

      save();
      render();
    });

    document.querySelector('#clear').addEventListener('click', function () {
      students = [];
      save();
      render();
    });

    render();
  </script>
</body>
</html>
```

> **注意三处操作长得多像**：都是 `students` 变一下 → `save()` → `render()`。**这就是数据驱动。**

## 3. 注册表单验证

```html
<!DOCTYPE html>
<html>
<body>
  <p>
    <input id="username" placeholder="用户名（3-16 位字母数字）">
    <span id="usernameTip"></span>
  </p>
  <p>
    <input id="phone" placeholder="手机号">
    <span id="phoneTip"></span>
  </p>
  <p>
    <input id="password" placeholder="密码（6-16 位）" type="password">
    <span id="passwordTip"></span>
  </p>
  <p>
    <input id="agree" type="checkbox"> <label for="agree">我已阅读并同意协议</label>
    <span id="agreeTip"></span>
  </p>

  <button id="submit">注册</button>

  <script>
    const usernameIn = document.querySelector('#username');
    const phoneIn    = document.querySelector('#phone');
    const passwordIn = document.querySelector('#password');
    const agreeIn    = document.querySelector('#agree');

    const usernameTip = document.querySelector('#usernameTip');
    const phoneTip    = document.querySelector('#phoneTip');
    const passwordTip = document.querySelector('#passwordTip');
    const agreeTip    = document.querySelector('#agreeTip');

    function checkUsername() {
      if (!/^[a-zA-Z0-9_-]{3,16}$/.test(usernameIn.value)) {
        usernameTip.innerText = '用户名必须是 3-16 位字母或数字';
        return false;
      }
      usernameTip.innerText = '√';
      return true;
    }

    function checkPhone() {
      if (!/^1[3-9]\d{9}$/.test(phoneIn.value)) {
        phoneTip.innerText = '手机号格式不对';
        return false;
      }
      phoneTip.innerText = '√';
      return true;
    }

    function checkPassword() {
      if (!/^[a-zA-Z0-9_-]{6,16}$/.test(passwordIn.value)) {
        passwordTip.innerText = '密码必须是 6-16 位';
        return false;
      }
      passwordTip.innerText = '√';
      return true;
    }

    function checkAgree() {
      if (agreeIn.checked === false) {          // ⚠️ 用 checked，不是 value
        agreeTip.innerText = '必须同意协议';
        return false;
      }
      agreeTip.innerText = '';
      return true;
    }

    usernameIn.addEventListener('blur', checkUsername);
    phoneIn.addEventListener('blur', checkPhone);
    passwordIn.addEventListener('blur', checkPassword);

    document.querySelector('#submit').addEventListener('click', function (e) {
      e.preventDefault();                       // ⚠️ 拦掉表单默认提交

      if (!checkUsername()) return;
      if (!checkPhone())    return;
      if (!checkPassword()) return;
      if (!checkAgree())    return;

      alert('全部通过，可以提交给后端了');
      // 真实项目里这里就是 fetch 你的 服务端 Web 框架 接口
    });
  </script>
</body>
</html>
```

## 4. 放大镜

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* ⚠️ 中等盒子必须定位，否则下面的 offsetLeft 全部算错 */
    #box { position: relative; width: 200px; height: 200px; cursor: move; }
    #box img { width: 100%; height: 100%; }
    #mask { display: none; position: absolute; left: 0; top: 0;
            width: 100px; height: 100px; background: rgba(255,255,0,.5); }
    #big { display: none; position: absolute; left: 320px; top: 0;
           width: 400px; height: 400px;
           background: url('big.jpg') no-repeat;
           background-size: 800px 800px; }
  </style>
</head>
<body>
  <div id="box">
    <img src="small.jpg" alt="小图">
    <div id="mask"></div>
  </div>
  <div id="big"></div>

  <script>
    const box  = document.querySelector('#box');
    const mask = document.querySelector('#mask');
    const big  = document.querySelector('#big');

    box.addEventListener('mouseenter', function () {
      mask.style.display = 'block';
      big.style.display  = 'block';
    });
    box.addEventListener('mouseleave', function () {
      mask.style.display = 'none';
      big.style.display  = 'none';
    });

    box.addEventListener('mousemove', function (e) {
      // ① 遮罩位置：鼠标点 → 相对盒子 → 让鼠标落在遮罩正中
      let x = e.pageX - box.offsetLeft - mask.offsetWidth / 2;
      let y = e.pageY - box.offsetTop  - mask.offsetHeight / 2;

      // ② 边界限制：不能跑出盒子
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > box.offsetWidth  - mask.offsetWidth)  x = box.offsetWidth  - mask.offsetWidth;
      if (y > box.offsetHeight - mask.offsetHeight) y = box.offsetHeight - mask.offsetHeight;

      // ③ 移动遮罩
      mask.style.left = x + 'px';
      mask.style.top  = y + 'px';

      // ④ 大盒子背景反向移动（倍率 = 大盒子宽 / 遮罩宽 = 4）
      big.style.backgroundPosition = (-x * 4) + 'px ' + (-y * 4) + 'px';
    });
  </script>
</body>
</html>
```

**调试这三件事**

1. 删掉 `#box` 的 `position: relative` → 遮罩跑到别处（`offsetLeft`** 参照系错了**）
2. 去掉 `backgroundPosition` 的 `'px'` → **完全没反应，也不报错**
3. 倍率从 4 改成 2 → 大盒子里的画面跟不上遮罩

---

四：总结

## 1. 13 轮一句话回顾

| 轮 | 知识点 | 一句话 |
| --- | --- | --- |
| 1 | ①②③ | DOM 是一棵**活的对象树**；`querySelector` 找不到返回 `null` **不抛异常** |
| 2 | ④⑤⑥ | 布尔属性写真 `true`；`style` 要带单位；**能写类就写类** |
| 3 | ⑦⑧⑨ | 表单读 `.value`（**永远是字符串**）；`data-` 挂身份证；定时器"至少"不是"精确" |
| 4 | ⑩⑪⑫ | `addEventListener` ≈ `Click +=`；**事件名写错静默失败**；`mouseenter` 不冒泡 |
| 5 | ⑬⑭⑮ | `e.key`；`e.target`（会变）vs `e.currentTarget`（不变）；`this`** 由"谁调用"决定** |
| 6 | ⑯⑰⑱ | 捕获→目标→冒泡；解绑要**同一引用**；**事件委托 = 一个监听器管一片** |
| 7 | ⑲⑳㉑ | **三个拦截是三个独立开关**；`DOMContentLoaded` vs `load`；`offsetLeft`** 相对 **`offsetParent` |
| 8 | ㉒㉓㉔ | `getMonth()` 是 **0-11**；时间戳是**毫秒**；**节点轨 vs 元素轨** |
| 9 | ㉕㉖㉗ | `appendChild` 是**移动**；`cloneNode` 丢监听器；`touchend` 读 `changedTouches` |
| 10 | ㉘㉙㉚ | `window` 是**全局对象**；**单线程 + 队列**；`location` = 浏览器端的路由 |
| 11 | ㉛㉜㉝ | `pushState` 的 F5 会打到后端；存储**只能存字符串**；**后端读不到本地存储** |
| 12 | ㉞㉟㊱ | `map` 可类比 `std::transform`（需准备输出范围）；**数据驱动**；正则默认"包含"即匹配 |
| 13 | ㊲㊳㊴ | `replace` 不加 `g` 只换第一个；**校验函数返回布尔**；**背景反向移动** |

## 2. ⭐ 四条跨语言的纪律（写给全栈工作）

1. **边界进来的数据永远要校验** —— 用户输入、本地存储、接口返回，**三处都是边界**。
2. **客户端的一切都不可信** —— 本地存储用户双击就能改；**凡是"改了这个值就能占便宜"的判断，必须由后端说了算**。
3. **前端存储 = 可被篡改的缓存副本**；**权威数据永远在服务器**。
4. **前端改了地址，刷新时接它的是后端** —— 后端要配兜底路由。

## 3. ⚠️ 这一半打通了，但全栈缝合线还差一段

**本文覆盖的课程（200 集）里没有**：`fetch` / `Promise` / `async` / `await`。

也就是说 —— **"从自己的 服务端 Web 框架 接口取数据"这一步，还没学。**

需要单独补的三样（按顺序）：

| 要补 | 对应 C++17 | 用途 |
| --- | --- | --- |
| `fetch` | `C++17 标准库无 HTTP 客户端；需第三方库` | 发请求 |
| `Promise` | 第三方异步库的任务类型 | 处理"将来才有结果" |
| `async` / `await` | 同名 | 让异步写起来像同步 |

→ **补齐之后**：`fetch 后端接口 → JSON.parse → 数据驱动渲染` —— **全栈闭环才算真正完成。**

## 4. 通用工具补完（课程外，但迟早要用）

| 工具 | 用途 |
| --- | --- |
| `new URLSearchParams(location.search)` | 一行取查询参数 |
| `getBoundingClientRect()` | 精确到小数的坐标与尺寸 |
| `crypto.randomUUID()` | 生成不重复 ID |
| `e.target.closest('li')` | 事件委托里更精确地找目标祖先 |
| `Performance.now()` | 高精度计时 |

## 5. 下一步：JS 进阶篇（第 151-198 集）

| 主题 | 为什么重要 |
| --- | --- |
| **作用域链 / 变量提升** | 解释"为什么 `var` 会有怪行为" |
| **闭包** | JS 的"魂"之一；计数器、防抖、模块化的底子 |
| **箭头函数 / 解构 / 剩余 / 展开** | 现代 JS 的书写方式，从此解锁 |
| `forEach`** / **`filter`** / **`reduce` | `map` 的兄弟们 |
| **构造函数 / 原型链 / **`class` | 解释"为什么方法能共享" |
| `this`** 的完整模型 / **`call`** **`apply`** **`bind` | 把事件那节的"够用版"补成完整版 |
| **深浅拷贝 / 异常处理** | 工程必备 |
