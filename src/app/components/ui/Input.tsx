'use client';

import { useState, InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils/cn';

interface BaseInputProps {
  label: string;
  error?: string;
}

type InputProps = BaseInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;
type TextareaProps = BaseInputProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & { multiline: true };

type CombinedProps = InputProps | TextareaProps;

function isTextarea(props: CombinedProps): props is TextareaProps {
  return 'multiline' in props && props.multiline === true;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedProps>((props, ref) => {
  const { label, error, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasValue(e.target.value.length > 0);
    if ('onChange' in rest && rest.onChange) {
      (rest.onChange as (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)(e);
    }
  };

  const isLabelFloating = isFocused || hasValue;

  const baseInputStyles = cn(
    'w-full bg-transparent text-[var(--text-primary)]',
    'border-b border-[var(--border-subtle)]',
    'py-3 pt-6 px-0',
    'transition-colors duration-300',
    'focus:outline-none focus:border-[var(--accent-architect-from)]',
    error && 'border-red-500',
    'placeholder:text-transparent'
  );

  const labelStyles = cn(
    'absolute left-0 transition-all duration-300 pointer-events-none',
    isLabelFloating
      ? 'top-0 text-xs text-[var(--text-muted)]'
      : 'top-6 text-base text-[var(--text-secondary)]',
    isFocused && 'text-[var(--accent-architect-from)]'
  );

  if (isTextarea(props)) {
    const { multiline, ...textareaRest } = rest as TextareaProps;
    return (
      <div className="relative">
        <label className={labelStyles}>{label}</label>
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={cn(baseInputStyles, 'resize-none min-h-[100px]')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          rows={3}
          {...textareaRest}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="relative">
      <label className={labelStyles}>{label}</label>
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={baseInputStyles}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(rest as InputProps)}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

