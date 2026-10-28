export {};
import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
type ButtonProps = ComponentPropsWithoutRef<'button'> & { children: ReactNode };
export function Button({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}
type User = { id: number; name: string };
export function UserPanel() {
  const [user, setUser] = useState<User | null>(null);
  return <Button onClick={() => setUser({ id: 1, name: '小陈' })}>
    {user ? user.name : '加载示例用户'}
  </Button>;
}
