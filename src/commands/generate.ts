/* eslint-disable no-undef */

/**
 * @module commands/generate
 * @returns {string}
 * 
 * @description
 * This module provides functions for creating a new Airaga game project.
 * It generates an IFID to use as a unique identifier for the game project.
 * 
 * @method generateUUIDv4
 * @method generateIFID
 */

import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const generateUUIDv4 = (): string => {
  return uuidv4();
};

export const generateIFID = (): string => {
  // Declare a variable to find the config file.
  const file = fs.readFileSync("./airaga.config.ts", "utf-8");
  const uuid = generateUUIDv4();
  const config = file.replace(/ifid:\s*null/g, `ifid: "${uuid}"`);

  // Overwrite the config file.
  fs.writeFileSync("./airaga.config.ts", config, "utf-8");
  console.log(`✅  IFID generated: ${uuid}`);
  return uuid;
};