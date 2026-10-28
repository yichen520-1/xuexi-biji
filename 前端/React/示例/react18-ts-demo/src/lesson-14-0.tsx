export {};
import { createBrowserRouter, Link, Outlet } from 'react-router-dom';
function Layout() {
  return <><nav><Link to="/">首页</Link> <Link to="/tasks">任务</Link></nav><Outlet /></>;
}
export const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    { index: true, element: <h1>首页</h1> },
    { path: 'tasks', element: <h1>任务列表</h1> },
    { path: '*', element: <h1>未找到页面</h1> },
  ] },
]);
