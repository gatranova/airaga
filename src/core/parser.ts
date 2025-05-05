import type { AiragaElement } from "airaga";

/**
 * @param content 
 * @returns {Record<string, string>}
 *
 * @description
 * This function takes in a string of HTML content and returns an object of menu options.
 */
const parseMenu = (content: string): Record<string, string> => {
  const menuMatch = /<menu([^>]+)>(.*?)<\/menu>/gi;
  const menus: Record<string, string> = {};
  let menu: RegExpExecArray | null;

  while ((menu = menuMatch.exec(content)) !== null) {
    const menuContent = menu[1]!.trim() || "";
    const menuOptions = menuContent
      .split(" ")
      .map((option: string) => option.split("="))
      .reduce((acc: Record<string, string>, [key = "", value = ""]) => {
        acc[key] = value.replace(/"/g, "") as string;
        return acc;
      }, {} as Record<string, string>);

    Object.assign(menus, menuOptions);
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
  const audioMatch = /<audio[^>]+src="([^"]+)"[^>]*>/i;
  const match = audioMatch.exec(content);
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
const parseImage = (content: string): AiragaElement['img'] | undefined => {
  const imgMatch = /<img[^>]+src="([^"]+)"[^>]*>/i;
  const match = imgMatch.exec(content);
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
  const sceneTags = /<scene[^>]*>([\s\S]*?)<\/scene>/gi;
  const scenes: AiragaElement[] = [];
  let match: RegExpExecArray | null;

  while ((match = sceneTags.exec(content)) !== null) {
    const sceneContent = match[1]!.trim() || "";
    const idMatch = /id="([^"]+)"/.exec(match[0]);
    const id = idMatch ? idMatch[1] : undefined;

    const menu = parseMenu(sceneContent);
    const audio = parseAudio(sceneContent);
    const img = parseImage(sceneContent);

    scenes.push({ scene: sceneContent, id, menu, audio, img });
  }

  return scenes;
};