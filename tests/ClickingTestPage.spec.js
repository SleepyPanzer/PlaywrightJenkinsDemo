import { test, expect } from '@playwright/test';

test('Click Test Cases link and verify page', async ({ page }) => {
  // Go to home page
  await page.goto('https://www.automationexercise.com/');

  await page.waitForSelector('a[href="/test_cases"]', { timeout: 10000 });

  await page.click('a[href="/test_cases"]');

  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/Test Cases/i)).toBeVisible({ timeout: 10000 });

  await expect(page).toHaveURL(/test_cases/i);
});
