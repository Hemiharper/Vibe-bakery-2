export interface LoafConfig {
  loafCount: number;
  targetWeight: number; // in grams
  whiteFlourRatio: number; // 0.0 to 1.0
  hydration: number; // 0.6 to 0.9
}

export interface LeavenIngredients {
  starter: number;
  flour: number;
  water: number;
  total: number;
}

export interface FinalDoughIngredients {
  whiteFlour: number;
  wholemealFlour: number;
  water: number;
  salt: number;
  leaven: number;
  totalFlour: number;
  totalDoughWeight: number;
}

export interface ScheduleStep {
  time: string;
  day: string;
  action: string;
  description?: string;
  temp?: string;
}

// Coefficients based on logic provided
export const CONSTANTS = {
  LEAVEN_PCT: 0.40,
  SALT_PCT: 0.02,
  BUFFER_PCT: 1.1, // 10% overage for leaven build
  LEAVEN_COMPOSITION: {
    STARTER: 0.201,
    FLOUR: 0.523,
    WATER: 0.276
  }
};