import React from 'react';

/**
 * Reusable Card container.
 */
export function Card({ children, className = '', hoverable = false, onClick }) {
  const hoverClasses = hoverable
    ? 'hover:border-[#FF9D00]/50 hover:shadow-[0_8px_24px_rgba(255,157,0,0.15)] transition-all duration-300 cursor-pointer hover:-translate-y-[2px]'
    : '';

  return (
    <div
      onClick={onClick}
      className={`w-full bg-[#111111] border border-white/10 rounded-2xl overflow-hidden ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`p-6 border-b border-white/10 flex items-center justify-between ${className}`}>
      <div>
        {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
        {subtitle && <p className="text-sm text-white/50 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-6 border-t border-white/10 bg-white/[0.02] ${className}`}>{children}</div>;
}

export default Card;
