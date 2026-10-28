# React：useEffect 依赖、清理与请求竞态

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

Effect 用来让组件与外部系统保持同步，例如网络连接、订阅、定时器和第三方实例；不是“每次想执行代码都放这里”。渲染可直接推导的值放渲染，用户触发的提交放事件。依赖列表描述 Effect 读取的响应式输入，不是任选的执行频率开关。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { useEffect, useState } from 'react';
export function Title({ url }: { url: string }) {
  const [text, setText] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    async function run() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const value = await response.text();
        if (active) setText(value);
      } catch (error) {
        if (active) setText(error instanceof Error ? error.message : '请求失败');
      }
    }
    void run();
    return () => { active = false; controller.abort(); };
  }, [url]);
  return <p>{text}</p>;
}
```

依赖变化时，旧清理先停止旧同步过程，新 setup 再建立新的过程；卸载时同样清理。既中止请求又禁止旧结果提交，防止过时响应覆盖新 URL 的内容。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

- 不把 Effect 回调本身写成 async，因为其返回值应是清理函数或 undefined，而不是 Promise。
- `[]` 不等于“生产和开发永远只执行一次”；StrictMode 在开发会额外做检查性的 setup/cleanup 周期。
- 如果 Effect 需要对象的某个原始值，可在外部提取并只依赖该值；但不能漏掉真实读取的其他反应性值。
- 不通过关闭依赖规则来解决无限循环，先检查是否有多余状态、每次新建对象或本可放事件的逻辑。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

为什么组件隐藏后仍有定时器输出，往往应修清理而不是移除 StrictMode？

> [!success]- 参考答案
> 外部资源没有对称释放。开发检查只是让问题更明显，移除检查不会修复生产卸载与重新挂载时的泄漏。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P30—P32、P35](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=30)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
