import { describe, expect, it } from "vitest";
import { getFontsFromGoogle } from "@/core/fonts.js";

describe("Fonts", () => {
  it("Should get fonts from Google.", async (): Promise<void> => {
    expect(await getFontsFromGoogle("Plus Jakarta Sans", { weight: ["400", "500"] })).toBeDefined();
  });
});