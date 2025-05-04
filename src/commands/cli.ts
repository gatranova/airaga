/* eslint-disable no-undef */

/**
 * @module commands/cli
 * 
 * @description
 * This module provides functions for creating a new Airaga game project.
 * It generates an initial configuration object and creates necessary folders for the game project.
 * 
 * @method askQuestion
 * @returns {Promise<string>}
 *
 * @method createNewProject
 * @returns {Promise<void>}
 */

import { stdin as input, stdout as output } from "node:process";
import { buildForProduction } from "@/commands/build.js";
import { generateIFID } from "@/commands/generate.js";
import { newGame } from "@/commands/new.js";
import readline from "node:readline/promises";

const args = process.argv.slice(2);
const command = args[0];
const gameName = args[1];

const askQuestion = async (question: string): Promise<string> => {
  const rl = readline.createInterface({ input, output });
  const answer = (await rl.question(question)).toLowerCase().replace(/ /g, "-");
  rl.close();
  return answer.trim();
};

const createNewProject = async (): Promise<void> => {
  console.log("🌟  Welcome to Airaga! Let's create your text-based game.");

  const name = (gameName ?? "") || await askQuestion("📝  What is the name of your game? ");
  if (!name) {
    console.error("❌ Game name is required.");
    process.exit(1);
  }

  await newGame(name);
};

if (typeof command !== "string" || command.trim() === null) {
  console.error("❌  No command provided. Example: airaga new <project-name>");
  process.exit(1);
}

if (command !== "generate" && command !== "new") {
  console.error(`❌  Unknown command: ${command}. Supported: new, generate.`);
  process.exit(1);
}

if (command === "new") await createNewProject();
else if (command === "generate") generateIFID();
else if (command === "build") buildForProduction();
else process.exit(1);