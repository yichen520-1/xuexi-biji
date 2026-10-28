# TS：interface、type 与结构类型

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

TS 大体按结构兼容：某值具备目标类型需要的成员，通常就可赋值，不必声明“继承自这个接口”。`interface` 适合描述可扩展对象契约；`type` 还可命名联合、元组、条件类型等。它们不是 C++ 虚函数表，也不会在运行时生成接口对象。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
interface Named { name: string }
interface User extends Named { id: number }
type Result<T> = { ok: true; data: T } | { ok: false; message: string };

function showName(value: Named): string { return value.name; }
const user: User = { id: 1, name: '小陈' };
console.log(showName(user));

function greet(result: Result<User>): string {
  return result.ok ? result.data.name : result.message;
}
```

`User` 有 `Named` 所需的 `name`，因此能传入函数。交叉 `A & B` 要同时满足两个结构；如果把同名属性交叉成互斥类型，可能产生不可能的成员，而不是自动覆盖旧属性。

### 2. 对象字面量检查为何更严格

直接把多余字段的对象字面量赋给某个类型，检查器常会报告多余属性，帮助发现拼写错。先存入变量再赋值可能走普通结构兼容；这不表示目标类型会在运行时删除额外字段，也不应利用这条路径绕过真实设计错误。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

| 需求 | 倾向选择 |
| --- | --- |
| 对象契约、可继承接口 | interface 或对象 type 都可 |
| 成功/失败等多分支状态 | type 联合 |
| 库声明扩展与合并 | 了解 interface 声明合并机制后再用 |

`implements` 只检查类实例侧符合接口，不会自动添加接口属性或方法实现。TS 的结构兼容也受私有成员等规则影响，不要总结成“只要长得像，所有类型永远兼容”。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为支付结果设计成功和失败两种结构，成功必须有订单号，失败必须有原因。

> [!success]- 参考答案
> 用 `type Payment = { status: 'success'; orderId: string } | { status: 'failed'; reason: string }`，通过 `status` 收窄后读取各自字段。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
