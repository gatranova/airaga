import { Console } from "node:console";
import { argv, stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { BaseCommands, Prompts } from "@interfaces/prompts";
import { New } from "./new";

export class Cli {
  private args = argv.slice(2);
  private commands = this.args[0];
  private gameName = this.args[1];

  private console: Console;
  private process: NodeJS.Process;
  private baseCommands: BaseCommands;
  private newProject: New;

  constructor() {
    this.console = new Console(output);
    this.process = process;
    this.baseCommands = "new";
    this.newProject = new New();
  }

  public async init(): Promise<void> {
    if (typeof this.commands !== "string" || this.commands.trim() === "") {
      this.console.error("❌ No command provided. Example: airaga new <project-name>");
      this.process.exit(1);
    }

    if (this.commands !== this.baseCommands) {
      this.console.error(`❌ Unknown command ${this.commands}. Supported commands are build, dev, generate, and new.`);
      this.process.exit(1);
    }

    if (this.baseCommands === "new") {
      await this.createNewProject();
    }
  }

  private async createNewProject(): Promise<void> {
    this.console.log("🌟 Welcome to Airaga! Let's create your text-based game.");

    const name = (this.gameName ?? "") || (await this.askQuestion("📝 What is the name of your game?"));

    if (!name) {
      this.console.error("❌ Game name is required.");
      this.process.exit(1);
    }

    await this.newProject.new(name);
  }

  private async askQuestion(question: string): Promise<string> {
    const rl = createInterface({ input, output });
    const answer = (await rl.question(question)).toLowerCase().replace(/ /g, "-");
    rl.close();
    return answer.trim();
  }
}