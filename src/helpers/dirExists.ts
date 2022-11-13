import { existsSync } from "fs";

export const dirExists = (dir: string): boolean => {
  return existsSync(dir);
};
