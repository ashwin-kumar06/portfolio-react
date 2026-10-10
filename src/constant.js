export const COLORS = Object.freeze({
  burntOrange: "#BB3E00",
  goldenYellow: "#F7AD45",
  sageGreen: "#657C6A",
  lightSage: "#A2B9A7",
});

// Apply these to a parent element to make the palette available in CSS.
export const COLOR_VARIABLES = Object.freeze({
  "--color-burnt-orange": COLORS.burntOrange,
  "--color-golden-yellow": COLORS.goldenYellow,
  "--color-sage-green": COLORS.sageGreen,
  "--color-light-sage": COLORS.lightSage,
});
