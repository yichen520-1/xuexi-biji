# TS：class、访问控制与运行时对象

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

JS 的 class 是基于原型的对象语法，TS 为字段、构造参数和访问权限增加检查。`public/protected/private` 与 C++ 的名字相似，但对象布局、生命周期、析构和内存管理不是同一套机制。TS 的 `private` 主要在类型检查期约束；JS `#field` 才具有语言层面的私有字段机制。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
class Counter {
  #value = 0;
  constructor(public readonly label: string) {}
  get value(): number { return this.#value; }
  increment(step = 1): void {
    if (!Number.isFinite(step)) throw new Error('步长无效');
    this.#value += step;
  }
}
const counter = new Counter('学习次数');
counter.increment();
console.log(counter.label, counter.value);
```

参数属性语法 `public readonly label` 声明并初始化实例字段。getter 是访问属性时执行的方法，不是自动缓存；每次读取 `value` 都会调用 getter。示例显式检查有限数，因为 `number` 不会排除 `NaN` 或 `Infinity`。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- `readonly` 属性通常只能在声明或构造初始化路径赋值，不提供运行时深冻结。
- 把实例方法单独取出后调用，普通方法中的 `this` 可能丢失；需要保留调用者、绑定，或有意使用箭头字段。
- 不存在 C++ 式确定性析构。定时器、订阅、DOM 事件必须主动清理，不能指望“对象离开作用域就立即回收资源”。
- class 在运行时确实存在，可用于 `instanceof`；interface 被擦除，不能作为 `instanceof` 的右操作数。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

给计数器增加 `reset()`，并解释为什么写 `counter.value = 10` 应当失败。

> [!success]- 参考答案
> `reset()` 在类内写 `this.#value = 0`；公开属性只定义 getter，没有 setter。外部不能绕过计数器对状态修改入口的设计。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
