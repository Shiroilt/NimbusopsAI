import React from 'react';

/**
 * Reusable Progress bar component.
 */
export default function Progress({ value = 0, max = 100, label, showValue = true, color = 'bg-[#FF9D00]', className = '' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5 text-sm">
          {label && <span className="font-medium text-white/80">{label}</span>}
          {showValue && <span className="text-white/50">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
