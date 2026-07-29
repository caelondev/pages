#!/usr/bin/env node

import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const JSON_FILENAME = "index.json";
const _88x31_PATH = "./public/88x31/";

let _88x31Files = readdirSync(_88x31_PATH).filter((p) => {
  let filename = p.replace(/\\/g, "/").split("/")[0];
  return filename != JSON_FILENAME;
});

writeFileSync(
  path.resolve(_88x31_PATH, JSON_FILENAME),
  JSON.stringify(_88x31Files, null, 2),
  "utf-8",
);
console.log("✓ generated index.json for 88x31 wall");
