import { test, expect } from '@playwright/test';

test('Click Test Cases link and verify page', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');

  await page.getByRole('link', { name: /Test Cases/i }).click();

  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/Test Cases/i)).toBeVisible({ timeout: 10000 });

  await expect(page).toHaveURL(/test_cases/i);
});
