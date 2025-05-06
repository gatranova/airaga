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

  if (element.scene != null) {
    parts.push(`<h4>${element.scene}</h4>`);
  }

  if (element.br) {
    parts.push(`<br />`);
  }

  if (element.img) {
    parts.push(`<img src="${element.img.props!.src}" />`);
  }

  if (element.audio) {
    parts.push(`<audio controls src="${element.audio.props!.src}"></audio>`);
  }

  if (Array.isArray(element.menu)) {
    for (const menu of element.menu) {
      for (const [key, value] of Object.entries(menu)) {
        parts.push(`<button data-${key}="${key}">${value}</button>`);
      }
    }
  }

  return `<section ${element.id != null ? `id="${element.id}"` : ""}">${parts.join("\n")}</section>`;
};