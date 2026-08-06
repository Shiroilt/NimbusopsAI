import React from 'react';
import { theme } from '../../../styles/theme';

/**
 * Reusable StatusChip component.
 * @param {Object} props
 * @param {'healthy' | 'warning' | 'critical' | 'offline' | 'pending' | 'connected' | 'disconnected'} props.status
 * @param {string} [props.label]
 * @param {string} [props.className]
 */
export default function StatusChip({ status, label, className = '' }) {
  const statusConfig = {
    healthy: { bg: 'bg-[#10B981]/10', border: 'border-[#10B981]/20', text: 'text-[#10B981]', dot: 'bg-[#10B981]', defaultLabel: 'Healthy' },
    connected: { bg: 'bg-[#10B981]/10', border: 'border-[#10B981]/20', text: 'text-[#10B981]', dot: 'bg-[#10B981]', defaultLabel: 'Connected' },
    warning: { bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/20', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', defaultLabel: 'Warning' },
    pending: { bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/20', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', defaultLabel: 'Pending' },
    critical: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', dot: 'bg-red-500', defaultLabel: 'Critical' },
    offline: { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/40', dot: 'bg-white/40', defaultLabel: 'Offline' },
    disconnected: { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white/40', dot: 'bg-white/40', defaultLabel: 'Disconnected' },
  };

  const config = statusConfig[status] || statusConfig.offline;
  const displayLabel = label || config.defaultLabel;

  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${config.bg} ${config.border} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} shadow-[0_0_8px_currentColor]`} />
      <span className={`text-[11px] font-semibold uppercase tracking-wider ${config.text}`}>
        {displayLabel}
      </span>
    </div>
  );
}
