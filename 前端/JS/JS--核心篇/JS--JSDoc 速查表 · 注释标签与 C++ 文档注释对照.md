# JS--JSDoc 速查表 · 注释标签与 C++ 文档注释对照

> 定位：这套东西**不是 JavaScript 的语言特性**，是一套「写在注释里的约定」。
> 与 C++ 的关系：**JSDoc 与 Doxygen 都可从结构化注释生成文档，但类型来源、标签与编译器作用不同。**
> 权威来源：jsdoc.app（JSDoc 3 官方站）+ TypeScript 官方「JSDoc 支持」文档（TS 是 JSDoc 事实上的第二个消费者，VS Code 的智能提示就走它）。

---

## 1. 先立一句话：它是什么，不是什么

**是**：一种结构化注释，让**编辑器**能给你补全、参数名、悬停说明；让**文档工具**能生成 API 文档。

**不是**：

| 你以为它管 | 实际它不管 |
| --- | --- |
| 传错类型会报错 | ❌ 运行期完全不检查，传字符串给 `{number}` 照跑 |
| `@private` 能挡住访问 | ❌ 运行时照样 `obj._secret` 拿得到 |
| `@readonly` 能防改 | ❌ 赋值照样成功（要真防只能 `Object.freeze`） |
| `@deprecated` 会拦住调用 | ❌ 只是编辑器画删除线，CI 不拦 |

**根因**：C++ 的访问控制、const 限定和 `[[deprecated]]` 由编译器处理；JS 注释本身不会改变运行时行为，`@ts-check` 则由 TypeScript 工具检查。

> ⭐ 所以：**这 17 个标签，没有一个在运行时生效。** 管事的只有编辑器和文档生成器。

**唯一能让它"开始管事"的开关**见 §5（`// @ts-check`）。

---

## 2. 一个完整的 JSDoc 块长什么样

```js
/**
 * 按用户 id 查用户，找不到返回 null。
 * @param {number} id 用户 id，必须为正整数
 * @param {Object} [options] 可选参数（方括号 = 可选）
 * @param {boolean} [options.withRoles=false] 是否带出角色
 * @returns {Promise<User|null>} 用户对象；不存在时为 null
 * @throws {TypeError} id 不是数字时抛出
 * @example
 * const u = await findUser(1);
 * console.log(u.name);
 * @see https://example.com/docs/user
 * @since 1.2.0
 */
async function findUser(id, options) { /* ... */ }
```

**记住三条**：

- 开头必须 `/**` —— **两个星号**。一个星号 `/*` 是普通注释，编辑器不认。
- 每行以 `*` 开头（星号对齐，纯排版，但 JSDoc 解析器按行吃，别乱断）。
- 标签顺序惯例：描述 → `@param` → `@returns` → `@throws` → `@example` → `@see` → `@author/@since`。

---

## 3. 17 个标签 × C++ 文档注释 对照（主线表）

| # | JSDoc | 干什么 | C++ 文档注释 / 语法对应 | ⚠️ 关键差异 |
| --- | --- | --- | --- | --- |
| 1 | `@param {T} name 说明` | 参数类型、名称和说明 | Doxygen `@param name 说明` | C++ 类型在签名中；JS 类型工具也可从实现和调用上下文推断类型 |
| 2 | `@returns {T} 说明` | 返回值类型 + 说明 | Doxygen `@return 说明` | JSDoc 注释可描述类型；C++ 类型由函数声明表达 |
| 3 | `@type {T}` | 给**变量/常量**标注类型 | `int x = 0;` 里的 `int` | JS 声明处没有位置写类型，只能靠这行补 |
| 4 | `@typedef {Object} Name` | 给自定义对象类型**起个名** | 只能作文档层面的概念参照，C++ 需真实声明类型 | ⚠️ 它**只活在注释里**：不能 `new`、`typeof` 拿不到、运行时不存在 |
| 5 | `@property {T} field 说明` | 描述类型字段 | Doxygen 成员文档 | 注释不创建成员；字段需在 C++ 类型中声明 |
| 6 | `@callback Name` | 给**函数类型**起名 | 函数指针、Lambda 或 `std::function` 类型别名 | 等价于「`@typedef` 的函数版」；同样只在注释里 |
| 7 | `@template T` | 声明泛型类型参数 | C++ 函数/类模板 `<typename T>` | JSDoc 注释不创建模板；C++ 约束与推导由语言规则处理。声明在注释里，**实参靠调用处推断**；约束只能写近似形式 |
| 8 | `@deprecated 说明` | 标记已废弃 | 编译器属性/弃用标记（如 `[[deprecated("说明")]]`） | C++ 可用 `[[deprecated]]` 发出编译期弃用诊断（是否显示由编译器决定）；JSDoc 只有编辑器删除线，构建不拦 |
| 9 | `@example` | 用法示例（悬停时显示） | Doxygen `@code` 示例块 | 都用于文档示例；具体渲染行为取决于工具 |
| 10 | `@throws {T} 说明` | 可能抛出的异常 | Doxygen `@throws` / `@exception`（文档标签） | 注释均不自动证明异常集合；C++ 没有 Java 式受检异常 |
| 11 | `@description` / `@desc` | 显式写描述 | Doxygen `@brief` | 两套工具的标签规则各自独立（`@desc` 是缩写）。⚠️ 块开头第一段文字**本身**就是默认描述，显式写它通常是为了把描述放到标签后面，或写多段 |
| 12 | `@see 目标` | 相关链接 | Doxygen `@see` | JSDoc 还能写 `{@link 目标}` 内联进说明文字里 |
| 13 | `@author 名字` | 作者 | Doxygen `@author` | 工具支持情况不同 |
| 14 | `@since 版本` | 起始版本 | Doxygen `@since` | 两者都用于文档版本说明，不改变运行时行为 |
| 15 | `@private / @public` | 文档/类型工具可见性标注 | Doxygen 访问文档；C++ 类访问说明符 | C++ 访问控制由编译器处理；JS 标签本身不创建运行时私有成员，文档过滤和静态检查取决于工具 |
| 16 | `@readonly` | 文档层面的只读提示 | C++ `const` 限定（不同层级） | JSDoc 不阻止运行时赋值；C++ const 由类型系统约束 |
| 17 | `@enum {T}` | 枚举 | `enum` | JS 没有枚举。实际做法是 `Object.freeze({...})` 再用 `@enum` 标注；`@enum {string}` 在 TS 里更好用 |

### 3.1 再补 6 个高频（你表里没列，但一定会遇到）

| JSDoc | 一句话 | 备注 |
| --- | --- | --- |
| `@param {...number} nums` | 剩余参数 | 可借 C++17 参数包或容器参数理解，但语义不同 |
| `@param {string} [name='无名']` | **可选参数**（方括号） | 方括号 = 可选，`=` 后写默认值。**最容易漏的语法** |
| `@augments Parent`（旧名 `@extends`） | 声明继承 | 可类比 `class Child : public Parent`，但 JS 原型继承机制不同 |
| `@this {HTMLElement}` | 指定函数体里 `this` 的类型 | 呼应进阶篇第 14 轮「`this` 由调用方式决定」——这里是给编辑器一个**假定** |
| `@fileoverview` / `@module` | 文件级说明 | 写在文件**最顶上**，不属于任何函数 |
| `@type {import('./user.js').User}` | 从别的模块引类型 | C++ `#include` 引入声明；机制不同 |

---

## 4. 类型表达式：`{...}` 里到底能写什么

| 想表达 | JSDoc 写法 | C++17 对应 | 备注 |
| --- | --- | --- | --- |
| 数字 | `{number}` | `double`（JS Number 还包含整数值语义） | ⭐ **JS 没有 int / double 之分**，全是一个数 |
| 字符串 | `{string}` | `std::string` |   |
| 布尔 | `{boolean}` | `bool` |   |
| 任意 | `{*}` | `std::any`（类型擦除；访问时需 any_cast） | 动态承载类型不等于放弃所有检查 |
| 可空 | `{?string}` | `std::optional<std::string>`（表达可缺省值，不是 nullable 引用） | `?` 在**类型前**，允许 `null` |
| 非空 | `{!string}` | 无对应 | 表示一定不是 `null` |
| 联合类型 | `{(string``\|number)}` | `std::variant<std::string, double>` 可列举备选类型 | JS 常见；C++17 可用 `std::variant` 明确列出备选类型，但语义不同 |
| 字面量集合 | `{('left'``\|'right')}` | `enum class`（需显式映射字符串） | 做"只能取这几个值"最省事 |
| 数组 | `{string[]}` 或 `{Array<string>}` | `std::vector<std::string>` |   |
| 数组的数组 | `{number[][]}` | `std::vector<std::vector<double>>` | 仅数值容器的概念参照 |
| 字典/映射 | `{Object<string, number>}` | `std::unordered_map<std::string, double>` | JS 普通对象还有原型和属性描述符 |
| 函数 | `{function(string): boolean}` | `std::function<bool(const std::string&)>` |   |
| 箭头写法 | `{(a: number) => number}` | `std::function<double(double)>` 或 Lambda | JS 类型工具语法与 C++ 调用对象机制不同 |
| 对象结构 | `{{name: string, age: number}}` | struct 聚合类型（需先声明类型） | 一行临时描述，不打算复用 |
| 已命名的自定义类型 | `{User}`（先 `@typedef` 过） | `User` |   |
| Promise | `{Promise<User>}` | `std::promise<User> / std::future<User>` | 只类比异步结果，C++17 无 JS Promise 微任务与 then 语义 |
| 无返回 | `{void}` | `void` |   |
| 剩余参数 | `{...number}` | C++17 参数包或容器参数（机制不同） | 只能用在 `@param` |
| 指定 `this` | `{this:Window}` | ❌ 无对应 |   |

---

## 5. ⭐ 唯一能让它"真的管事"的开关：`// @ts-check`

这是整份速查表**最该记住的一条**。

```js
// @ts-check          ← 文件第一行（必须是注释形式）
```

- 在 `.js` 文件顶上写这一行，VS Code 就会**按 TypeScript 的规则检查 JSDoc**：类型不匹配画红波浪线、`@deprecated` 划删除线、`@param` 个数对不上会提示。
- 等价做法：项目根放 `jsconfig.json`，里面 `{ "compilerOptions": { "checkJs": true } }`，全项目生效。
- **没有这个开关时**：JSDoc 只负责「悬停说明 + 参数名补全 + 类型提示」，**不做检查**。

> 换句话说：**JSDoc + **`@ts-check`** ≈ 一个不用改后缀名的 TypeScript**。
> 这也解释了为什么 TS 能无缝吃 JSDoc —— 它们本来就是同一个团队、同一个类型系统。

⚠️ 两个边界：

1. `@ts-check` 只是**编辑器/构建期**检查，浏览器里依旧没有类型。
2. 打包压缩（terser 等）**默认会把注释全删掉** → 上线产物里 JSDoc 一个字都不剩。所以它 100% 是开发期资产。

---

## 6. 五个坑

| 坑 | 后果 | 怎么防 |
| --- | --- | --- |
| 写成 `/*` 而不是 `/**` | 编辑器完全当普通注释，所有标签失效（**不报错**） | 记住"两个星号才叫文档注释" |
| `@typedef` 了就当有类型 | 运行时 `User` 未定义 → `ReferenceError`（或者根本没这个变量） | 类型只用来写注释，**代码里永远别真去用它** |
| `@param` 名字和形参不一致 | 悬停时参数名对不上，`@ts-check` 下会报 | 改名时同步改注释；`@param` 顺序也应与形参一致 |
| `@private` 当访问控制 | 以为外部调不到，实际一调就通 | JS 真要私有：`#field` 私有字段 / 闭包 |
| `@readonly` 当不可变 | 以为改不了，实际能改 | 真要不可变：`Object.freeze()` / `const`（`const` 只锁绑定） |

**一句话**：所有"以为它拦住了"的地方，JS 都**静默通过** —— 又是那条暗线。

---

## 7. 什么时候写 / 写多少

**值得写**：

- 对外暴露的函数、方法（别人要调你）→ `@param` + `@returns`
- 形状固定的对象 → `@typedef` + `@property`（比一串散落的注释强得多）
- 会被多处复用的回调签名 → `@callback`
- 已经不用但还没删的 API → `@deprecated`（顺手写清替代方案）
- 有坑的边界（可能抛异常、失败返回 `null`）→ `@throws` / `@returns {T|null}`

**不必写**：

- 每个局部变量都标 `@type` —— 噪音
- 一目了然的小函数写三段说明 —— 噪音
- 注释重复代码本身（`@returns {number} 返回数字`）—— 负价值

**判断标准**（对任何语言文档都适用）：**读代码的人能不能从签名看出它要什么、给什么、会炸在哪。** 看不出就写，看得出就别写。

---

## C++ 类比可用度

| 环节 | 可用度 | 说明 |
| --- | --- | --- |
| `/** */` ↔ Doxygen 注释 | ⭐⭐⭐ | 都可生成文档，但语法和消费工具不同 |
| 标签逐条对照 | ⭐⭐ | 部分概念相似，不能逐标签等同 |
| `@param` / `@returns` | ⭐⭐⭐ | JSDoc 可写类型说明；C++ 函数签名提供静态类型 |
| `@template` ↔ C++ 模板 | ⭐⭐ | JSDoc 仅供工具理解；C++ 模板是语言机制 |
| `@typedef` ↔ class/struct | ⭐ | ⚠️ JSDoc typedef 只是工具认识的注释类型，C++ class/struct 是真实类型 |
| `@private` / `@readonly` | ⭐ | C++ 访问控制/const 由语言约束；JSDoc 标签是工具提示，JS 里是**编辑器在画提示**。把 C++ 的信任带过来，就是你被坑的那一瞬间 |
| `[[deprecated]]` ↔ `@deprecated` | ⭐⭐ | C++ 属性可触发编译器弃用诊断；JSDoc 标签用于文档和工具提示，均不等于运行时禁止调用 |
| `@throws` ↔ Doxygen `@throws` | ⭐⭐⭐ | 都是文档说明，不强制校验实际抛出的异常类型 |
| `@since` | ⭐⭐⭐ | Doxygen 也支持 @since，可用于说明 API 引入版本 |

**一句话带走**：

> **JSDoc 与 Doxygen 都能描述 API，但 JSDoc 类型信息由 TypeScript 工具消费，C++ 编译器不会读取 JSDoc。**
> JS 可用 // @ts-check 或项目 checkJs 开启 TypeScript 静态检查；这不改变 JS 运行时。C++ 编译器则依据语言声明检查类型。
