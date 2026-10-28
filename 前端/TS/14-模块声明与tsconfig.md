# TS：模块、声明文件与 tsconfig

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

`import/export` 决定模块依赖；`import type` 明确只导入类型，通常会从运行输出中消失。`.d.ts` 描述已有 JS 的类型，不提供运行实现。安装了类型声明不等于安装了库，自己补一个错误声明也不会让真实 API 改变。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
// types.ts
export interface Task { id: number; title: string }

// consumer.ts（实际项目应分成另一个文件）
// import type { Task } from './types.js';
export function summarize(task: Task): string {
  return `${task.id}: ${task.title}`;
}
```

浏览器/Vite 工程与 Node 工程可能使用不同的模块解析策略，不能把所有 tsconfig 复制为一份。Node ESM 常采用 NodeNext 并按实际输出扩展名写导入；构建工具项目常使用 Bundler 解析模式。

| 选项 | 重点 |
| --- | --- |
| strict | 开启一组严格检查，减少隐式 any 与空值误用 |
| noUncheckedIndexedAccess | 提醒普通索引读取可能不存在 |
| noEmitOnError | 有错误时不输出编译产物 |
| target | 决定部分语法输出目标，不自动提供所有运行时 API |
| lib | 给环境内置 API 提供类型，不安装 polyfill |
| paths | 帮检查器理解路径映射，通常不自动重写运行时导入 |

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- `target` 很新不代表浏览器自动支持所有 API；反之 lib 中声明有某 API 也不代表用户环境实际有它。
- 仅靠 `paths` 写 `@/` 别名，打包器没有同步配置仍会找不到模块。
- 三斜线指令与环境声明属于类型层工具，不替代正常模块导入。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为什么装了某库的 `@types`，运行时仍提示模块不存在？

> [!success]- 参考答案
> 类型包通常只描述契约，还要安装真实库并正确配置运行/打包环境。声明不是实现。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
