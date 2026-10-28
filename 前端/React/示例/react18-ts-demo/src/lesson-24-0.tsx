export {};
import { memo, useCallback, useMemo, useState } from 'react';
const Row = memo(function Row({ id, onPick }: { id: string; onPick: (id: string) => void }) {
  return <button onClick={() => onPick(id)}>{id}</button>;
});
export function SearchList({ ids }: { ids: readonly string[] }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const visible = useMemo(() => ids.filter(id => id.includes(query)), [ids, query]);
  const onPick = useCallback((id: string) => setSelected(id), []);
  return <><input value={query} onChange={e => setQuery(e.currentTarget.value)} />
    <p>{selected}</p>{visible.map(id => <Row key={id} id={id} onPick={onPick} />)}</>;
}
