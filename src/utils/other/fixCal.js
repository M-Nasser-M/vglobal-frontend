// fix-type.ts
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const absolutePath = path.resolve(
  __dirname,
  "../../../node_modules/@calcom/embed-react/package.json"
);

function fixType() {
  const packageJsonRaw = fs.readFileSync(absolutePath, "utf8");
  const packageJson = JSON.parse(packageJsonRaw);

  packageJson.exports["."].types = "./dist/embed-react/src/index.d.ts";

  fs.writeFileSync(absolutePath, JSON.stringify(packageJson, null, 2));
}

fixType();
