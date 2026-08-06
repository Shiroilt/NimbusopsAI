import React from 'react';

/**
 * Reusable Toggle/Switch component.
 */
export default function Toggle({ checked, onChange, disabled, size = 'md', className = '' }) {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-8', thumb: 'w-7 h-7', translate: 'translate-x-6' },
  };

  const s = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex ${s.track} shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9D00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] disabled:opacity-50 disabled:cursor-not-allowed ${
        checked ? 'bg-[#FF9D00]' : 'bg-white/10'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block ${s.thumb} transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          checked ? s.translate : 'translate-x-0'
        }`}
      />
    </button>
  );
}
