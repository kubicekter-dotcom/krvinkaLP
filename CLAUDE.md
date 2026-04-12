# Pravidla pro práci na krvinka.cz

## Blog — pořadí článků (DŮLEŽITÉ)

**Nové příspěvky se vždy vkládají jako PRVNÍ** ve všech relevantních listingových stránkách.

Při přidávání nového článku, pohádky nebo kalkulačky je povinné vložit kartu na začátek seznamu v:
- `blog.html` — první karta hned za `<ul class="nav nav-tabs krvinka-category-nav">`
- příslušné kategoriové stránce (`blog-pohadky.html`, `blog-kalkulacky.html`, `blog-lab.html`) — první karta hned za navigací

Nikdy nepřidávej nový obsah na konec seznamu.

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
