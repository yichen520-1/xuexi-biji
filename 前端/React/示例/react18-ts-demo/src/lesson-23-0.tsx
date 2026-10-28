export {};
import { lazy, Suspense } from 'react';
// ./pages/Report.tsx 需要导出 default 组件
const Report = lazy(() => import('./pages/Report'));
export function ReportPage() {
  return <Suspense fallback={<p>页面加载中</p>}><Report /></Suspense>;
}
