import React from 'react';

/**
 * Reusable Skeleton loader.
 * @param {Object} props
 * @param {'text' | 'circle' | 'rect'} [props.variant='rect']
 * @param {string} [props.className]
 */
export default function Skeleton({ variant = 'rect', className = '' }) {
  const baseClasses = 'animate-pulse bg-white/10';
  
  const variants = {
    text: 'h-4 rounded-md',
    circle: 'rounded-full',
    rect: 'rounded-xl',
  };

  return <div className={`${baseClasses} ${variants[variant]} ${className}`} />;
}
