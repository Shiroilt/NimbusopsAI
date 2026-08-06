import React from 'react';

/**
 * Reusable Avatar component.
 */
export default function Avatar({ src, alt, initials, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const baseClasses = 'relative flex items-center justify-center rounded-full shrink-0 overflow-hidden border border-white/10 bg-[#1a1a1a]';

  return (
    <div className={`${baseClasses} ${sizes[size]} ${className}`}>
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-white/70 uppercase">
          {initials || '?'}
        </span>
      )}
    </div>
  );
}
