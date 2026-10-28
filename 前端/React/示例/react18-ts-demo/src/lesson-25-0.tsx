export {};
import { forwardRef, useImperativeHandle, useRef } from 'react';
type InputHandle = { focus: () => void };
export const FocusInput = forwardRef<InputHandle, { label: string }>(function FocusInput(props, ref) {
  const input = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({ focus() { input.current?.focus(); } }), []);
  return <label>{props.label}<input ref={input} /></label>;
});
export function Demo() {
  const input = useRef<InputHandle>(null);
  return <><FocusInput ref={input} label="任务" />
    <button onClick={() => input.current?.focus()}>聚焦</button></>;
}
