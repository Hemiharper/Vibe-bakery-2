import { LoafConfig, LeavenIngredients, FinalDoughIngredients, CONSTANTS } from '../types';

export const calculateRecipe = (config: LoafConfig): { leavenBuild: LeavenIngredients, finalDough: FinalDoughIngredients } => {
  const { loafCount, targetWeight, whiteFlourRatio, hydration } = config;
  
  // Total weight we are aiming for
  const totalTargetWeight = loafCount * targetWeight;

  // Step 1: Determine Base Flour
  // Formula: TotalPercentage = 1 (Flour) + Leaven% + Hydration% + Salt%
  const totalPercentage = 1 + CONSTANTS.LEAVEN_PCT + hydration + CONSTANTS.SALT_PCT;
  const baseFlour = totalTargetWeight / totalPercentage;

  // Step 2: Final Dough Ingredients
  const finalDough: FinalDoughIngredients = {
    whiteFlour: Math.round(baseFlour * whiteFlourRatio),
    wholemealFlour: Math.round(baseFlour * (1 - whiteFlourRatio)),
    water: Math.round(baseFlour * hydration),
    salt: Math.round(baseFlour * CONSTANTS.SALT_PCT),
    leaven: Math.round(baseFlour * CONSTANTS.LEAVEN_PCT),
    totalFlour: Math.round(baseFlour),
    totalDoughWeight: Math.round(totalTargetWeight)
  };

  // Step 3: Leaven Build
  // We need 'finalDough.leaven' amount, but we make 10% extra (buffer)
  const totalLeavenToMake = finalDough.leaven * CONSTANTS.BUFFER_PCT;

  const leavenBuild: LeavenIngredients = {
    starter: Math.round(totalLeavenToMake * CONSTANTS.LEAVEN_COMPOSITION.STARTER),
    flour: Math.round(totalLeavenToMake * CONSTANTS.LEAVEN_COMPOSITION.FLOUR),
    water: Math.round(totalLeavenToMake * CONSTANTS.LEAVEN_COMPOSITION.WATER),
    total: Math.round(totalLeavenToMake)
  };

  return { leavenBuild, finalDough };
};

export const formatTime = (hour: number, minute: number): string => {
  const h = hour.toString().padStart(2, '0');
  const m = minute.toString().padStart(2, '0');
  return `${h}:${m}`;
};