# Pravidla pro práci na krvinka.cz

## Blog — pořadí článků (DŮLEŽITÉ)

**Nové příspěvky se vždy vkládají jako PRVNÍ** ve všech relevantních listingových stránkách.

Při přidávání nového článku, pohádky nebo kalkulačky je povinné vložit kartu na začátek seznamu v:
- `blog.html` (kromě pohádek) — první karta hned za `<ul class="nav nav-tabs krvinka-category-nav">`
- příslušné kategoriové stránce (`blog-kalkulacky.html`, `blog-lab.html`, `blog-hry.html`) — první karta hned za navigací
- **pohádky** mají od 22. 11. 2026 samostatnou stránku `pohadky.html` (v menu „Pohádky“, `blog-pohadky.html` přesměrováno 301). Novou pohádku dávej jen do `pohadky.html` jako první kartu, do `blog.html` ne. Drobečková navigace pohádky: Pohádky > název.

Nikdy nepřidávej nový obsah na konec seznamu.

**Výjimka:** pokud uživatelka u konkrétního článku řekne, že ho chce zařadit níž, vlož kartu tam, kam určí (např. článek Gamebook pro děti je v `blog.html` na 5. místě). Když pozici neupřesní, navrhni ji a zeptej se.

## Deployment

Web je hostován na Vercel, repozitář: `kubicekter-dotcom/krvinkaLP` (branch `main`).  
Po úpravách commitni a pushni na `main` — Vercel nasadí automaticky.

## Tracking — všechny stránky musí mít

- `assets/js/cookie-consent.js` (v `<head>`)
- Google Analytics `G-R512VVXLSY` (gtag.js v `<head>`)
- Meta Pixel `2142732609873674` (fbq v `<head>`)

## SEO — každá nová stránka musí mít

- `<title>` — unikátní, popisný, česky
- `<meta name="description">` — unikátní popis
- `<link rel="canonical">` — absolutní URL
- `<meta property="og:image">` — obrázek pro sociální sítě
- `<html lang="cs">` — jazykový atribut
- `<h1>` — shodný s title tagem

## Zálohy

`index.backup.20260316.html` = záloha homepage z 16. 3. 2026, před úpravou produktů.
