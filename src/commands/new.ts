/* eslint-disable no-undef */

/**
 * @module commands/new
 * 
 * @description
 * This module provides functions for creating a new Airaga game project.
 * It generates an initial configuration object and creates necessary folders for the game project.
 * 
 * @method generateIFID
 * @method newGame
 */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import dedent from "dedent";

export const generateIFID = (): string => {
  return uuidv4();
};

export const newGame = async (gameName: string, options: { database: string | null } = { database: null }): Promise<void> => {
  const folder = gameName === "." ? process.cwd() : join(process.cwd(), gameName);

  if (gameName !== "." && existsSync(folder)) {
    console.error(`❌ Folder "${gameName}" already exists.`);
    process.exit(1);
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
  mkdirSync(join(folder, "public"), { recursive: true });
  writeFileSync(join(folder, "public", "favicon.ico"), "");

  /**
   * @description
   * Create a scene folder to store scenes.
   */
  mkdirSync(join(folder, "src", "scene"), { recursive: true });
  writeFileSync(join(folder, "src", "scene", "index.arg"), dedent(
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
  mkdirSync(join(folder, "src", "item"), { recursive: true });
  writeFileSync(join(folder, "src", "item", "index.arg"), dedent(
    `
      export const items: Items = {};
    `,
  ));

  writeFileSync(join(folder, "src", "start.arg"), dedent(
    `
      import { Plus_Jakarta_Sans } from "@airaga/fonts";

      export const config = ${JSON.stringify(init, null, 2)};

      export const fonts = Plus_Jakarta_Sans({
        subsets: ["latin"],
        weight: ["400", "500", "600", "700", "800"],
      });

      <scene id="intro">
        Welcome to ${gameName}!
      </scene>
    `,
  ));

  // Write airaga.config.ts
  writeFileSync(join(folder, "airaga.config.ts"), dedent(
    `
      import type { Config } from "airaga";

      export const config: Config = {
        ifid: "${init.ifid}",
        name: "${init.name}",
        description: "${init.description}",
        version: "${init.version}",
        author: "Someone",
      };
    `,
  ));

  // Write .gitignore
  writeFileSync(join(folder, ".gitignore"), `/node_modules`);

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
        - \`scene\`
          - \`start.arg\`
        - \`items\`
          - \`character.arg\`
      - \`airaga.config.ts\`
      - \`.gitignore\`
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

  if (options.database != null) {
    console.log("🗄️ Configuring database integration...");
    // TODO: Generate db config, schema, dsb
  }

  console.log(`✅  Project "${gameName}" created successfully!`);
};