/**
 * @module commands/new
 *
 * @description
 * This module provides functions for creating a new Airaga game project.
 * It generates an initial configuration object and creates necessary folders for the game project.
 *
 * @method newGame
 */

import { Buffer } from "buffer"
import { error, log } from "console";
import { existsSync, mkdirSync, writeFile, writeFileSync } from "fs";
import { join } from "path";
import { cwd, exit } from "process";
import { Version } from "@/core/version.js";
import { base64 } from "@/constants/base64.js";
import dedent from "dedent";

export const newGame = async (gameName: string): Promise<void> => {
  const folder = gameName === "." ? cwd() : join(cwd(), gameName);

  if (gameName !== "." && existsSync(folder)) {
    error(`❌ Folder "${gameName}" already exists.`);
    exit(1);
  }

  if (gameName !== ".") mkdirSync(folder);

  /**
   * @type {Record<string, string>}
   * Create an initial configuration object.
   */
  const init: Record<string, string | null> = {
    ifid: null,
    name: gameName,
    description: "A new Airaga text game project.",
    version: "1.0.0",
    author: "",
  };

  // Public assets folder
  const img = `data:image/x-icon;base64,${base64}`.split(",")[1];
  if (img == null) throw new Error("Invalid base64 image, can't create favicon.");

  mkdirSync(join(folder, "public"), { recursive: true });
  writeFile(join(folder, "public", "favicon.ico"), Buffer.from(img, "base64"), (error) => {
    if (error) throw error;
  });

  /**
   * @description
   * Create a scene folder to store scenes.
   */
  mkdirSync(join(folder, "src", "scene"), { recursive: true });
  writeFileSync(join(folder, "src", "scene", "1.arg"), dedent(
    `
      <scene>
        This is the 2nd scene from your game.
      </scene>
    `,
  ));

  /**
   * @description
   * Create an item folder to store items.
   */
  mkdirSync(join(folder, "src", "items"), { recursive: true });
  writeFileSync(join(folder, "src", "items", "character.arg"), dedent(
    `
      import type { Item } from "@airaga/items";

      export const item: Item = {
        id: "item",
        name: "Item",
        description: "An item",
      }
    `,
  ));

  writeFileSync(join(folder, "src", "start.arg"), dedent(
    `
      <scene>
        Welcome to Airaga!

        Airaga is an opinionated text game engine built with TypeScript.
        It is designed to simplify and accelerate the development of interactive fiction
        by providing a structured scene-based architecture.
        
        <menu new="Start New Game" continue="Continue" />
      </scene>
    `,
  ));

  // Write airaga.config.ts
  writeFileSync(join(folder, "airaga.config.ts"), dedent(
    `
      import type { Config } from "airaga";

      export const config: Config = {
        ifid: ${null},
        name: "${init.name}",
        description: "${init.description}",
        version: "${init.version}",
        author: "Someone",
      };
    `,
  ));

  // Write .gitignore
  writeFileSync(join(folder, ".gitignore"), `/node_modules`);

  // Write package.json
  const hasPackageJson = existsSync(join(folder, "package.json"));
  if (!hasPackageJson) {
    const writePackageJson = {
      name: gameName === "." ? "airaga-game" : gameName,
      version: "1.0.0",
      main: "src/start.arg",
      type: "module",
      scripts: {
        build: "airaga build",
        dev: "airaga dev",
      },
      devDependencies: {
        airaga: `^${Version}`,
        "@types/node": "^18.11.18",
        typescript: "^5.0.4",
      },
      license: "MIT",
      types: "airaga.config.ts",
    };

    writeFileSync(join(folder, "package.json"), JSON.stringify(writePackageJson, null, 2));
  }

  // Write README.md
  writeFileSync(join(folder, "README.md"), dedent(
    `
      # Airaga New Game Project

      Welcome to Airaga, a text-based adventure game built using [Airaga](https://github.com/a6iyyu/airaga) engine!

      ## ✨ Overview

      - **IFID**: <ifid>
      - **Description**: A new Airaga text game project.
      - **Version**: 1.0.0
      - **Author**: [Your Name Here]

      ## 🏗 Project Structure

      - \`public\`
        - \`favicon.ico\`
      - \`src\`
        - \`items\`
          - \`character.arg\`
        - \`scene\`
          - \`1.arg\`
        - \`start.arg\`
      - \`.gitignore\`
      - \`airaga.config.ts\`
      - \`package.json\`
      - \`README.md\`

      ## 🚀 Getting Started

      1. Create a new game:
      \`\`\`bash
      bun airaga new game
      \`\`\`
      2. Change directory
      \`\`\`bash
      cd game
      \`\`\`
      3. Install dependencies (if needed):
      \`\`\`bash
      bun install
      \`\`\`
      4. Run the game:
      \`\`\`bash
      airaga start
      \`\`\`

      ## 📖 Writing Scenes

      Scenes are written using HTML-like tags:
      \`\`\`html
      <scene>
        This is the opening of your story.
      </scene>
      \`\`\`

      Each <scene> represents a single page or node in your game's storyline.

      ## 🔧 Configuration (airaga.config.ts)

      \`\`\`ts
      import type { Config } from "airaga";

      export const config: Config = {
        ifid: "<ifid>",
        name: "New Text Game",
        description: "A new Airaga text game project.",
        version: "1.0.0",
        author: "",
      };
      \`\`\`

      ## 📜 License
      
      This project is licensed under the [MIT License](https://github.com/a6iyyu/airaga/blob/main/LICENSE).
    `,
  ));

  log(`✅  Project "${gameName}" created successfully!`);
};