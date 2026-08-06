import React from 'react';

/**
 * Reusable Input component.
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {string} [props.error]
 * @param {boolean} [props.success=false]
 * @param {React.ReactNode} [props.prefixIcon]
 * @param {React.ReactNode} [props.suffixIcon]
 * @param {string} [props.className]
 */
export default React.forwardRef(function Input(
  { label, helperText, error, success, prefixIcon, suffixIcon, className = '', disabled, ...props },
  ref
) {
  let borderColor = 'border-white/10';
  let focusRing = 'focus:ring-[#FF9D00]/50';
  let focusBorder = 'focus:border-[#FF9D00]/50';
  let iconColor = 'text-white/40';

  if (error) {
    borderColor = 'border-red-500/50';
    focusRing = 'focus:ring-red-500';
    focusBorder = 'focus:border-red-500';
    iconColor = 'text-red-400';
  } else if (success) {
    borderColor = 'border-[#10B981]/50';
    focusRing = 'focus:ring-[#10B981]';
    focusBorder = 'focus:border-[#10B981]';
    iconColor = 'text-[#10B981]';
  }

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block ml-1 text-[13px] font-medium text-white/80">{label}</label>}
      <div className="relative">
        {prefixIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <span className={iconColor}>{prefixIcon}</span>
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={`w-full bg-white/5 border ${borderColor} rounded-xl py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 ${focusRing} ${focusBorder} transition-all disabled:opacity-50 ${
            prefixIcon ? 'pl-10' : 'pl-4'
          } ${suffixIcon ? 'pr-10' : 'pr-4'}`}
          {...props}
        />
        {suffixIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            <span className={iconColor}>{suffixIcon}</span>
          </div>
        )}
      </div>
      {error && <p className="text-[12px] text-red-400 ml-1">{error}</p>}
      {!error && helperText && <p className="text-[12px] text-white/40 ml-1">{helperText}</p>}
    </div>
  );
});
