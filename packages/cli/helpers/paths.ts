import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const cliRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../");
export const assetsFolder = resolve(cliRoot, "assets");