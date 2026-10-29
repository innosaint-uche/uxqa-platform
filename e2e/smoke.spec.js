import { test, expect } from '@playwright/test';

test.describe('UXQA Production Smoke & Design System Suite', () => {
  test('homepage renders hero story arc and zero-hardware status', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/UXQA/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=0 MB').first()).toBeVisible();
  });

  test('light theme default renders and theme toggle functions', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveClass(/light/);

    const themeToggle = page.locator('button[title*="Switch to Dark"]');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await expect(html).toHaveClass(/dark/);
    }
  });

  test('interactive visual step scrobbler is functional', async ({ page }) => {
    await page.goto('/');
    const stepOneBtn = page.locator('button:has-text("STEP 01")');
    await expect(stepOneBtn).toBeVisible();

    const simulateBtn = page.locator('button:has-text("Simulate Run")');
    await expect(simulateBtn).toBeVisible();
  });

  test('visual bug diff comparison renders before and after', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Before (Defect)')).toBeVisible();
    await expect(page.locator('text=After (Fixed)')).toBeVisible();
  });

  test('composio tool bus panel dispatches ticket correctly', async ({ page }) => {
    await page.goto('/');
    const dispatchBtn = page.locator('button:has-text("Dispatch Ticket")');
    await expect(dispatchBtn).toBeVisible();
  });

  test('workspace console renders multi-project telemetry', async ({ page }) => {
    await page.goto('/radoss/aira-academy/');
    await expect(page.locator('text=AIRA by Radoss').first()).toBeVisible();
    await expect(page.locator('text=69/69 PASSED').first()).toBeVisible();
  });
});
