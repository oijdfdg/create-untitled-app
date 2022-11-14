#!/usr/bin/env node

import { runCli } from "./cli";
import { logger } from "./helpers/logger";

runCli().catch((err) => {
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error("------Unknown error------");
    logger.error(err);
    logger.error("-------------------------");
  }

  process.exit(1);
});
