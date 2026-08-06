import React from 'react';
import Button from '../Button/Button';

/**
 * Reusable Empty State component.
 */
export default function EmptyState({ icon, title, description, primaryAction, secondaryAction, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white/5 border border-white/10 border-dashed rounded-2xl ${className}`}>
      {icon && (
        <div className="w-16 h-16 mb-6 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white/40">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-white/50 max-w-md mb-8">{description}</p>}
      
      <div className="flex items-center gap-4">
        {secondaryAction && (
          <Button variant="secondary" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
        {primaryAction && (
          <Button variant="primary" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
