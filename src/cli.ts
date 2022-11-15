import { program } from "commander";
import { cwd, exit } from "process";
import { dirExists } from "./helpers/dirExists";
import { logger } from "./helpers/logger";
import { PKG_ROOT } from "./consts";
import { copyTo } from "./helpers/copyTo";
import type { PackageJson } from "type-fest";
import fs from "fs-extra";
import path from "path";
import { getVersion } from "./helpers/getVersion";
import { promptName } from "./prompts";

interface ProjectOptions {
  name: string;
  projectDir: string;
}

type CUAPackageJSON = PackageJson & {
  cuaMetadata?: {
    initVersion: string;
  };
};

export const runCli = async () => {
  program
    .name("create-untitled-app")
    .description("Create an app with the untitled template.")
    .argument("[project_name]", "project name")
    .action(action);

  program.parse();
};

const action = async (projectName: string | undefined, options: any) => {
  // Ask for the project name if not supplied.
  projectName = projectName ?? (await promptName());

  const directory = cwd();
  const templateDir = path.join(PKG_ROOT, "template");

  const projectOptions: ProjectOptions = {
    name: projectName,
    projectDir: path.join(directory, projectName),
  };

  const { projectDir } = projectOptions;

  if (dirExists(projectDir)) {
    logger.error(`The directory ${projectName} already exists!`);
    exit(1);
  }

  // Copies the template
  copyTo(templateDir, projectDir);
  afterProject(projectOptions);
};

// Applies changes to the package.json file
const afterProject = (projectOptions: ProjectOptions) => {
  const { projectDir } = projectOptions;

  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as CUAPackageJSON;

  pkgJson.name = projectOptions.name;
  pkgJson.cuaMetadata = {
    initVersion: getVersion(),
  };

  fs.writeJsonSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  printSuccess(projectOptions);
};

const printSuccess = (projectOptions: ProjectOptions) => {
  logger.success(
    `Success! Created project ${projectOptions.name} at ${projectOptions.projectDir}\n`
  );

  logger.info("Next steps:");
  logger.info(` * cd ${projectOptions.name}`);
  logger.info(" * npm install (or whichever package manager you use)");
  logger.info(
    ' * git init && git add -A && git commit -m "Initial commit" (optional)'
  );
  logger.info(" * npm run dev -- --open\n\n");

  logger.info(
    " And.. that's it! If you have any questions, feel free to submit a GitHub issue."
  );
};
