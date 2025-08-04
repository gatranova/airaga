import { faker } from "@faker-js/faker";
import { existsSync, readdirSync, rmSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { setTimeout } from "timers";
import { describe, expect, it, vi } from "vitest";
import { New } from "@cli-core/new";
import { Test } from "@cli-helpers/test";

/**
 * 🧪 Mocking `process.exit` to prevent the test runner from terminating.
 * Instead of exiting, we log a warning when it's called.
 */
vi.spyOn(process, "exit").mockImplementation(((code: number) => {
  console.warn(`⚠️ Mocked process.exit(${code}) called`);
}) as never);

describe("Commands", () => {
  /**
   * 🔧 Test Case: Should create a new game project.
   *
   * This test:
   * 1. Generates a random project name.
   * 2. Calls the `New` command with that name.
   * 3. Verifies that the project directory and key files are created.
   * 4. Logs the result and cleans up by deleting the created directory.
   */
  it("Should create a new game project.", async (): Promise<void> => {
    const name = faker.food.dish().toLowerCase().replace(/ /g, "-");
    const projectPath = join(cwd(), name);

    // Attempt to create a new project
    await expect(Object.assign(new New(), await Test(name)).new(name)).resolves.not.toThrow();

    // ✅ Check if project path was created
    if (!existsSync(projectPath)) {
      console.error("❌ Project path was not created.");
    } else {
      console.log("✅ Project path exists.");
      console.log("Files:", readdirSync(projectPath));
    }

    // ✅ Validate essential files
    expect(existsSync(projectPath)).toBe(true);
    expect(existsSync(join(projectPath, "package.json"))).toBe(true);

    // Optional delay to wait for any async file writes
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 🧹 Cleanup: Remove generated project
    rmSync(projectPath, { recursive: true, force: true });
  });
});