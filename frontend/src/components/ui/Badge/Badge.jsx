import React from 'react';

/**
 * Reusable Badge component for environments and tech stack labels.
 */
export default function Badge({ label, variant = 'default', icon, className = '' }) {
  const variants = {
    default: 'bg-white/5 text-white/70 border border-white/10',
    primary: 'bg-[#FF9D00]/10 text-[#FF9D00] border border-[#FF9D00]/20',
    blue: 'bg-[#2563EB]/10 text-[#60A5FA] border border-[#2563EB]/20',
    green: 'bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/20',
    red: 'bg-red-500/10 text-red-400 border border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium uppercase tracking-wider ${variants[variant]} ${className}`}>
      {icon && <span className="w-3.5 h-3.5">{icon}</span>}
      {label}
    </span>
  );
}
