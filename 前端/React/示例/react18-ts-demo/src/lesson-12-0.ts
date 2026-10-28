export {};
import { createAsyncThunk } from '@reduxjs/toolkit';
interface User { id: number; name: string }
export const loadUser = createAsyncThunk<User, string>(
  'users/load',
  async (id, { signal }) => {
    const response = await fetch(`/api/users/${encodeURIComponent(id)}`, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('id' in data)
      || typeof data.id !== 'number' || !('name' in data)
      || typeof data.name !== 'string') throw new Error('用户结构错误');
    return { id: data.id, name: data.name };
  },
);
