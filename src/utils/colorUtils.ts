export const lightenColor = (
  rgb: {
    r: number;
    g: number;
    b: number;
  },
  amount: number
): { r: number; g: number; b: number } => {
  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const newR = clamp(rgb.r + amount, 0, 255);
  const newG = clamp(rgb.g + amount, 0, 255);
  const newB = clamp(rgb.b + amount, 0, 255);

  return { r: newR, g: newG, b: newB };
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
};

export const getReadableTextColor = (rgb: {
  r: number;
  g: number;
  b: number;
}): string => {
  // Calculate the relative luminance of the color
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

  // Return 'black' for light backgrounds and 'white' for dark backgrounds
  return luminance > 0.5 ? "black" : "white";
};

export const rgbToString = (rgb: {
  r: number;
  g: number;
  b: number;
}): string => {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};
