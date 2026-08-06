import React from 'react';
import { Card, CardBody } from '../Card/Card';

/**
 * Reusable MetricCard component.
 */
export default function MetricCard({ title, value, subtitle, trend, trendValue, icon, status = 'neutral' }) {
  const statusColors = {
    up: 'text-[#10B981]',
    down: 'text-red-400',
    neutral: 'text-white/40',
  };

  return (
    <Card hoverable className="h-full">
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-sm font-medium text-white/60">{title}</h4>
          {icon && (
            <div className="p-2 bg-white/5 rounded-lg text-white/60 border border-white/5">
              {icon}
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-3xl font-bold text-white">{value}</h2>
          {subtitle && <span className="text-sm text-white/50">{subtitle}</span>}
        </div>
        
        {trendValue && (
          <div className="flex items-center gap-1.5 mt-4">
            <span className={`text-sm font-medium flex items-center ${statusColors[trend]}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
            </span>
            <span className="text-sm text-white/40">vs last week</span>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
