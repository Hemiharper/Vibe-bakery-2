import React from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  formatValue?: (val: number) => string;
  description?: string;
}

export const InputSlider: React.FC<InputSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  description
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-charcoal font-serif font-bold text-lg">{label}</label>
        <span className="text-coffee font-sans font-medium text-lg">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-stone rounded-lg appearance-none cursor-pointer accent-coffee"
      />
      
      {description && (
        <p className="mt-2 text-xs text-gray-500 font-sans leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};