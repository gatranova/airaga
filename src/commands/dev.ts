import { log } from "console";
import { readFileSync } from "fs";
import { createServer } from "http";
import { join } from "path";
import { cwd } from "process";
import { html as page } from "@/constants/html.js";
import { renderSceneToHtml } from "@/core/engine.js";
import { parseScene } from "@/core/parser.js";

export const developmentMode = async (): Promise<void> => {
  const startMenu = join(cwd(), "src", "start.arg");
  const scenes = parseScene(readFileSync(startMenu, "utf-8"));
  const html = scenes.map(renderSceneToHtml).join("\n");

  const server = createServer((_, response) => {
    response.writeHead(200, { "content-type": "text/html" });
    response.end(page(html));
  });

  server.listen(3000, () => {
    log("🚀 Your game running at http://localhost:3000");
  });
};