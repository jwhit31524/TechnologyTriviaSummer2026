// @ts-check
import { test, expect } from '@playwright/test';

test('clicking Begin Game shows the first question', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Begin Game').click();

  await expect(page.getByText('Question 1')).toBeVisible();
});

test('failingtest1', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Begin Game').click();

  await expect(page.getByText('Congrats on starting the game!')).toBeVisible();
});
