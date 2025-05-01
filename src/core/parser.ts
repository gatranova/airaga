import type { AiragaElement } from "airaga";

export const parseScene = (content: string): string[] => {
  const sceneRegex = /<scene>([\s\S]*?)<\/scene>/gi;
  const scenes: string[] = [];
  let match: RegExpExecArray | null;

  while((match = sceneRegex.exec(content)) !== null) scenes.push(match[1]!.trim());
  return scenes;
}

export const parseArgFile = (content: string): AiragaElement => {
  const scenes = parseScene(content);

  return {
    menu: {},
    scene: scenes.join("\n\n---\n\n"),
  };
}