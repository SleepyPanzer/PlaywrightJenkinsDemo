import { test, expect } from '@playwright/test';

test('Validate Youtube Title',async({page})=>{
await page.goto('https://www.youtube.com/')
await page.getByPlaceholder('Search').click();
await page.getByPlaceholder('Search').fill(' Playwright Tutorial Full Course 2024');

await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeEnabled();
await page.getByRole('button', { name: 'Search', exact: true }).click();

await page.getByRole('link', { name: '#1 Playwright Tutorial Full Course 2024 | Playwright Testing Tutorial 6 hours,' }).click();

await expect(page).toHaveTitle('#1 Playwright Tutorial Full Course 2024 | Playwright Testing Tutorial - YouTube');

});