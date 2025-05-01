/* eslint-disable no-undef */

/**
 * @module commands/cli
 * 
 * @description
 * This module provides functions for creating a new Airaga game project.
 * It generates an initial configuration object and creates necessary folders for the game project.
 * 
 * @method newGame
 */

import { newGame } from "@/commands/new.js";

const args = process.argv.slice(2);
const command = args[0];
const gameName = args[1];

if (typeof command !== "string" || command.trim() === "") {
  console.error("❌ No command provided. Example: airaga new <project-name>");
  process.exit(1);
}

if (command !== "generate" && command !== "new") {
  console.error(`❌ Unknown command: ${command}. Supported: new, generate.`);
  process.exit(1);
}

if (typeof gameName !== "string" || gameName.trim() === "") {
  console.error("❌ Please provide a name for your game.");
  process.exit(1);
}

await newGame(gameName);