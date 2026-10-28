# TS：函数、参数、重载与 this

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

函数类型描述参数与返回值契约。可选参数、默认参数、剩余参数都沿用 JS 执行语义；TS 只检查调用关系。函数重载声明用来描述多组调用方式，但最后仍只有一个 JS 实现，不像 C++ 生成多个按签名选中的函数体。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
function normalize(value: string): string;
function normalize(value: number): number;
function normalize(value: string | number): string | number {
  return typeof value === 'string' ? value.trim() : Math.round(value);
}

type Filter<T> = (item: T, index: number) => boolean;
function select<T>(items: readonly T[], predicate: Filter<T>): T[] {
  return items.filter(predicate);
}
const result = select([1, 2, 3], n => n > 1);
console.log(normalize('  TS  '), result);
```

外部调用根据重载签名判断返回类型；实现签名必须兼容所有重载。若一个联合参数已经能清楚表达契约，优先用联合，避免不必要的重载表。

### 2. 回调与 this

箭头函数捕获词法 `this`；普通函数的 `this` 取决于调用方式。TS 允许写不参与运行时参数列表的 `this: SomeType` 参数声明，帮助检查普通函数的调用上下文，但它不会改变绑定行为。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- 只写参数类型不写返回类型并非总有问题，局部函数通常可推断；公共边界写返回类型更便于发现误改。
- `() => void` 的意思是调用者不使用返回值，不是要求任何被赋值函数绝对不能返回实际值。
- 把函数作为参数时传函数本身，而不是先执行后传结果；TS 能发现其中一部分，但不能替你决定业务时机。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为 `sum(...values)` 写完整类型，并让空参数返回 `0`。

> [!success]- 参考答案
> `function sum(...values: number[]): number { return values.reduce((a,b) => a+b, 0); }`。初始值保证空数组可处理。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
