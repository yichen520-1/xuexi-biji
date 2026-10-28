export {};

const config = { pageSize: 20, theme: 'light' };
type Config = typeof config;
type ConfigKey = keyof Config;

function getSetting<K extends ConfigKey>(key: K): Config[K] {
  return config[key];
}
const pageSize = getSetting('pageSize');
console.log(pageSize.toFixed(0));

const roles = ['reader', 'editor', 'admin'] as const;
type Role = typeof roles[number];
const role: Role = 'editor';
console.log(role);
