# TS：Promise、请求与运行时校验

> **定位**：以 JS 为运行基础、C++17 为对照理解静态类型；示例按 TypeScript 5.9.3 验证，不宣称为最新版本。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

`Promise<T>` 表示成功完成时拿到 T，并不把失败类型自动编码成第二个类型参数。`async` 函数返回 Promise。网络边界应先按 unknown 接收，再检查状态码与结构；给 fetch 加一个本地接口不会改变服务器返回内容。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```ts
interface User { id: number; name: string }
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'number'
    && Number.isFinite(value.id)
    && 'name' in value && typeof value.name === 'string';
}
async function loadUser(url: string, signal?: AbortSignal): Promise<User> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: unknown = await response.json();
  if (!isUser(data)) throw new Error('用户数据格式不符');
  return data;
}
```

1. fetch 的 Promise 成功不等于 HTTP 业务成功，先检查 `response.ok`。
2. JSON 解析也可能失败；结构检查不能省略。
3. 校验成功后才把 User 交给界面。
4. 调用方捕获错误并区分主动取消与真正失败；更新界面时还要防止过时请求覆盖新结果。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- `catch (error)` 在严格配置下应按 unknown 对待，先用 `error instanceof Error` 再读 message。
- `axios.get<User>()` 的泛型同样不是运行时验证。
- 示例 URL 由调用方提供，不依赖课程演示服务器永久可用；真实密钥不写在前端笔记或 Git 仓库。
- 可与 C++ 的异步结果概念比较，但浏览器 Promise 的调度、取消和错误传播规则应单独理解。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

服务器返回 `{ id: '1', name: '小陈' }`，当前守卫应该通过吗？

> [!success]- 参考答案
> 不通过，id 是字符串。若业务允许转换，应在边界显式转换并验证，而不是强行断言。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P1—P3 基础长分集（细目未定位时间戳）](https://www.bilibili.com/video/BV1YS411w7Bf/?p=1)
- [[前端/TS/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [编译选项](https://www.typescriptlang.org/tsconfig/)

[[前端/TS/00-TS学习索引|返回学习索引]]
