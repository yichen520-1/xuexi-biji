# TS：any、unknown、never 与空值

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

`any` 基本跳过相关检查，错误可继续传播；`unknown` 表示尚未证实的值，使用前必须检查；`never` 表示正常控制流下不可能产生的值；`void` 则强调函数调用者不使用返回值。它们分别解决不同问题，不是四种“随便写”的空类型。

开启 `strictNullChecks` 后，`null`、`undefined` 需要明确纳入类型。可选属性读出来通常包含 `undefined`；非空断言 `!` 只让检查器相信你，并不改变真实值。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
function parseName(input: unknown): string {
  if (typeof input !== 'object' || input === null) {
    throw new Error('必须是对象');
  }
  if (!('name' in input) || typeof input.name !== 'string') {
    throw new Error('name 必须是字符串');
  }
  return input.name.trim();
}

function fail(message: string): never {
  throw new Error(message);
}
console.log(parseName({ name: '小陈' }));
```

第一道检查排除基本值与 `null`；第二道确认属性存在且值的类型正确；之后才安全调用字符串方法。这就是把不可信边界逐步变成可信类型的过程。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- `typeof null === 'object'` 是 JS 的历史行为，所以对象检查要额外排除 `null`。
- `unknown` 类似“必须先辨认的外部输入”，不等同 C++ 的 `void*`；它不提供任意内存访问。
- `never` 常用于穷尽检查；它不是“这里放一个空字符串就行”。
- `value ?? fallback` 只在空值时回退，`value || fallback` 还会把 `0`、空字符串等视为假值，业务语义不同。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

接口返回的价格可能为 `0`。默认值是 `99`，应该用 `price || 99` 还是 `price ?? 99`？

> [!success]- 参考答案
> 如果只有 `null/undefined` 才表示缺失，用 `??`，这样合法的零价格不会被替换。类型还应明确为 `number | null | undefined`。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
