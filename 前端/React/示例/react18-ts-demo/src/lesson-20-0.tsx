export {};
import { NavLink, Outlet } from 'react-router-dom';
export function AdminLayout() {
  return <div>
    <nav aria-label="后台导航">
      <NavLink to="/admin" end>概览</NavLink>
      <NavLink to="/admin/articles">文章</NavLink>
    </nav>
    <main><Outlet /></main>
  </div>;
}
