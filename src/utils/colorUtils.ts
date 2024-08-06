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

export const rgbToHex = (r: number, g: number, b: number) => {
  // Convert RGB to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
  // Convert RGB to HSL
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

export const hslToRgb = ({ h, s, l }: { h: number; s: number; l: number }) => {
  // Convert HSL to RGB
  let r: number, g: number, b: number;

  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 3) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

export const capSaturation = (color: { r: number; g: number; b: number }, maxSaturation: number) => {
  // Convert to HSL
  let { h, s, l } = rgbToHsl(color);
  // Cap the saturation
  s = Math.min(s, maxSaturation);
  // Convert back to RGB
  return hslToRgb({ h, s, l });
};

export const capBrightness = (color: { r: number; g: number; b: number }, maxBrightness: number) => {
  // Convert to HSL
  let { h, s, l } = rgbToHsl(color);
  // Cap the saturation
  l = Math.min(l, maxBrightness);
  // Convert back to RGB
  return hslToRgb({ h, s, l });
};

export const capSaturationAndBrightness = (color: { r: number; g: number; b: number }, maxSaturation: number, maxLightness: number) => {
  let { h, s, l } = rgbToHsl(color);
  s = Math.min(s, maxSaturation);
  l = Math.min(l, maxLightness);
  return hslToRgb({ h, s, l });
};

export const rgbToString = (rgb: {
  r: number;
  g: number;
  b: number;
}): string => {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};
