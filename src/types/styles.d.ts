export type CssVariable = `--${string}`;
export type Display = "auto" | "block" | "swap" | "fallback" | "optional";

export interface Fonts {
  adjustFontFallback?: boolean;
  display: Display;
  fallback?: string[];
  preload?: boolean;
  style?: "normal" | Array<"normal">;
  subsets?: Array<"cyrillic" | "cyrillic-ext" | "latin" | "latin-ext" | "vietnamese">;
  weight?: | "400" | "500" | "600" | "700" | "800" | "variable" | Array<"400" | "500" | "600" | "700" | "800">;
}