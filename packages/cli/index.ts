#!/usr/bin/env node

export * from "@cli-core/cli";
export type { Config } from "@cli-interfaces/config";

import { Cli } from "@cli-core/cli";

const cli = new Cli();
cli.init();