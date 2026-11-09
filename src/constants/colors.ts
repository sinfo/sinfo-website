/**
 * SINFO Brand & Edition Colors
 *
 * This is the SINGLE SOURCE OF TRUTH for all website colors.
 * To update colors for a new edition/year, edit the palette and theme mappings below.
 */

export const PALETTE = {
  navy: "#000032", // RGB(0,0,50) - Dark Navy / Primary
  crimson: "#b01e47", // Crimson / Ruby Red
  purple: "#6a498f", // Purple / Violet
  blue: "#3190cf", // Cerulean Blue
  teal: "#55bf9d", // Mint / Teal Green
  peach: "#fcbb72", // Peach / Orange
  cream: "#fffaf2", // Off-white / Cream
  light: "#F2F5FC", // Original light background (cool crisp off-white)
} as const;

export type PaletteColor = keyof typeof PALETTE;

export const sinfoColors = {
  primary: PALETTE.navy, // #000032
  secondary: PALETTE.crimson, // #b01e47
  tertiary: PALETTE.peach, // #fcbb72
  quaternary: PALETTE.peach, // #fcbb72
  light: PALETTE.light, // #F2F5FC (restored to original crisp light color)
  quinary: PALETTE.teal, // #55bf9d (mint green / teal)
  senary: PALETTE.purple, // #6a498f (closest to old #c465a2)
  septenary: PALETTE.blue, // #3190cf (closest to old #48c6e4)

  // Direct color names for convenience
  navy: PALETTE.navy,
  crimson: PALETTE.crimson,
  purple: PALETTE.purple,
  blue: PALETTE.blue,
  teal: PALETTE.teal,
  peach: PALETTE.peach,
  cream: PALETTE.cream,

  days: {
    mon: PALETTE.crimson, // #b01e47
    tue: PALETTE.peach, // #fcbb72
    wed: PALETTE.teal, // #55bf9d
    thu: PALETTE.blue, // #3190cf
    fri: PALETTE.purple, // #6a498f
  },

  editions: {
    "32": PALETTE.purple, // #6a498f (closest to old #323363)
    "33": PALETTE.navy,
  },
};

export interface ColorGradient {
  start: string;
  middle?: string;
  end: string;
}

export const BLOB_GRADIENTS: Record<string, ColorGradient> = {
  // Crimson (Software Engineering / Monday)
  [PALETTE.crimson.toLowerCase()]: {
    start: "#c82a58",
    middle: PALETTE.crimson,
    end: "#73112e",
  },
  // Peach (Games / Tuesday)
  [PALETTE.peach.toLowerCase()]: {
    start: "#ffd199",
    middle: PALETTE.peach,
    end: "#d9782d",
  },
  // Teal (Cybersecurity / Wednesday)
  [PALETTE.teal.toLowerCase()]: {
    start: "#6ee0be",
    middle: PALETTE.teal,
    end: "#276b56",
  },
  // Blue (Multimedia / Thursday)
  [PALETTE.blue.toLowerCase()]: {
    start: "#4faee8",
    middle: PALETTE.blue,
    end: "#16537e",
  },
  // Purple (AI / Friday / Edition 32)
  [PALETTE.purple.toLowerCase()]: {
    start: "#835bb2",
    middle: PALETTE.purple,
    end: "#3d2358",
  },
  // Navy (Brand primary)
  [PALETTE.navy.toLowerCase()]: {
    start: "#122066",
    middle: PALETTE.navy,
    end: "#00001a",
  },
};

function adjustHexBrightness(hex: string, percent: number): string {
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length !== 6) return hex;
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return hex;
  const r = Math.min(
    255,
    Math.max(0, (num >> 16) + Math.round((percent / 100) * 255)),
  );
  const g = Math.min(
    255,
    Math.max(0, ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255)),
  );
  const b = Math.min(
    255,
    Math.max(0, (num & 0x0000ff) + Math.round((percent / 100) * 255)),
  );
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function getBlobGradient(color: string): ColorGradient {
  if (!color) {
    return {
      start: PALETTE.navy,
      end: PALETTE.navy,
    };
  }
  const normalized = color.toLowerCase();
  if (BLOB_GRADIENTS[normalized]) {
    return BLOB_GRADIENTS[normalized];
  }
  return {
    start: adjustHexBrightness(color, 12),
    middle: color,
    end: adjustHexBrightness(color, -20),
  };
}
