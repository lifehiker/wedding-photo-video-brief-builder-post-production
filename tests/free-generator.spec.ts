import { expect, test } from "@playwright/test";

test("free generator creates a wedding film brief", async ({ page }) => {
  const baseUrl = process.env.BW_BASE_URL ?? "http://localhost:3000";

  await page.goto(`${baseUrl}/free-brief-generator`);

  await page.getByRole("button", { name: /Full Wedding Film/i }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel(/Couple names/i).fill("Avery & Jordan");
  await page.getByLabel(/Wedding date/i).fill("2026-09-12");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel(/Target Length/i).click();
  await page.getByRole("option", { name: /20.*30 min/ }).click();
  await page.getByLabel(/Must-Have Moments/i).fill("First look\nCeremony kiss\nFirst dance");
  await page
    .getByLabel(/Music Direction/i)
    .fill("Romantic acoustic track with a clean build.");
  await page.getByLabel(/Pacing & Emotional Tone/i).click();
  await page.getByRole("option", { name: "Moderate & emotional" }).click();

  await page.getByRole("button", { name: /Generate Brief/i }).click();

  await expect(page.getByRole("heading", { name: "Your brief" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Avery & Jordan.*Full Wedding Film/ })
  ).toBeVisible();
  await expect(page.getByText("First look")).toBeVisible();
});
