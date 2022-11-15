import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: true,
  target: "es2020",
  outDir: "./dist",
  onSuccess: isDev ? "node ./dist/index.js" : undefined,
});
