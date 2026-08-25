import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all rounded-full focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-black text-white hover:bg-neutral-800 focus:ring-neutral-300',

    secondary:
      'bg-white border border-black/10 text-black hover:bg-neutral-50 focus:ring-neutral-200',

    destructive:
      'bg-black text-white hover:bg-red-600 focus:ring-red-100',

    tertiary:
      'text-neutral-500 hover:text-black hover:bg-neutral-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-sm',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};