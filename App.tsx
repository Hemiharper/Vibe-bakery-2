import React, { useState, useEffect } from 'react';
import { calculateRecipe } from './utils/bakeryMath';
import { LoafConfig } from './types';
import { InputSlider } from './components/InputSlider';
import { IngredientRow } from './components/IngredientRow';
import { ScheduleCard } from './components/ScheduleCard';
import { Visualizer } from './components/Visualizer';
import { Wheat, Droplets, UtensilsCrossed } from 'lucide-react';

// Assets
const IMG_CRUMB_TEXTURE = 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=1000&q=20'; // Flour texture (Unchanged)
const IMG_HERO = 'https://i.imgur.com/tTPzVDR.jpeg'; // User "Wide" image
const IMG_INGREDIENTS = 'https://i.imgur.com/IcD5XQJ.jpeg'; // User "Hands" image (for Setup section)
const IMG_HANDS = 'https://i.imgur.com/K5l9bM2.jpeg'; // User "Ingredients" image (for Schedule section)

const App: React.FC = () => {
  // State
  const [config, setConfig] = useState<LoafConfig>({
    loafCount: 1,
    targetWeight: 850,
    whiteFlourRatio: 0.9,
    hydration: 0.78
  });

  const [results, setResults] = useState(calculateRecipe(config));
  const [loaded, setLoaded] = useState(false);

  // Trigger fade-in on mount
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Recalculate whenever inputs change
  useEffect(() => {
    setResults(calculateRecipe(config));
  }, [config]);

  // Handlers
  const handleUpdate = (key: keyof LoafConfig, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen relative text-charcoal font-sans selection:bg-coffee selection:text-white pb-20">
      
      {/* 1. Global Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 mix-blend-multiply opacity-[0.03] bg-repeat"
        style={{ backgroundImage: `url('${IMG_CRUMB_TEXTURE}')`, backgroundSize: '400px' }}
      />

      {/* 2. Hero Header */}
      <header className="relative w-full h-[50vh] min-h-[450px] flex items-center justify-center overflow-hidden mb-12 shadow-2xl bg-charcoal">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 opacity-90"
          style={{ backgroundImage: `url('${IMG_HERO}')` }}
        />
        {/* Gradient Overlay - Darker at top for text visibility, fading to cream at bottom to blend with page */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-cream" />
        
        {/* Content */}
        <div className={`relative z-10 text-center px-4 transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-xl">
            <Wheat className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] mb-4 tracking-tight">
            The Vibe Bakery
          </h1>
          <p className="text-white font-serif italic text-xl md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] tracking-wide">
            Artisan Sourdough Calculator
          </p>
        </div>
      </header>

      <main className={`max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
        
        {/* Left Column: Controls (Sticky on Desktop) */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-stone/50 overflow-hidden lg:sticky lg:top-8 transition-transform hover:shadow-xl duration-300">
            
            {/* 3. Input Visual Header */}
            <div 
              className="h-[180px] w-full bg-cover bg-center relative bg-charcoal"
              style={{ backgroundImage: `url('${IMG_INGREDIENTS}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                 <h2 className="text-white text-3xl font-serif font-bold drop-shadow-md flex items-center gap-3">
                    <UtensilsCrossed className="w-6 h-6 text-stone-200" />
                    Setup
                 </h2>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <label className="text-charcoal font-serif font-bold text-lg block mb-2">Loaves</label>
                <input
                  type="number"
                  min="1"
                  value={config.loafCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val > 0) handleUpdate('loafCount', val);
                  }}
                  className="w-full bg-stone/20 border border-stone rounded-lg px-4 py-2 text-coffee font-sans font-bold text-lg focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee transition-all"
                />
              </div>

              <InputSlider
                label="Target Weight"
                value={config.targetWeight}
                min={500}
                max={1700}
                step={10}
                onChange={(v) => handleUpdate('targetWeight', v)}
                formatValue={(v) => `${v}g`}
                description="Standard bâtard is ~850g."
              />

              <div className="border-t border-stone my-6"></div>

              <InputSlider
                label="Hydration"
                value={config.hydration}
                min={0.60}
                max={0.90}
                step={0.01}
                onChange={(v) => handleUpdate('hydration', v)}
                formatValue={(v) => `${Math.round(v * 100)}%`}
                description={config.hydration > 0.8 
                  ? "Warning: Very sticky dough. Requires strong flour & experience." 
                  : config.hydration < 0.7 
                  ? "Stiff dough. Tighter crumb, easier to handle." 
                  : "The sweet spot for open crumb."}
              />

              <InputSlider
                label="Flour Blend"
                value={config.whiteFlourRatio}
                min={0.0}
                max={1.0}
                step={0.05}
                onChange={(v) => handleUpdate('whiteFlourRatio', v)}
                formatValue={(v) => {
                  const white = Math.round(v * 100);
                  return `${white}% White / ${100 - white}% Whole`;
                }}
              />
            </div>
          </div>
        </section>

        {/* Right Column: Results */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* Phase 1: The Prep */}
          <div className="bg-flour rounded-xl shadow-lg border border-stone/50 p-6 md:p-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 text-coffee">
              <Wheat size={140} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-roast mb-2 block">Phase 1 • Night Before</span>
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Leaven Build</h2>
            <p className="text-sm text-gray-600 mb-6 max-w-lg font-medium">
              Mix these ingredients the night before. This includes a 10% buffer so you aren't scraping the jar.
              Uses a "Stiff Levain" ratio based on Hackney Wild.
            </p>

            <div className="space-y-1 max-w-md bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-stone/30">
              <IngredientRow label="Starter Culture" weight={results.leavenBuild.starter} />
              <IngredientRow label="Whole Rye" weight={results.leavenBuild.flour} />
              <IngredientRow label="Water (Warm)" weight={results.leavenBuild.water} />
              <div className="mt-4 pt-4 border-t border-coffee/20 flex justify-between items-center text-coffee font-bold text-lg">
                <span>Total Build</span>
                <span>{results.leavenBuild.total}g</span>
              </div>
            </div>
          </div>

          {/* Phase 2: The Final Mix */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-t-4 border-coffee hover:shadow-xl transition-shadow duration-300">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <span className="text-xs font-bold uppercase tracking-widest text-coffee mb-2 block">Phase 2 • Bake Day</span>
                   <h2 className="text-4xl font-serif font-bold text-charcoal mb-2">The Final Mix</h2>
                   <p className="text-stone-500 font-medium">Total Dough Weight: <span className="text-charcoal font-bold">{results.finalDough.totalDoughWeight}g</span></p>
                </div>
                <div className="hidden sm:flex p-3 bg-cream rounded-full shadow-inner text-coffee">
                   <Droplets className="w-8 h-8" />
                </div>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="space-y-3">
                    <IngredientRow 
                      label="White Flour" 
                      weight={results.finalDough.whiteFlour} 
                      percentage={Math.round((results.finalDough.whiteFlour / results.finalDough.totalFlour) * 100)}
                    />
                    <IngredientRow 
                      label="Wholemeal Flour" 
                      weight={results.finalDough.wholemealFlour} 
                      percentage={Math.round((results.finalDough.wholemealFlour / results.finalDough.totalFlour) * 100)}
                    />
                    <IngredientRow 
                      label="Water" 
                      weight={results.finalDough.water} 
                      percentage={Math.round(config.hydration * 100)}
                      highlight
                    />
                    <IngredientRow 
                      label="Leaven" 
                      weight={results.finalDough.leaven} 
                      percentage={40}
                    />
                    <IngredientRow 
                      label="Salt" 
                      weight={results.finalDough.salt} 
                      percentage={2}
                    />
                </div>

                <div className="bg-cream/50 rounded-xl p-6 shadow-inner border border-stone/20">
                  <h3 className="text-xs font-bold text-center text-coffee/60 uppercase tracking-widest mb-4">Dough Composition</h3>
                  <Visualizer data={results.finalDough} />
                </div>
            </div>
          </div>

          {/* 4. Schedule Card with Glassmorphism */}
          <ScheduleCard image={IMG_HANDS} />

        </section>
      </main>

      {/* Footer */}
      <footer className="text-center mt-20 text-gray-400 text-sm font-sans relative z-10 pb-8">
        <p>&copy; {new Date().getFullYear()} The Vibe Bakery. Crafted with code & flour.</p>
      </footer>
    </div>
  );
};

export default App;