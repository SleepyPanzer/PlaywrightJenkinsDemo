import { test, expect } from '@playwright/test';

test('Click Test Cases link and verify page', async ({ page }) => {
  // Go to home page with reduced timeout
  await page.goto('https://www.automationexercise.com/', { timeout: 15000, waitUntil: 'domcontentloaded' });

  // Click "Test Cases" link and wait for navigation
  await Promise.all([
    page.waitForURL(/test_cases/, { timeout: 10000 }),
    page.getByRole('link', { name: 'Test Cases', exact: true }).click()
  ]);

  // Verify page heading
  await expect(page.locator('h2:has-text("Test Cases")')).toBeVisible();

  // Verify URL
  await expect(page).toHaveURL(/test_cases/);
});
