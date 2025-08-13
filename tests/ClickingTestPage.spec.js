import { test, expect } from '@playwright/test';

test('Clicking the TestPage',async({page})=>{
    await page.goto('https://www.automationexercise.com/');
    await page.getByRole('link', { name: ' Test Cases' }).click();
    await expect(page.getByText('Test Cases Test case management software Below is the list of test Cases for')).toBeVisible();


});