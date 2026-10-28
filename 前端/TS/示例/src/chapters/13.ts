export {};

type Theme = { primary: string; spacing: number };
const theme = {
  primary: '#1677ff',
  spacing: 8,
} satisfies Theme;

function getInputValue(element: Element | null): string {
  if (!(element instanceof HTMLInputElement)) return '';
  return element.value;
}
console.log(theme.primary.toUpperCase());
