import {lazy,Suspense} from 'react';
import {NavLink,Routes,Route} from 'react-router-dom';
import Tasks from './pages/Tasks';
const Report=lazy(()=>import('./pages/Report'));
export default function App(){
  return <div className="shell"><nav aria-label="页面导航"><NavLink to="/" end>任务</NavLink><NavLink to="/stats">统计</NavLink></nav>
    <main><Suspense fallback={<p>页面加载中</p>}><Routes>
      <Route path="/" element={<Tasks/>}/><Route path="/stats" element={<Report/>}/><Route path="*" element={<h1>未找到页面</h1>}/>
    </Routes></Suspense></main></div>;
}
