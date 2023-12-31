const {readFile} = require("node:fs").promises;
const os = require("node:os");
const path = require("node:path");
const puppeteer = require("puppeteer-extra");
const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({blockTrackers: true}));

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();

    const wsEndpoint = await readFile(path.join(DIR, "wsEndpoint"), "utf8");
    if (!wsEndpoint) {
      throw new Error("wsEndpoint not found");
    }

    this.global.__BROWSER_GLOBAL__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    if (this.global.__BROWSER_GLOBAL__) {
      this.global.__BROWSER_GLOBAL__.disconnect();
    }
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = PuppeteerEnvironment;
