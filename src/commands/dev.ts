import { error, log } from "console";
import { readFileSync } from "fs";
import { createServer } from "http";
import { join } from "path";
import { cwd, exit } from "process";
import { html as page } from "@/constants/html.js";
import { renderSceneToHtml } from "@/core/engine.js";
import { parseScene } from "@/core/parser.js";

export const developmentMode = async (): Promise<void> => {
  const startPath = join(cwd(), "src", "start.arg");
  const startFile = readFileSync(startPath, "utf-8").trim();

  if (!startFile.length) {
    error("❌ start.arg file is missing or empty.");
    exit(1);
  }

  /**
   * @todo
   * TODO: Add IFID check
   */
  // const config = await loadConfig();
  // const runtime = argv[0] != null && argv[0].includes("bun") ? "bunx" : "npx";

  // if (config.ifid == null) {
  //   error(`❌ Game IFID is missing. Run: ${runtime} airaga generate`);
  //   exit(1);
  // }

  const scenes = parseScene(startFile);
  const html = scenes.map(renderSceneToHtml).join("\n");

  const server = createServer((_, response) => {
    response.writeHead(200, { "content-type": "text/html" });
    response.end(page(html));
  });

  server.listen(3000, () => {
    log("🚀 Your game running at http://localhost:3000");
  });
};