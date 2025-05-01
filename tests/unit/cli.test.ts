import { describe, expect, it } from "vitest";
import { generateIFID } from "@/commands/new.js";

describe("Command Line Interface", () => {
  it("Should generates a valid UUID v4 during the first game setup.", () => {
    expect(generateIFID()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});