/* eslint-disable no-undef */

import type { Fonts } from "@/types/styles.js";
import axios from "axios";

export const getFontsFromGoogle = async (font: string, options: Partial<Fonts>): Promise<string | null> => {
  try {
    if (!font || options.preload === false || options == null) return null;

    const weights = Array.isArray(options.weight) ? options.weight.join(";") : options.weight || "400;500;600;700;800";
    const display = options.display ?? "swap";
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@${weights}&display=${display}`;
    const css = (await axios.get(url)).data as string;
    const fontUrls = [...css.matchAll(/url\((.*?)\)/g)].map((match) => match[1]);

    if (fontUrls.length === 0) {
      console.warn("⚠️ No font files found in the response.");
      return null;
    }

    return css;
  } catch (error) {
    console.error(`❌ Can't get fonts from Google: ${error}`);
    process.exit(1);
  }
};