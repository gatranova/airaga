/**
 * Fetch Google Fonts CSS and extract font file URLs.
 *
 * @param font - The font name (e.g., "Roboto")
 * @param options - Font configuration options (display, weight, etc.)
 * @returns {Promise<{ css: string; url: string } | void>}
 *
 * @description
 * An object containing the CSS and Google Fonts URL.
 */

import { error, warn } from "console";
import { exit } from "process";
import type { Fonts } from "@/types/styles.js";
import axios from "axios";

export const getFontsFromGoogle = async (font: string, options: Partial<Fonts>): Promise<{ css: string; url: string } | void> => {
  try {
    if (!font || options.preload === false || options == null) return { css: "", url: "" };

    const weights = Array.isArray(options.weight) ? options.weight.join(";") : options.weight || "400;500;600;700;800";
    const display = options.display ?? "swap";
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@${weights}&display=${display}`;
    const css = (await axios.get(url)).data as string;
    const fontUrls = [...css.matchAll(/url\((.*?)\)/g)].map((match) => match[1]);

    if (fontUrls.length === 0) return warn("⚠️  No font files found in the response.");
    return { css, url };
  } catch (err) {
    error(`❌ Can't get fonts from Google: ${err}`);
    exit(1);
  }
};