# JS--键盘事件 · 事件对象 · this

> **本课目标**：能说清 `e` 从哪来、`e.target` 与 `e.currentTarget`（和 `this`）差在哪，并知道键盘事件该用哪个、不该用哪个。
> **为什么学它**：`e.target` 是**事件委托**（⑱）的地基 —— 那是全篇最省代码的技巧。而 `this` 是本课第一次遇到"跟 C++ 从根上不一样"的概念。
> **对应视频**：第 99-102 集（应用篇 Day2）
> **主源**：MDN [KeyboardEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)、[Event.target](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target)、[Event.currentTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/currentTarget)、[addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

---

一：概念

### 键盘事件的三个名字

| DOM 事件 | C++17 对照 | 触发时机 |
| --- | --- | --- |
| `keydown` | 标准库无键盘事件 API | 按下（功能键也算） |
| `keypress` | 标准库无对应事件 | 输入字符的旧事件，DOM 已废弃 |
| `keyup` | 标准库无对应事件 | 松开 |

MDN 把 `keypress` 列在「过时事件」一栏：「这个事件高度依赖硬件且**已过时，不应该使用它**」。

### `KeyboardEvent` 的常用成员

| 属性 | 值 | 说明 |
| --- | --- | --- |
| `e.key` | 字符串 | **推荐**。`'a'` / `'Enter'` / `'ArrowUp'` / `'Escape'` |
| `e.code` | 字符串 | **物理按键位置**，忽略键盘布局：`'KeyY'` / `'Space'` |
| `e.keyCode` | 数字 | ⚠️ **已废弃**（MDN「过时属性」）。`13` = 回车 |
| `e.ctrlKey` / `e.shiftKey` / `e.altKey` / `e.metaKey` | 布尔 | 该修饰键是否按住 |
| `e.repeat` | 布尔 | 是否"按住不放"导致的自动重复 |

`key` 与 `code` 的差别（MDN 原文举例）：QWERTY 键盘上按 "Y" **所在的位置**，`code` 返回 `"KeyY"` —— 即使用户用的是 QWERTZ 布局（实际打出 "Z"）。

### `e` 从哪来

浏览器在事件发生时**新建一个 **`Event`** 对象** → **调用你注册的处理函数** → 把它当**第一个（也是唯一）实参**塞进去。

MDN 原话：「事件监听器**仅仅接受事件对象这一个自动传入的参数**，并且它的**返回值还会被忽略**。」

| C++17 | JS |
| --- | --- |
| 自定义函数签名，如 `void handler(const EventData& e)`（类型需自定义） | `function (e) {}` |
| 形参**类型**写死 | 只有名字，没有类型 |
| 回调参数由应用或库约定，没有固定参数数量 | DOM 监听器自动获得事件对象 e |
| 返回值与取消协议由应用设计 | addEventListener 忽略返回值；通过 Event 方法控制传播/默认动作 |

### 三方关系（本课核心）

```
e.target         →  真正触发的那个（最深的，会变）
e.currentTarget  →  绑定监听器的那个（不变）；出了处理函数是 null
this             →  普通、未绑定函数监听器通常等于 currentTarget；箭头/绑定函数另论
```

MDN 对 `target`：「是对事件**被分派到**的对象的引用。当事件处理器在事件的冒泡或捕获阶段被调用时，它与 `Event.currentTarget` **不同**。」
MDN 对 `currentTarget`：「用于标识**事件处理器所附加的**元素。**这并不总是与触发事件的元素相同**。」
MDN 对 `this`：「事件处理器里的 `this` 值是该元素的引用。其与传递给句柄的 event 参数的 `currentTarget`** 属性的值一样**。」

### `this`：第一次"从根上不一样"

| C++17 | JS |
| --- | --- |
| this 的类型受成员函数约束，值是调用对象的地址 | 普通函数 this 依调用形式而定 |
| 同一成员函数可在不同实例上调用 | 普通函数也可被不同对象调用，但不受同样类类型约束 |
| 调用对象与 const/继承规则影响可调用性 | 箭头函数沿用词法 this，bind 也会影响普通函数 this |

浏览器调用处理函数的方式等价于 `元素.处理函数(事件对象)` —— "前面挂着元素"，所以 `this` 是元素。

---

二：格式

**骨架**

```js
元素.addEventListener('keydown', function (e) {
  // e 这个形参必须写，名字随意（习惯 event / e）
});
```

**常用成员速查**

```js
e.type               // 'click' —— 事件类型字符串
e.target             // 真正触发的元素（可能是子元素）
e.currentTarget      // 绑监听器的元素 —— 处理函数外是 null
e.preventDefault()   // 阻止默认行为（⑲ 细讲）
e.stopPropagation()  // 阻止冒泡（⑯ 细讲）
e.key                // 键盘：'Enter' / 'a' / 'ArrowUp'
e.clientX            // 鼠标：相对视口
```

**两种报错要分清**

| 报错 | 含义 | 病根 |
| --- | --- | --- |
| `Cannot read properties of **null** (reading 'target')` | 查的元素不存在 | `querySelector` 没查到 |
| `Cannot read properties of **undefined** (reading 'target')` | 这个名字压根没定义 | 忘了写形参 `e` |

`return false`** 的三种处境**

| 写法 | 是否阻止默认行为 |
| --- | --- |
| `addEventListener('click', function(){ return false; })` | **否** —— 返回值被忽略 |
| `onclick="return false"`（HTML 属性） | **是** —— 另一套机制（语句被包进函数） |
| `e.preventDefault()` | **是** —— 唯一该用的写法 |

---

三：代码

### ① 键盘：回车搜索 + 全局 Esc

```html
<!DOCTYPE html>
<html>
<body>
  <input id="search" placeholder="输入后按回车">
  <p id="log">试试按 Enter / 方向键 / 字母</p>

  <script>
    const search = document.querySelector('#search');
    const log = document.querySelector('#log');

    // 回车触发"搜索" —— 绑在 input 上（它有焦点）
    search.addEventListener('keydown', function (e) {
      if (e.repeat) { return; }                // 按住不放时只认第一次

      if (e.key === 'Enter') {                 // 老教程里写 e.keyCode === 13
        log.innerText = '搜索：' + search.value;
      } else {
        log.innerText = 'key=' + e.key + '   code=' + e.code;
      }
    });

    // 全局快捷键：绑 document，不依赖焦点在谁身上
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        log.innerText = '按了 Esc';
      }
    });
  </script>
</body>
</html>
```

### ② 事件对象：`e.target` vs `e.currentTarget`

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .card { width: 240px; padding: 12px; background-color: #f1f1f1; border: 1px solid #ccc; }
    .card .hot { background-color: orange; }
  </style>
</head>
<body>
  <div class="card" id="card">
    <p>父元素上的标题</p>
    <p>父元素上的正文</p>
  </div>
  <p id="log">点卡片里的不同位置试试</p>

  <script>
    const card = document.querySelector('#card');
    const log = document.querySelector('#log');

    card.addEventListener('click', function (e) {
      console.log('type =', e.type);
      console.log('target =', e.target);               // 真正点到的（可能是 <p>）
      console.log('currentTarget =', e.currentTarget);  // 永远是 card

      log.innerText = '点到了 <' + e.target.tagName + '>';   // tagName 是大写：'P' / 'DIV'

      // e.target 本身就是真元素，可以直接改它 —— 不用再 querySelector
      e.target.classList.add('hot');
    });

    // 反面教材：不写形参
    // card.addEventListener('click', function () {
    //   console.log(e.target);   // e 根本不存在
    // });
  </script>
</body>
</html>
```

### ③ `this === e.currentTarget`，一行验证

```js
card.addEventListener('click', function (e) {
  console.log(this === e.currentTarget);   // true  —— 永远是同一个
  console.log(this === e.target);          // 点到子元素时是 false
});
```

### ④ 故意造两种报错

```js
// 报 null：选择器写错（元素没查到）
document.querySelector('.not-exist').innerText;

// 报 undefined：忘了写形参 e
card.addEventListener('click', function () {
  console.log(e.target);   // e is not defined
});
```

---

四：总结

### 1. 必须记住的 8 条

1. `e`** 是浏览器塞进来的第一个（唯一）实参**，不声明也存在，**不写形参就拿不到**。
2. **处理函数的 **`return`** 没有用** —— 阻止默认行为一律用 `e.preventDefault()`。
3. `e.target`** = 真正触发的那个（最深的）元素，会变**；`e.currentTarget`** = 绑监听的那个，不变**。
4. `this`** 和 **`e.currentTarget`** 永远相等**（在事件处理函数里）。
5. `e.currentTarget`** 出了处理函数就是 **`null` —— 别想存下来以后再读。
6. **键盘事件用 **`keydown`；`keypress` 已废弃；**写 **`e.key`** 不写 **`e.keyCode`。
7. **键盘事件发给"有焦点的元素"** —— 全局快捷键绑 `document`。
8. **处理文本输入用 **`input`** 事件，不用键盘事件**（中文输入法 / 粘贴 / 手写板都不给 `keydown`）。

### 2. 要改掉的 C++ 直觉

| C++ 直觉 | JS 实际 |
| --- | --- |
| 回调形参由 C++ 应用或库设计 | DOM 监听器自动收到一个 e |
| this 指向实际调用对象，并非编译期固定实例 | 普通函数 this 通常由运行时调用形式决定 |
| 标准 C++ 无事件 target/currentTarget 协议 | target 可能是子元素，currentTarget 是本次处理器所在目标 |
| 自定义取消标志需由应用实现 | addEventListener 忽略返回值，Event 方法分别控制传播与默认动作 |
| nullptr 表示空指针，optional 表示可缺省值，语义不同 | null 与 undefined 也是不同值，不能一一映射 |

### 3. 自测三题（先自己想，再看答案）

1. 监听器绑在 `ul` 上，用户点了某个 `li`，`e.target` 和 `e.currentTarget` 分别是什么？
2. 把处理函数写成 `function () { console.log(e); }`（没有形参），点击后会怎样？
3. `keydown` 绑在 `div` 上，用户什么都没点，直接敲字母键，会不会触发？

```html
<br>
```

**答案**

1. `e.target` 是那个被点到的 `li`；`e.currentTarget` 是 `ul`（因为监听器绑在 `ul` 上）。处理函数里的 `this` 也是 `ul`。
2. **报错**：`e` 这个标识符压根不存在（`ReferenceError: e is not defined`）。浏览器确实塞了一个事件对象进来，但你没有形参去接它 —— 传进来了，你接不住。
3. **不会触发。** 键盘事件发给当前**拥有焦点**的元素，`div` 默认不可聚焦。要么它带 `tabindex` 且被点过，要么把监听器绑到 `document` 上。

### 4. 动手练习

做一个"点了谁就点亮谁"的列表：

- 一个 `ul` 里放 5 个 `li`
- **监听器只绑一个**（绑在 `ul` 上，不是每个 `li` 各绑一次）
- 点哪个 `li`，就给它加上 `hot` 类（提示：`e.target`）
- 再加一个 `input`，按回车时把输入的内容 `console.log` 出来（用 `e.key === 'Enter'`）

**做完这题你就已经会事件委托的雏形了** —— 第 ⑱ 个知识点就是把这件事讲透。

### 5. 下一步

- 接着学：第 105-107 集 —— 事件流（捕获 / 冒泡）/ 事件解绑 / 事件委托
- 速查表：[JS--事件速查表-绑定与常见事件.md](./JS--事件速查表-绑定与常见事件.md)
- 上一课：[JS--事件监听-鼠标与焦点事件.md](./JS--事件监听-鼠标与焦点事件.md)
- **有不清楚的地方直接问我。** 我是你的老师，可以随时追问任何细节 —— 别自己憋着。

---

**建议读一遍原文**：MDN [Event.currentTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/currentTarget)（页面里那个官方示例就是本课图上画的东西，点着看一遍最直观）。
