/**
 * @module commands/generate
 * @returns {string} The new IFID.
 *
 * @description
 * This module provides functions for creating a new Airaga game project.
 * It generates an IFID to use as a unique identifier for the game project.
 *
 * @method generateUUIDv4
 * @method generateIFID
 */

import { log } from "console";
import { v4 as uuidv4 } from "uuid";
import { readFileSync, writeFileSync } from "fs";

export const generateUUIDv4 = (): string => {
  return uuidv4();
};

export const generateIFID = (): string => {
  const file = readFileSync("./airaga.config.ts", "utf-8");
  const uuid = generateUUIDv4();
  const config = file.replace(/ifid:\s*null/g, `ifid: "${uuid}"`);

  writeFileSync("./airaga.config.ts", config, "utf-8");
  log(`✅  IFID generated: ${uuid}`);
  return uuid;
};