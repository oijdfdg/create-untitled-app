import { program } from "commander";
import { cwd, exit } from "process";
import { sep } from "path";
import { dirExists } from "./helpers/dirExists";
import { logger } from "./helpers/logger";
import { PKG_ROOT } from "./consts";

export const runCli = async () => {
  program
    .name("create-untitled-app")
    .description("Create an app with the untitled template.")
    .argument("[project_name]", "project name")
    .action(action);

  program.parse();
};

const action = async (projectName: string | undefined, options: any) => {
  // set the name to "my-app" if none provided
  projectName = projectName ?? "my-app";

  const directory = cwd();
  const newDir = directory + sep + projectName;

  if (dirExists(newDir)) {
    logger.error(`The directory ${projectName} already exists!`);
    exit(1);
  }

  console.log(PKG_ROOT);
};
