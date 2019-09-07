import { join, resolve } from "path";
const rootDir = resolve(__dirname, "..");

import { config } from "dotenv";
config({ path: join(rootDir, ".env") });
