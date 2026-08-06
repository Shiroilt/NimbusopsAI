import React from 'react';

/**
 * Reusable loading spinner component.
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.color='text-[#FF9D00]']
 * @param {string} [props.className]
 */
export default function Spinner({ size = 'md', color = 'text-[#FF9D00]', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-4',
  };

  return (
    <div
      className={`rounded-full animate-spin border-t-transparent ${sizeClasses[size]} ${color} ${className}`}
      style={{ borderRightColor: 'currentColor', borderBottomColor: 'currentColor', borderLeftColor: 'currentColor' }}
      role="status"
      aria-label="Loading"
    />
  );
}
