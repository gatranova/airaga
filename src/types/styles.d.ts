type Display = "auto" | "block" | "swap" | "fallback" | "optional";
type Weight = "400" | "500" | "600" | "700" | "800" | "variable";

type Subsets =
  | "cyrillic"
  | "cyrillic-ext"
  | "latin"
  | "latin-ext"
  | "vietnamese";

export interface Fonts {
  adjustFontFallback?: boolean;
  display: Display;
  fallback?: string[];
  preload?: boolean;
  style?: "normal" | Array<"normal">;
  subsets?: Subsets | Array<Subsets>;
  weight?: Weight | Array<Weight>;
}