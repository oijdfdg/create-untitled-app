import { PKG_ROOT } from "../consts";
import fs from "fs-extra";
import path from "path";
import type { PackageJson } from "type-fest";

export const getVersion = () => {
  let pkgJsonPath = path.join(PKG_ROOT, "package.json");
  let pkgJson: PackageJson = fs.readJsonSync(pkgJsonPath);

  return pkgJson.version ?? "1.0.0";
};
