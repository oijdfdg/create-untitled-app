import fs from "fs-extra";

export const copyTo = (from: string, to: string) => fs.copySync(from, to);
