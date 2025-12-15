import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FinalDoughIngredients } from '../types';

interface VisualizerProps {
  data: FinalDoughIngredients;
}

export const Visualizer: React.FC<VisualizerProps> = ({ data }) => {
  const chartData = [
    { name: 'Flour', value: data.whiteFlour + data.wholemealFlour, color: '#E6E2DD' }, // Stone
    { name: 'Water', value: data.water, color: '#BFDBF7' }, // Light Blue
    { name: 'Leaven', value: data.leaven, color: '#F4A261' }, // Orange-ish (Active)
    { name: 'Salt', value: data.salt, color: '#2D2D2D' }, // Charcoal
  ];

  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value}g`}
            contentStyle={{ 
              backgroundColor: '#FDFBF7', 
              border: 'none', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontFamily: 'Lato, sans-serif'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 text-xs font-sans text-gray-500 mt-2">
        {chartData.map((d) => (
            <div key={d.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
            </div>
        ))}
      </div>
    </div>
  );
};