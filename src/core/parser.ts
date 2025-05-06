import type { AiragaElement } from "airaga";

/**
 * @param content
 * @returns {Record<string, string>}
 *
 * @description
 * This function takes in a string of HTML content and returns an object of menu options.
 */
const parseMenu = (content: string): Array<Record<string, string>> => {
  const menuTag = /<menu\s+([^>]*)\/?>/gi;
  const attrRegex = /(\w+)="([^"]*)"/g;
  const menus: Array<Record<string, string>> = [];
  let match: RegExpExecArray | null;

  while ((match = menuTag.exec(content)) !== null) {
    const attrs = match[1] ?? "";
    const menu: Record<string, string> = {};
    let attrMatch: RegExpExecArray | null;

    while ((attrMatch = attrRegex.exec(attrs)) !== null) {
      const [, key, value] = attrMatch as unknown as [string, string, string];
      menu[key as string] = value as string;
    }

    menus.push(menu);
  }

  return menus;
};

/**
 * @param content
 * @returns {AiragaElement["audio"] | undefined}
 *
 * @description
 * This function takes in a string of HTML content and returns an object of audio properties.
 */
const parseAudio = (content: string): AiragaElement["audio"] | undefined => {
  const audioTag = /<audio[^>]+src="([^"]+)"[^>]*>/i;
  const match = audioTag.exec(content);
  if (match) return { type: "audio", props: { src: match[1] } };
  return undefined;
};

/**
 * @param content
 * @returns {AiragaElement["img"] | undefined}
 *
 * @description
 * This function takes in a string of HTML content and returns an object of image properties.
 */
const parseImage = (content: string): AiragaElement["img"] | undefined => {
  const imgTag = /<img[^>]+src="([^"]+)"[^>]*>/i;
  const match = imgTag.exec(content);
  if (match) return { type: "img", props: { src: match[1] } };
  return undefined;
};

/**
 * @param content
 * @returns {Array<AiragaElement>}
 *
 * @description
 * This function takes in a string of HTML content and returns an array of scene elements.
 */
export const parseScene = (content: string): Array<AiragaElement> => {
  const sceneTag = /<scene[^>]*>([\s\S]*?)<\/scene>/gi;
  const scenes: AiragaElement[] = [];
  let match: RegExpExecArray | null;

  while ((match = sceneTag.exec(content)) !== null) {
    const rawContent = match[1]!.trim();
    const idMatch = /id="([^"]+)"/.exec(/<scene([^>]*)>/i.exec(match[0])?.[1] ?? "");
    const id = idMatch ? idMatch[1] : undefined;

    const menu = parseMenu(rawContent);
    const audio = parseAudio(rawContent);
    const img = parseImage(rawContent);

    const cleaned = rawContent
      .replace(/<menu[\s\S]*?\/?>/gi, "")
      .replace(/<audio[\s\S]*?\/?>/gi, "")
      .replace(/<img[\s\S]*?\/?>/gi, "")
      .trim();

    scenes.push({ scene: cleaned, id, menu, audio, img });
  }

  return scenes;
};