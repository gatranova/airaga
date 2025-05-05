import { log } from "console";
import { readFileSync } from "fs";
import { createServer } from "http";
import { join } from "path";
import { cwd } from "process";
import { renderSceneToHtml } from "@/core/engine.js";
import { parseScene } from "@/core/parser.js";

export const developmentMode = async (): Promise<void> => {
  const startMenu = join(cwd(), "src", "start.arg");
  const scenes = parseScene(readFileSync(startMenu, "utf-8"));
  const html = scenes.map(renderSceneToHtml).join("\n");

  const page = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Airaga</title>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  const server = createServer((_, response) => {
    response.writeHead(200, { "content-type": "text/html" });
    response.end(page);
  });

  server.listen(3000, () => {
    log("🚀 Airaga dev server running at http://localhost:3000");
  });
};