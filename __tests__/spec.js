const timeout = 5000;

describe("My Test Suite", () => {
  it("My Test Case", () => {
    expect(true).toEqual(true);
  });
});

describe(
  "/ (Home Page)",
  () => {
    let page;
    beforeAll(async () => {
      page = await globalThis.__BROWSER_GLOBAL__.newPage();
      await page.goto("https://google.com");
    }, timeout);

    it("should load without error", async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain("google");
    });
  },
  timeout
);
