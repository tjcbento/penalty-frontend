// copy-env.js
import { copyFileSync } from "fs";
import { resolve } from "path";

const envSource = resolve("config/.env");
const envDest = resolve(".env");

try {
  copyFileSync(envSource, envDest);
  console.log(`Copied ${envSource} to ${envDest}`);
} catch (error) {
  console.error("Error copying env file:", error);
  process.exit(1);
}
