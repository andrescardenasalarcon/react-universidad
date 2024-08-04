import { test, expect } from '@playwright/test';
const CAT_PREFIXTER_IMAGE_URL = `https://cataas.com/cat/`;
const LOCALHOST_URL = 'http://localhost:5173/'

// Cambiar la extension del archivo playwriht.config.ts a --A .cts
// $npx playwright test
test('end-to-end app show random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole('paragraph');
  const image = await page.getByRole('img')

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute('src');

  console.log({ textContent, imageSrc });
  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(CAT_PREFIXTER_IMAGE_URL)).toBeTruthy();

});

