# TS：keyof、typeof 与索引访问

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

`keyof T` 从对象类型提取键的联合；类型位置的 `typeof value` 从已有值提取静态类型；`T[K]` 取某个属性的类型。它们组成“由已有事实推导新类型”的工具，减少字段在多个地方重复声明而逐渐不一致。

不要混淆 JS 表达式里的 `typeof value` 与类型位置的 `typeof value`：前者运行后得到字符串，后者只供检查器使用。也不要把类型位置的查询理解成运行时反射。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
const config = { pageSize: 20, theme: 'light' };
type Config = typeof config;
type ConfigKey = keyof Config;

function getSetting<K extends ConfigKey>(key: K): Config[K] {
  return config[key];
}
const pageSize = getSetting('pageSize');
console.log(pageSize.toFixed(0));

const roles = ['reader', 'editor', 'admin'] as const;
type Role = typeof roles[number];
const role: Role = 'editor';
console.log(role);
```

1. `Config` 跟随对象推断，不再手抄字段。
2. K 限制传入键，`Config[K]` 把这个键与返回类型连接。
3. `typeof roles[number]` 先取得只读元组类型，再取所有数字位置元素的联合。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- `Object.keys(obj)` 在运行时返回字符串数组，不能总当成精确的 `keyof T` 数组，实际对象可能还有额外属性。
- 有字符串索引签名时，`keyof` 可能包含 `number`，因为 JS 数字键会转成字符串；不要假定它永远只是几个字面量。
- C++ 的 `decltype` 可提供“从表达式取得类型”的直觉，但 TS 操作结构对象键的规则不同，也不生成运行时代码。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

如何从 `const order = { id: 1, total: 20 }` 得到 total 的静态类型，而不再写一遍 number？

> [!success]- 参考答案
> `type Total = (typeof order)['total']`。括号明确先得到对象类型，再做索引访问。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
