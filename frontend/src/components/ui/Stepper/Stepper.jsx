import React from 'react';
import { Check } from 'lucide-react';

/**
 * Reusable Stepper component for wizards.
 */
export default function Stepper({ steps, currentStep, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
        
        {/* Active Line Progress */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-[#FF9D00] -translate-y-1/2 z-0 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2
                  ${isCompleted ? 'bg-[#FF9D00] border-[#FF9D00] text-black shadow-[0_0_15px_rgba(255,157,0,0.5)]' : ''}
                  ${isCurrent ? 'bg-[#111111] border-[#FF9D00] text-[#FF9D00] shadow-[0_0_15px_rgba(255,157,0,0.3)]' : ''}
                  ${isPending ? 'bg-[#111111] border-white/20 text-white/40' : ''}
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span 
                className={`absolute top-10 text-xs font-medium whitespace-nowrap
                  ${isCompleted || isCurrent ? 'text-white' : 'text-white/40'}
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
