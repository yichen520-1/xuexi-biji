export {};

interface User { id: number; name: string; email: string }
type CreateUser = Omit<User, 'id'>;
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;
type UserSummary = Pick<User, 'id' | 'name'>;
type Flags<T> = { [K in keyof T]: boolean };
type FormFlags = Flags<CreateUser>;
type ElementOf<T> = T extends readonly (infer U)[] ? U : never;
type Name = ElementOf<readonly string[]>;

const flags: FormFlags = { name: false, email: true };
const name: Name = '小陈';
console.log(flags, name);
