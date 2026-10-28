export {};
import { useParams, useSearchParams, Link } from 'react-router-dom';
export function Detail() {
  const { id } = useParams<'id'>();
  const [search] = useSearchParams();
  const tab = search.get('tab') ?? 'summary';
  if (!id) return <p>缺少资源编号</p>;
  return <><p>资源 {id}，标签 {tab}</p><Link to="/tasks">返回任务</Link></>;
}
