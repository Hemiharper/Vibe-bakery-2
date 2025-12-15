import React from 'react';
import { ScheduleStep } from '../types';
import { Clock, Thermometer } from 'lucide-react';

interface ScheduleCardProps {
  image?: string;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80";

const SCHEDULE_DATA: ScheduleStep[] = [
  { day: 'Day 1', time: '16:20', action: 'Mix Leaven', description: 'Rest 30m @ room temp, then fridge 18hrs.' },
  { day: 'Day 2', time: '10:30', action: 'Final Mix', description: 'Combine all ingredients.', temp: 'Goal: 35°C water' },
  { day: 'Day 2', time: '11:30', action: 'Fold 1', description: 'Stretch and fold.' },
  { day: 'Day 2', time: '12:00', action: 'Fold 2', description: 'Coil fold or stretch.' },
  { day: 'Day 2', time: '12:30', action: 'Fold 3', description: 'Coil fold.' },
  { day: 'Day 2', time: '13:00', action: 'Fold 4', description: 'Check dough strength.' },
  { day: 'Day 2', time: '14:30', action: 'Pre-shape', description: 'Bench rest 10 mins.' },
  { day: 'Day 2', time: '14:40', action: 'Shape', description: 'Final shaping into bannetons.' },
  { day: 'Day 2', time: '15:30', action: 'Retard', description: 'Place in fridge overnight.' },
  { day: 'Day 3', time: '08:30', action: 'Bake', description: 'Dutch oven or open bake.', temp: '45 mins total' },
];

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ image }) => {
  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden group bg-charcoal h-full border border-stone/50">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-105 opacity-60 mix-blend-overlay"
        style={{ backgroundImage: `url('${image || DEFAULT_IMAGE}')` }}
      ></div>
      
      {/* Glassmorphism Overlay Layer */}
      <div className="relative bg-white/90 backdrop-blur-md p-6 md:p-8 h-full">
        <div className="flex items-center gap-3 mb-8 border-b border-coffee/10 pb-4">
          <Clock className="text-coffee w-6 h-6" />
          <h2 className="text-2xl font-serif font-bold text-charcoal">The Schedule</h2>
        </div>

        <div className="relative border-l-2 border-coffee/30 ml-3 space-y-8 pl-8 py-2">
          {SCHEDULE_DATA.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-cream border-2 border-coffee"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                <span className="font-mono text-coffee font-bold text-lg">{step.time}</span>
                <h3 className="font-serif font-bold text-charcoal text-lg">{step.action}</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 text-sm">
                 <span className="text-gray-600 font-sans">{step.description}</span>
                 {step.temp && (
                   <span className="inline-flex items-center gap-1 text-roast font-bold bg-roast/10 px-2 py-0.5 rounded text-xs self-start sm:self-auto">
                     <Thermometer className="w-3 h-3" />
                     {step.temp}
                   </span>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};