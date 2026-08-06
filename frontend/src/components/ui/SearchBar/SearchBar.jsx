import React from 'react';
import { Search, X } from 'lucide-react';
import Input from '../Input/Input';

/**
 * Reusable SearchBar component with clear button.
 */
export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        prefixIcon={<Search className="w-4 h-4" />}
        suffixIcon={
          value ? (
            <button
              onClick={() => onChange({ target: { value: '' } })}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null
        }
      />
    </div>
  );
}
