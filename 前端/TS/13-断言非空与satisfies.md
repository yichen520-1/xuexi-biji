# TS：断言、非空断言与 satisfies

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

`as T` 表示你提供检查器无法证明的类型信息；`!` 表示你断言此处不是空值。二者不检查实际数据、不转型、不补默认值。`satisfies` 检查表达式符合约束，同时尽量保留该表达式本身的类型细节，适合配置对象。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
type Theme = { primary: string; spacing: number };
const theme = {
  primary: '#1677ff',
  spacing: 8,
} satisfies Theme;

function getInputValue(element: Element | null): string {
  if (!(element instanceof HTMLInputElement)) return '';
  return element.value;
}
console.log(theme.primary.toUpperCase());
```

DOM 示例在浏览器环境调用。先确认元素真实为输入框，比 `querySelector(...) as HTMLInputElement` 更安全：CSS 选择器写错、节点缺失或标签改变时都不会凭空变成输入框。

### 2. as const 的两层作用

它阻止字面量拓宽，并使对象属性/数组元组呈现只读类型。它不是深拷贝或运行时深冻结；其中引用的其他可变对象也不因此自动失去所有修改路径。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

| 写法 | 检查实际值吗 | 适用场景 |
| --- | --- | --- |
| `as T` | 不检查 | 已有外部证据但检查器无法表达 |
| `value!` | 不检查 | 已证明非空且确实能维护不变量 |
| `satisfies T` | 静态检查结构 | 配置表、映射对象 |
| `Number(value)` | 会执行转换 | 仍需排除 NaN 等无效结果 |

**禁止把断言当解析器**：`JSON.parse(text) as User` 不等于得到已验证的 User。遇到不可信输入回到 unknown 与守卫。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

如果 `document.getElementById('name')` 返回 null，加 `!` 后会生成一个真实元素吗？

> [!success]- 参考答案
> 不会。运行时仍是 null，访问属性仍可能崩溃；应检查存在性并决定缺失时的界面行为。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
