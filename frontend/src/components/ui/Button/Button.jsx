import React from 'react';
import Spinner from '../Spinner/Spinner';

/**
 * Reusable Button component for the Enterprise Design System.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'icon'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {string} [props.className]
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-white text-black hover:bg-[#FF9D00] hover:scale-[1.02] shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(255,157,0,0.25)]',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/5',
    ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/5',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20',
    outline: 'bg-transparent border border-white/20 text-white hover:border-[#FF9D00] hover:text-[#FF9D00]',
    icon: 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 rounded-full',
  };

  const sizes = {
    sm: variant === 'icon' ? 'p-2' : 'py-1.5 px-3 text-sm',
    md: variant === 'icon' ? 'p-2.5' : 'py-2.5 px-5 text-sm',
    lg: variant === 'icon' ? 'p-3' : 'py-3 px-8 text-base',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Spinner size="sm" className="mr-2 border-current" color="text-current" />}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
