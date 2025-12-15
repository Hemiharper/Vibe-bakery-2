import React from 'react';

interface IngredientRowProps {
  label: string;
  weight: number;
  unit?: string;
  percentage?: number;
  highlight?: boolean;
}

export const IngredientRow: React.FC<IngredientRowProps> = ({ 
  label, 
  weight, 
  unit = 'g', 
  percentage,
  highlight = false 
}) => {
  return (
    <div className={`flex justify-between items-center py-2 border-b border-stone/50 last:border-0 ${highlight ? 'font-bold text-charcoal' : 'text-gray-700'}`}>
      <span className="font-serif">{label}</span>
      <div className="text-right">
        <span className="text-lg tabular-nums">{weight}{unit}</span>
        {percentage !== undefined && (
          <span className="ml-2 text-xs text-gray-400 tabular-nums">({percentage}%)</span>
        )}
      </div>
    </div>
  );
};