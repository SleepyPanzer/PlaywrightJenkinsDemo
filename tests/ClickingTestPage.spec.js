import { test, expect } from '@playwright/test';

test('Click Test Cases link and verify page', async ({ page }) => {
  // Go to home page
  await page.goto('https://www.automationexercise.com/');

  // Click "Test Cases" link
await page.getByRole('link', { name: ' Test Cases' }).click();
  // Wait for navigation to finish
  await page.waitForLoadState('networkidle');

  // Verify page heading
  await expect(page.locator('h2:has-text("Test Cases")')).toBeVisible();

  // Verify URL
  await expect(page).toHaveURL(/test_cases/);
});
