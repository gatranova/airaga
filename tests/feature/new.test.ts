import { faker } from "@faker-js/faker";
import { error } from "console";
import { rmSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { setTimeout } from "timers";
import { describe, expect, it } from "vitest";
import { newGame } from "@/commands/new.js";

describe("New Command", () => {
  it("Should create a new game project.", async (): Promise<void> => {
    const name = faker.food.dish().toLowerCase().replace(/ /g, "-");
    await expect(newGame(name)).resolves.not.toThrow();
    await new Promise((resolve) => setTimeout(resolve, 100)).catch((err: Error) => error(err));
    rmSync(join(cwd(), name), { recursive: true, force: true });
  });
});