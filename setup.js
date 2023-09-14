const {mkdir, writeFile} = require("node:fs").promises;
const os = require("node:os");
const path = require("node:path");
const puppeteer = require("puppeteer");
const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

module.exports = async () => {
  const browser = await puppeteer.launch();
  globalThis.__BROWSER_GLOBAL__ = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  await mkdir(DIR, {recursive: true});
  await writeFile(path.join(DIR, "wsEndpoint"), browser.wsEndpoint());
};
