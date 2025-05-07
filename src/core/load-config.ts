import type { Config } from "airaga";
import { existsSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { register } from "ts-node";

export const loadConfig = async (): Promise<Config> => {
  const configPath = join(cwd(), "airaga.config.ts");
  if (!existsSync(configPath))
    throw new Error("❌ airaga.config.ts file is missing.");

  if (!(typeof Bun !== "undefined")) {
    register({
      transpileOnly: true,
      compilerOptions: {
        module: "ESNext",
      },
    });
  }

  const { config } = (await import(configPath)) as { config: Config };
  return config;
};