import { Given, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { expect } from 'chai';

let browser;
let page;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

After(async function () {
  if (page) await page.close();
  if (browser) await browser.close();
});

Given('I open Google', async function () {
  await page.goto('https://www.google.com');
});

Then('I should see the page title contains {string}', async function (text) {
  const title = await page.title();
  expect(title).to.include(text);
});
