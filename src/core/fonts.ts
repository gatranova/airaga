/* eslint-disable no-undef */

/**
 * @module core/fonts
 * @returns {Promise<{ css: string; url: string } | void>}
 * 
 * @description
 * This module provides functions for fetching web fonts from Google Fonts.
 * It returns the CSS code and the URL of the font files.
 */

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

    if (fontUrls.length === 0) return console.warn("⚠️  No font files found in the response.");
    return { css, url };
  } catch (error) {
    console.error(`❌ Can't get fonts from Google: ${error}`);
    process.exit(1);
  }
};