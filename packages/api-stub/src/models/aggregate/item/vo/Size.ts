export interface Size {
  label?: string; // Optional: S, M, L, XL, etc.
  width?: number; // in cm or inches
  height?: number;
  depth?: number;
  weight?: number; // in kg
  measureUnit?: string; // metric or imperial
}