# React：登录、token、权限与退出

> **版本口径**：按指定 React18 课程讲解，示例固定 React 18.3.1、Router 6；与 React19 的差异单独说明。
> **来源边界**：已核验课程分集标题；以下原理、示例与练习为结合官方文档自主编写，不是视频逐字稿。

---

<span style="background-color:rgb(255, 249, 227)">一：概念</span>

认证确认“是谁”，授权确认“能做什么”。前端路由守卫只是用户体验与入口控制，不能作为真正权限边界；服务器每次访问受保护资源都要验证身份与权限。token 存在哪里由安全需求、后端与部署环境决定，不把课程 localStorage 演示当通用最佳方案。

---

<span style="background-color:rgb(255, 249, 227)">二：写法与执行过程</span>

```tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
export function RequireLogin({ authenticated }: { authenticated: boolean }) {
  const location = useLocation();
  return authenticated ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
```

这是前端界面门禁片段，不是服务器身份校验。登录成功应按受控规则恢复站内目标地址，不直接跳转外部输入指定的任意 URL。

**退出闭环**：清理当前会话状态 → 清理相关用户缓存 → 依据后端能力撤销会话/刷新凭证 → 替换导航到登录页。只删一项 storage 却保留旧用户的 store 与页面数据，会产生残留。

---

<span style="background-color:rgb(255, 249, 227)">三：对照与易错点</span>

| 状况 | 处理原则 |
| --- | --- |
| 401 | 按认证策略处理会话过期，避免无限重试循环 |
| 403 | 用户身份可能有效但无权限，不应一律重新登录 |
| localStorage token | JS 可读，XSS 风险与持久化风险要明确 |
| HttpOnly Cookie | JS 不可直接读，但需配套 CSRF、SameSite、Secure 与服务端策略 |

前端包里出现的真实密钥都会暴露给用户，不能把“环境变量”理解成浏览器端秘密保险箱。本笔记与示例不存放真实凭证。

---

<span style="background-color:rgb(255, 249, 227)">四：动手练习</span>

隐藏“删除文章”按钮，是否已经阻止无权限用户调用删除接口？

> [!success]- 参考答案
> 没有。后端仍必须验证每次删除请求的权限。前端隐藏只是交互层，不能充当安全边界。

---

<span style="background-color:rgb(255, 249, 227)">五：课程与官方参考</span>

- [指定课程 P91—P97、P102—P104](https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=91)
- [[前端/React/00-课程目录与来源说明|已核验的完整分集目录与来源边界]]
- [React 官方学习文档](https://react.dev/learn)
- [React API 参考](https://react.dev/reference/react)

[[前端/React/00-React学习索引|返回学习索引]]
