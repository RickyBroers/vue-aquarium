export const FISH_TYPE = {
  GOLDEN_PURPLE: "golden_purple",
  GOLDFISH: "goldfish",
  GUPPIE: "guppie",
  TROPICAL: "tropical",
  TUNA: "tuna",
} as const;

export type ObjectValues<T> = T[keyof T];

export type FishType = ObjectValues<typeof FISH_TYPE>;
