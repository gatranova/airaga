/* eslint-disable no-undef */

import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { rmSync } from "fs";
import { join } from "path";
import { newGame } from "@/commands/new.js";

describe("New Command", () => {
  it("Should create a new game project.", async (): Promise<void> => {
    const name = faker.food.dish().toLowerCase().replace(/ /g, "-");
    await expect(newGame(name)).resolves.not.toThrow();
    rmSync(join(process.cwd(), name), { recursive: true, force: true });
  });
});