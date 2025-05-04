/**
 * @param content 
 * @returns {Array<AiragaElement>}
 *
 * @description
 * Parse scene content into an array of Airaga elements.
 */

import type { AiragaElement } from "airaga";

// prettier-ignore
export const parseScene = (content: string): Array<AiragaElement> => {
  const tags = /<scene.*?>([\s\S]*?)<\/scene>/gi;
  const scenes: AiragaElement[] = [];
  let match: RegExpExecArray | null;

  while ((match = tags.exec(content)) !== null) {
    const content = match[1]!.trim() || "";
    const id = /id="([^"]+)"/.exec(match[0]);
    const tags = /tags="([^"]+)"/.exec(match[0]);
    scenes.push({ scene: content, id: id ? id[1] : undefined, tags: tags ? tags[1]!.split(",") : [] });
  }

  return scenes;
}