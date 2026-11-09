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

