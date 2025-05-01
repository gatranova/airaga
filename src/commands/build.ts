/* eslint-disable no-undef */

/**
 * @module build
 * 
 * @description
 * This module provides functions for building an Airaga game project.
 * It compiles the TypeScript code into JavaScript and creates a production-ready build.
 * 
 */

import { parseArgFile } from "@/core/parser.js";
import { readFileSync } from "fs";
import { join } from "path";

const filePath = join(process.cwd(), "src", "scene", "start.arg");
const parsed = parseArgFile(readFileSync(filePath, "utf-8"));

console.log(parsed); // Temporary to check if parsing works.