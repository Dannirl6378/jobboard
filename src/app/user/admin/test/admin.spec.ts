import { test, expect } from "@playwright/test";

test.describe("Admin rozhraní", () => {
	test("Načtení admin stránky a základní UI", async ({ page }) => {
		await page.goto("http://localhost:3000/user/admin");
		await expect(page.getByText("Admin Page")).toBeVisible();
		await expect(
			page.getByText("Welcome to the Admin Dashboard")
		).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Vytvoř Uživatele" })
		).toBeVisible();
	});

	test("Otevření a zavření dialogu pro vytvoření uživatele", async ({
		page,
	}) => {
		await page.goto("http://localhost:3000/user/admin");
		await page.getByRole("button", { name: "Vytvoř Uživatele" }).click();
		await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
		await page.getByRole("button", { name: "Close" }).click();
		await expect(
			page.getByRole("button", { name: "Vytvoř Uživatele" })
		).toBeVisible();
	});

	test("Vyhledání uživatele podle emailu", async ({ page }) => {
		await page.goto("http://localhost:3000/user/admin");
		await page.getByTestId("email-input").fill("firma@example.com");
		await page.getByRole("button", { name: "Najdi uživatele" }).click();
		// Ověř, že se zobrazí detail uživatele
		await expect(page.getByText("ID:")).toBeVisible();
		await expect(page.getByText("Email:")).toBeVisible();
	});

	test("Zobrazení panelu pro správu jobů firmy", async ({ page }) => {
		// Předpokládá, že testovací uživatel s rolí COMPANY existuje a je vyhledán
		await page.goto("http://localhost:3000/user/admin");
		await page.getByTestId("email-input").fill("firma@example.com");
		await page.getByRole("button", { name: "Najdi uživatele" }).click();
		await expect(page.getByText("Jobs")).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Vybrat vše" })
		).toBeVisible();
	});
});
