'use client';

import * as React from 'react';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'default' | 'sm';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none';

    const variantClass =
      variant === 'outline'
        ? 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-900'
        : variant === 'ghost'
          ? 'bg-transparent hover:bg-gray-100 text-gray-900'
          : variant === 'destructive'
            ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-purple-600 hover:bg-purple-700 text-white';

    const sizeClass = size === 'sm' ? 'h-9 px-3' : 'h-11 px-4';

    return (
      <button
        ref={ref}
        type={type}
        className={[base, variantClass, sizeClass, className ?? ''].join(' ')}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const base =
    'w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500';
  return <input ref={ref} className={[base, className ?? ''].join(' ')} {...props} />;
});
Input.displayName = 'Input';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label className={['text-sm font-semibold text-gray-700', className ?? ''].join(' ')} {...props} />
  );
}

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const base =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500';
  return <textarea ref={ref} className={[base, className ?? ''].join(' ')} {...props} />;
});
Textarea.displayName = 'Textarea';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={['inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', className ?? ''].join(' ')}
      {...props}
    />
  );
}

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement>;

export function Separator({ className, ...props }: SeparatorProps) {
  return <div className={['h-px w-full bg-gray-200', className ?? ''].join(' ')} {...props} />;
}

export interface SwitchProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({ id, checked, defaultChecked, onCheckedChange, disabled, className }: SwitchProps) {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isControlled = typeof checked === 'boolean';
  const value = isControlled ? (checked as boolean) : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={value}
      onClick={toggle}
      disabled={disabled}
      className={[
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        value ? 'bg-purple-600' : 'bg-gray-300',
        disabled ? 'opacity-50' : 'cursor-pointer',
        className ?? '',
      ].join(' ')}
    >
      <span
        className={['inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform', value ? 'translate-x-5' : 'translate-x-1'].join(
          ' '
        )}
      />
    </button>
  );
}
