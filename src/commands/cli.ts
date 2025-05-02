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

import type { Database } from "@airaga/db";
import { stdin as input, stdout as output } from "node:process";
import { newGame } from "@/commands/new.js";
import readline from "node:readline/promises";
import prompts from "prompts";

const args = process.argv.slice(2);
const command = args[0];
const gameName = args[1];

const ask = async (question: string): Promise<string> => {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(question);
  rl.close();
  return answer.trim();
};

const createNewProject = async (): Promise<void> => {
  console.log("🌟  Welcome to Airaga! Let's create your text-based game.");

  const name = (gameName ?? "") || await ask("📝  What is the name of your game? ");
  if (!name) {
    console.error("❌ Game name is required.");
    process.exit(1);
  }

  const database = (await ask("🗃️   Do you want to use a database? (y/n) ")).toLowerCase().startsWith("y");
  let selectedDatabase: string | null = null;
  if (database) {
    const response = await prompts({
      type: "select",
      name: "database",
      message: "🗃️   What database do you want to use?",
      choices: [
        { title: "MySQL", value: "mysql" },
        { title: "SQLite", value: "sqlite" },
        { title: "Cancel", value: null },
      ],
    });

    if (response == null) {
      console.log("❌   No database selected. Exiting.");
      process.exit(1);
    }

    selectedDatabase = response.database as Database;
  }

  await newGame(name, { database: selectedDatabase });
};

if (typeof command !== "string" || command.trim() === "") {
  console.error("❌   No command provided. Example: airaga new <project-name>");
  process.exit(1);
}

if (command !== "generate" && command !== "new") {
  console.error(`❌   Unknown command: ${command}. Supported: new, generate.`);
  process.exit(1);
}

await createNewProject();