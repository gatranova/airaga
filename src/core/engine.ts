/**
 * @module core/engine
 *
 * @description
 * This module provides functions for rendering Airaga elements to HTML.
 *
 * @method renderSceneToHtml
 * @returns {string}
 */

import type { AiragaElement } from "airaga";

export const renderSceneToHtml = (element: AiragaElement): string => {
  const parts: string[] = [];

  if (element.img) {
    parts.push(`<img src="${element.img.props!.src}" />`);
  }

  if (element.audio) {
    parts.push(`<audio controls src="${element.audio.props!.src}"></audio>`);
  }

  if (Array.isArray(element.menu)) {
    for (const menu of element.menu) {
      const { text, ...rest } = menu;
      const attributes = Object.entries(rest).map(([key, value]) => `data-${key}="${value}"`).join(" ");
      parts.push(`<button ${attributes}>${text}</button>`);
    }
  }

  return `<section id="${element.id ?? ""}">${parts.join("\n")}</section>`;
};