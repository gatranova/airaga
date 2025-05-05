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

import { error, log } from "node:console";
import { argv, exit, stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { buildForProduction } from "@/commands/build.js";
import { developmentMode } from "@/commands/dev.js";
import { generateIFID } from "@/commands/generate.js";
import { newGame } from "@/commands/new.js";

const args = argv.slice(2);
const command = args[0];
const gameName = args[1];

const askQuestion = async (question: string): Promise<string> => {
  const rl = createInterface({ input, output });
  const answer = (await rl.question(question)).toLowerCase().replace(/ /g, "-");
  rl.close();
  return answer.trim();
};

const createNewProject = async (): Promise<void> => {
  log("🌟  Welcome to Airaga! Let's create your text-based game.");

  const name = (gameName ?? "") || (await askQuestion("📝  What is the name of your game? "));
  if (!name) {
    error("❌ Game name is required.");
    exit(1);
  }

  await newGame(name);
};

if (typeof command !== "string" || command.trim() === null) {
  error("❌  No command provided. Example: airaga new <project-name>");
  exit(1);
}

if (command !== "build" && command !== "dev" && command !== "generate" && command !== "new") {
  error(`❌  Unknown command ${command}. Supported commands are build, dev, generate, and new.`);
  exit(1);
}

if (command === "build") buildForProduction();
else if (command === "dev") await developmentMode();
else if (command === "generate") generateIFID();
else if (command === "new") await createNewProject();
else exit(1);