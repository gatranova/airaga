/* eslint-disable no-unused-vars */

/**
 * @module jsx
 *
 * @description
 * JSX types for Airaga.
 */

import type { AiragaElement } from "@/types/index.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      scene: Partial<AiragaElement>;
      br: Record<string, never>;
      hr: Record<string, never>;
      choices: Record<string, never>;
      audio: {
        src: string;
        controls?: boolean;
      };
      img: {
        src: string;
        alt?: string;
        width?: number;
        height?: number;
      };
    }
  }
}