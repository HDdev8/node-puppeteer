const fs = require("node:fs").promises;
const os = require("node:os");
const path = require("node:path");

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

module.exports = async function () {
  await globalThis.__BROWSER_GLOBAL__.close();

  await fs.rm(DIR, {recursive: true, force: true});
};
