import { cpSync } from "node:fs";
import { resolve } from "node:path";

cpSync(resolve("assets"), resolve("dist/assets"), { recursive: true });
console.log("📦 Copied assets to dist/assets.");