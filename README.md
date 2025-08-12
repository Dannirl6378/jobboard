# JobBoard

**JobBoard** je moderní pracovní portál vytvořený jako webová aplikace s administrativním rozhraním, který umožňuje správu pracovních nabídek, uživatelů a firem.  

---

## Popis projektu

JobBoard nabízí:

- **Pro nepřihlášené uživatele:**
  - Prohlížení seznamu pracovních nabídek.
  - Zobrazení detailu konkrétní pracovní pozice.
  - Možnost reagovat na pracovní nabídku bez registrace (reakce jsou uloženy jako dočasní uživatelé v databázi).

- **Pro přihlášené uživatele:**
  - Vlastní uživatelský profil.
  - Přehled pracovních nabídek, na které uživatel reagoval.
  - Možnost spravovat své reakce.

- **Pro firmy:**
  - Správa vlastních pracovních nabídek (vytváření, editace, mazání).
  - Přístup k profilům uživatelů, kteří reagovali na jejich nabídky.
  - Úprava vlastních firemních informací.

- **Pro administrátora:**
  - Kompletní správa všech uživatelů, firem a pracovních nabídek.
  - Možnost vytvářet, upravovat a mazat uživatele a nabídky.
  - Přístup k detailním informacím o uživatelích i firmách.
  - Správa dočasných uživatelů (uživatelé bez registrace).

- **Pro Master Admina:**
  - Má všechna práva jako admin.
  - Navíc může mazat veškerá data označená jako demo.
  - Demo data jsou automaticky ukládána do databáze a nemohou být změněna jinak než přímo v databázi.

---

## Použité technologie

- **Next.js** – React framework pro server-side rendering a routing.
- **React** – Knihovna pro tvorbu uživatelského rozhraní.
- **TypeScript** – Staticky typovaný nadmnožina JavaScriptu pro lepší bezpečnost kódu.
- **Zustand** – Stavový management pro React.
- **Prisma Client** – ORM pro práci s databází.
- **MUI (Material-UI)** – Komponentová knihovna pro rychlé a konzistentní UI.
- **PostgreSQL** – Relační databáze pro ukládání dat.

---

## Funkce

- Uživatelská autentizace a role-based přístup.
- Správa pracovních nabídek a jejich detailů.
- Ukládání reakcí uživatelů na nabídky práce.
- Administrace uživatelů (včetně dočasných).
- Firemní profily a správa jejich nabídek.
- Master admin pro správu demo dat.

---

## Struktura projektu

- `/pages` – Stránky aplikace (Next.js routing).
- `/components` – UI komponenty a panely.
- `/store` – Zustand store pro správu stavu.
- `/prisma` – Prisma schema a migrace.
- `/api` – API routes Next.js pro backend logiku.

---

## Instalace a spuštění

1. Naklonujte repozitář:

```bash
git clone https://github.com/username/jobboard.git
cd jobboard

