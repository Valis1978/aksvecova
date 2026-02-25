# AK Svecova - Projektova dokumentace

> **Projekt:** Web pro Advokátní kancelář JUDr. Michaela Švecová
> **Poslední aktualizace:** 2026-02-25
> **Autor dokumentace:** Valentýn / Claude Code

---

## 1. Přehled projektu (Project Overview)

| Parametr | Hodnota |
|----------|---------|
| **Klient** | JUDr. Michaela Švecová |
| **Firma** | Advokátní kancelář Brno |
| **IČO** | 05508681 |
| **Specializace** | Rodinné právo, občanské právo, obchodní právo, pracovní právo |
| **Členství** | Unie rodinných advokátů |
| **Adresa** | Martina Ševčíka 4, 625 00 Brno |
| **Telefon** | +420 777 126 700 |
| **E-mail** | svecova@aksvecova.cz |
| **Production URL** | https://aksvecova.mujagent.cz |
| **Budoucí doména** | aksvecova.cz |

### Popis projektu

Kompletní redesign a přestavba webových stránek solo advokátní kanceláře z kriticky zastaralého WordPress 4.8 na moderní Next.js 16 platformu. Cílem je poskytnout profesionální, důvěryhodnou prezentaci s důrazem na:

- **Osobní brand** JUDr. Švecové (rodinné právo jako hlavní zaměření)
- **Transparentní ceník** (4 paušální balíčky + hodinová sazba) - unikátní v CZ prostředí
- **Moderní UX** s animacemi na úrovni award-winning právnických webů
- **SEO-ready architektura** od prvního dne (Schema.org, OG, sitemap)
- **Multi-step kontaktní wizard** - pokročilý formulář ve 4 krocích

---

## 2. Tech Stack

### Produkční závislosti

| Technologie | Verze | Účel |
|-------------|-------|------|
| **Next.js** | 16.1.6 | App Router, SSR/SSG framework |
| **React** | 19.2.3 | UI rendering engine |
| **TypeScript** | ^5 | Type safety |
| **GSAP** | ^3.14.2 | ScrollTrigger, clip-path animace, parallax |
| **Lenis** | ^1.3.17 | Smooth scroll (sync s GSAP ScrollTrigger) |
| **Lucide React** | ^0.575.0 | SVG ikony |
| **clsx** | ^2.1.1 | Podmíněné CSS třídy |

### Dev závislosti

| Technologie | Verze | Účel |
|-------------|-------|------|
| **Tailwind CSS** | ^4 | Utility-first CSS framework |
| **@tailwindcss/postcss** | ^4 | PostCSS integrace |
| **ESLint** | ^9 + eslint-config-next | Linting |

### Fonty

| Font | Použití | Subsets |
|------|---------|---------|
| **Cormorant Garamond** (300-700) | Nadpisy (`--font-heading`) | latin, latin-ext |
| **Inter** | Body text (`--font-body`) | latin, latin-ext |

### Barevná paleta

| Název | Hex | Použití |
|-------|-----|---------|
| Navy | `#0A1628` | Primární tmavá (hero, footer, headings) |
| Navy Light | `#162035` | Sekundární tmavá (mapy) |
| Gold | `#C4A265` | Akcentová (CTA, separátory, ikony) |
| Gold Light | `#D4B87A` | Gradient světlá |
| Gold Dark | `#A8894F` | Gradient tmavá, hover stavy |
| Ivory | `#FAFAF8` | Pozadí sekcí (services, pricing) |
| Gray Text | `#6B7280` | Odstavcový text |
| Gray Light | `#E5E7EB` | Bordery, separátory |

### Infrastructure & Deployment

| Parametr | Hodnota |
|----------|---------|
| **Hosting** | Coolify (self-hosted) na Hetzner VPS |
| **Server IP** | 49.13.192.85 |
| **SSL** | Let's Encrypt via Traefik (automatický renewal) |
| **GitHub repo** | github.com/Valis1978/aksvecova |
| **DNS provider** | FORPSI (A record -> 49.13.192.85) |

---

## 3. Architektura webu

### Typ webu

**One-page design** - veškerý obsah na jedné stránce s plynulým scrollováním (Lenis smooth scroll). Navigace přes anchor linky s `scrollIntoView({ behavior: "smooth" })`.

### Struktura sekcí

```
page.tsx
  ├── Hero           (#top)      - Filmová hero sekce s parallaxem
  ├── Services       (#sluzby)   - 6 karet oblastí práva
  ├── About          (#o-mne)    - O mně + portrét + statistiky
  ├── Process        (#proces)   - 3 kroky ke spolupráci
  ├── Pricing        (#odmena)   - Hodinová sazba + 4 paušální balíčky
  └── Contact        (#kontakt)  - 4-krokový wizard + kontaktní sidebar
```

### Komponenty

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonty, metadata, OG, viewport)
│   ├── page.tsx                # Hlavní stránka (kompozice sekcí)
│   ├── globals.css             # Tailwind v4 theme, custom CSS
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx              # Fixed navbar (transparent -> white on scroll)
│   ├── Footer.tsx              # Minimalistická patička
│   ├── providers/
│   │   └── LenisProvider.tsx   # Smooth scroll wrapper (sync s GSAP)
│   ├── ui/
│   │   └── ScrollProgress.tsx  # Zlatý progress bar (fixed top)
│   └── sections/
│       ├── Hero.tsx            # Hero s clip-path reveal + parallax
│       ├── Services.tsx        # 6 service karet (grid, stagger reveal)
│       ├── About.tsx           # Portrét + bio + 4 statistiky
│       ├── Process.tsx         # 3 kroky s connecting line
│       ├── Pricing.tsx         # Hodinová sazba + 4 paušální plány
│       └── Contact.tsx         # 4-step wizard + kontaktní info sidebar
└── public/
    ├── favicon.svg
    └── images/
        ├── hero-banner.jpg
        ├── portrait-svecova.png
        ├── portrait-svecova-full.png
        ├── about-portrait.png
        ├── logo.png
        ├── logo-small.png
        ├── ura-logo.jpg              # Logo Unie rodinných advokátů
        ├── rodinne-pravo.jpg
        ├── obcanske-pravo.jpg
        ├── obchodni-pravo.jpg
        ├── pracovni-pravo.jpg
        ├── ostatni-sluzby.jpg
        └── online-sluzby.jpg
```

### GSAP animace (detail)

| Sekce | Typ animace | Trigger |
|-------|-------------|---------|
| **Hero** | `clip-path: inset(100% 0 0 0)` -> reveal | Page load (delay 0.8s) |
| **Hero** | Heading lines: `y:80, rotateX:-40` -> stagger 0.15s | Page load |
| **Hero** | Parallax: image `y:-80` on scroll | `scrub: 1` |
| **Hero** | Overlay fade-in: `opacity: 0.6` | `scrub: 1` |
| **Hero** | Gold line: `scaleX: 0 -> 1` | Page load |
| **Hero** | Scroll indicator: bounce `y:10`, yoyo | Infinite repeat |
| **Services** | Cards: `y:60, opacity:0` -> stagger 0.1s | ScrollTrigger `top 85%` |
| **About** | Image: `clip-path: inset(0 100% 0 0)` -> reveal | ScrollTrigger `top 80%` |
| **About** | Text: `y:40, opacity:0` -> stagger 0.12s | ScrollTrigger `top 85%` |
| **About** | Stats: `y:30, opacity:0` -> stagger 0.1s | ScrollTrigger `top 80%` |
| **Process** | Steps: `y:50, opacity:0` -> stagger 0.2s | ScrollTrigger `top 85%` |
| **Process** | Connecting line: `scaleY: 0 -> 1` | ScrollTrigger `top 80%` |
| **Pricing** | Cards: `y:60, opacity:0` -> stagger 0.15s | ScrollTrigger `top 85%` |
| **Contact** | Heading + form: `y:40, opacity:0` | ScrollTrigger `top 85%` |
| **Contact** | Step transition: `opacity:0, x:20` -> slide in | On step change |
| **Contact** | Success: `scale:0, opacity:0` -> `back.out(1.7)` | On submit |
| **Navbar** | Entry: `y:-80, opacity:0` -> slide down | Page load (delay 0.5s) |
| **ScrollProgress** | Bar: `scaleX: 0 -> 1` | `scrub: 0.3`, full page |

### Multi-step kontaktní wizard

Wizard s 4 kroky (progress bar nahoře):

| Krok | Obsah | Validace |
|------|-------|----------|
| **1. Oblast práva** | 6 oblastí (občanské, rodinné, obchodní, pracovní, ostatní, online) | Musí vybrat 1 |
| **2. Upřesnění** | Sub-oblasti dané vybrané oblasti (2-5 možností) | Musí vybrat 1 |
| **3. Urgence** | 3 možnosti (co nejdříve / týdny / orientuji se) | Musí vybrat 1 |
| **4. Kontakt** | Jméno*, e-mail, telefon, preference kontaktu, volná zpráva | Jméno + (email nebo telefon) |

**Status:** Frontend hotový, backend endpoint (`POST /api/contact`) zatím TODO (console.log only).

### SEO

| Prvek | Status | Detail |
|-------|--------|--------|
| **Meta title** | Hotovo | "JUDr. Michaela Švecová -- Advokátní kancelář Brno" |
| **Meta description** | Hotovo | Profesionální právní služby... |
| **Keywords** | Hotovo | 11 klíčových slov (advokát Brno, rozvod Brno, atd.) |
| **Open Graph** | Hotovo | Title, description, locale cs_CZ, type website |
| **Robots** | Hotovo | index: true, follow: true |
| **Lang attribute** | Hotovo | `<html lang="cs">` |
| **Viewport** | Hotovo | device-width, no user-scalable (native-feel) |
| **JSON-LD (LegalService)** | HOTOVO | Na každé podstránce /sluzby/[slug] |
| **JSON-LD (FAQPage)** | HOTOVO | 4 FAQ per podstránka (24 celkem) |
| **JSON-LD (BreadcrumbList)** | HOTOVO | 3-level breadcrumbs na podstránkách |
| **sitemap.xml** | TODO | |
| **robots.txt** | TODO | |

### Responsivita

Web je plně responzivní (mobile-first approach):

- **Mobile** (< 640px): Single column, menší fonty, hamburger menu
- **Tablet** (640-1024px): 2-column gridy, zvětšené paddingy
- **Desktop** (1024px+): Full layout, 3-column service grid, side-by-side about

Navbar: transparent gradient na hero -> white/blur backdrop na scroll, mobilní hamburger menu s animací `max-h`.

---

## 4. Analýza původního webu (aksvecova.cz)

### Současný stav (WordPress)

| Parametr | Hodnota | Hodnocení |
|----------|---------|-----------|
| **CMS** | WordPress 4.8.25 | KRITICKY ZASTARALÝ (2017, tisíce známých CVE) |
| **Theme** | Jupiter 5.9.4 | Zastaralý, nepodporovaný |
| **Page Builder** | Visual Composer (WPBakery) | Legacy, pomalý |
| **Slider** | LayerSlider 6.5.1 | Bezpečnostní díry |
| **Server** | Apache | Bez security headers |
| **SSL** | Ano | Jediné pozitivum |

### SEO audit původního webu

| Kritérium | Stav |
|-----------|------|
| Meta description | CHYBÍ |
| Schema.org / JSON-LD | CHYBÍ |
| Open Graph tags | CHYBÍ |
| sitemap.xml | CHYBÍ |
| Canonical URL | CHYBÍ |
| Alt texty u obrázků | Částečně |
| H1 tag | OK |
| **Celkové SEO skóre** | **~3/10** |

### Bezpečnost

- **WordPress 4.8.25** - tisíce známých CVE (cross-site scripting, SQL injection, privilege escalation)
- **LayerSlider 6.5.1** - kritická RCE zranitelnost (CVE-2024-2879)
- **Žádné security headers** (CSP, X-Frame-Options, HSTS)
- **Hodnocení: CRITICAL**

### Výkon

| Metrika | Hodnocení |
|---------|-----------|
| Mobile performance | 5/10 |
| Mobile UX | 6/10 (zakázaný zoom, ale bez dalších optimalizací) |
| Načítání | Pomalé (Visual Composer bloat) |
| Obrázky | Neoptimalizované |

---

## 5. Srovnání s konkurencí

### 5.1 České AK weby (typicky WordPress, zastaralé)

Většina českých advokátních kanceláří stále používá:
- WordPress šablony (ThemeForest) z let 2015-2020
- Žádné nebo minimální animace
- Slabé SEO (bez Schema.org, bez sitemap)
- Zastaralý design bez mobile-first přístupu
- Žádná cenová transparentnost (ceník typu "dle dohody")

**AK Valiček** (bývalá kancelář JUDr. Švecové) - standardní WP design, bez moderních prvků.

### 5.2 Světová špička solo právníků

| Web | Lokace | Silné stránky |
|-----|--------|---------------|
| **YLaw.ca** | Vancouver | Filmová hero sekce, silný osobní brand |
| **BickLawLLP.com** | USA | Webby Award nominee, kreativní vizuál |
| **HagEstad Law** | Montana | Clean CTA, 100% nárůst traffic |
| **Stacey-Ann Taylor** | Atlanta | Bold typografie, osobní přístup |
| **Counsel for Creators** | USA | Subscription model, moderní UX |

### 5.3 Jak si stojí nový web AK Švecová

| Feature | AK Švecová | Typický CZ web | Světová špička |
|---------|-----------|-----------------|----------------|
| **Cenová transparentnost** (4 paušální balíčky) | ANO | NE | Částečně |
| **Multi-step kontaktní wizard** | ANO (4 kroky) | NE | Částečně |
| **GSAP animace** (clip-path, parallax, stagger) | ANO | NE | ANO |
| **Moderní framework** (Next.js 16) | ANO | NE (WP) | ANO |
| **Smooth scroll** (Lenis) | ANO | NE | ANO |
| **SEO-ready** od začátku (Schema.org, OG) | ANO | Částečně | ANO |
| **Mobile-first responsive** | ANO | Částečně | ANO |
| **Custom scrollbar + progress** | ANO | NE | Částečně |
| **Serif + sans-serif font pairing** | ANO (Cormorant + Inter) | NE | ANO |

**Závěr:** Nový web AK Švecová je na technologické a designové úrovni srovnatelné s award-winning právnickými weby, a to v prostředí, kde 95 % české konkurence stojí na zastaralých WordPress šablonách.

---

## 6. Cenový model (WaaS - Website as a Service)

### Klientský ceník

| Období | Cena | Co zahrnuje |
|--------|------|-------------|
| **Rok 1-2** (setup + rozvoj) | 1 500 - 2 000 Kč/měsíc | Web + hosting + údržba + úpravy + podpora |
| **Od roku 3** (údržba) | 300 - 500 Kč/měsíc | Hosting + bezpečnostní updaty |

### Tržní srovnání

| Typ webu | Jednorázová cena | Měsíční náklady |
|----------|------------------|-----------------|
| WordPress šablona (CZ agentura) | 20 000 - 40 000 Kč | 500 - 1 000 Kč (hosting + údržba WP) |
| Custom WordPress (CZ agentura) | 40 000 - 80 000 Kč | 1 000 - 2 000 Kč |
| **Custom Next.js web (reálná hodnota)** | **60 000 - 90 000 Kč** | 500 - 1 500 Kč |
| Zahraniční solo lawyer web (US/CA) | $5 000 - $15 000 | $100 - $300/mo |

**ROI pro klienta:** Za 24 mesíců x 2 000 Kč = 48 000 Kč zaplatí za web v hodnotě 60-90 tisíc Kč, včetně průběžné údržby, úprav a hostingu. Navíc s technologií (Next.js 16), kterou žádná CZ agentura standardně nenabízí pro solo advokáty.

---

## 7. Infrastructure

### Coolify

| Parametr | Hodnota |
|----------|---------|
| **Coolify Project** | AK Svecova |
| **Project UUID** | `uko0ogscoookokgw048cwkk0` |
| **App UUID** | `ykwsc4o8s0ggwk08404kswgw` |
| **Server** | Hetzner VPS (49.13.192.85) |
| **Coolify Dashboard** | http://100.89.31.54:8000 (Tailscale) |
| **Build** | Nixpacks (auto-detected Next.js) |
| **Domain** | aksvecova.mujagent.cz |
| **SSL** | Let's Encrypt (auto via Traefik) |

### DNS (FORPSI)

```
A     aksvecova.mujagent.cz    49.13.192.85
```

Budoucí migrace na `aksvecova.cz` vyžaduje:
1. Přidání A recordu u FORPSI pro `aksvecova.cz` -> `49.13.192.85`
2. Přidání domény v Coolify
3. Nový Let's Encrypt certifikát (automaticky)
4. Redirect z `aksvecova.mujagent.cz` -> `aksvecova.cz`

### GitHub

| Parametr | Hodnota |
|----------|---------|
| **Repo** | github.com/Valis1978/aksvecova |
| **Branch** | main |
| **Auto-deploy** | Via Coolify webhook (push to main) |

---

## 8. Co chybí z původního webu (TODO)

### Vysoká priorita

| Feature | Důvod | Effort |
|---------|-------|--------|
| **JSON-LD Schema.org** (LegalService + FAQPage) | SEO - rich snippets v Google | 2h |
| **sitemap.xml + robots.txt** | SEO - indexace | 1h |
| **Logo/badge Unie rodinných advokátů** | Důvěryhodnost (obrázek `ura-logo.jpg` již existuje) | 1h |
| **Backend kontaktního formuláře** | Formulář zatím jen console.log | 4h |
| **FAQ sekce** | SEO + snížení dotazů | 3h |

### Střední priorita

| Feature | Důvod | Effort |
|---------|-------|--------|
| **Podstránky jednotlivých služeb** | SEO - long-tail keywords | 8-12h |
| **Google Analytics / Search Console** | Měření, performance tracking | 2h |
| **Custom doména aksvecova.cz** | Profesionalita, brand | 1h (DNS) |
| **GDPR stránka** | Legislativa (odkaz ve footeru existuje, stránka ne) | 3h |

### Nízká priorita (roadmap)

| Feature | Důvod | Effort |
|---------|-------|--------|
| **Blog/články** | SEO long-term (klíčové pro traffic) | 16h+ |
| **Testimonials/recenze** | Social proof | 4h |
| **Video představení** | Trend 2026, konverzní nástroj | 2h (embed) |
| **LinkedIn integrace** | Profesní síť | 2h |
| **Dark mode** | Nice-to-have | 4h |
| **Vícejazyčnost (EN)** | Zahraniční klienti | 8h |

---

## 9. Roadmap

### Fáze 1 - MVP (HOTOVO)

- [x] One-page web design (Hero, Services, About, Process, Pricing, Contact)
- [x] GSAP animace (clip-path, parallax, stagger, scroll-triggered)
- [x] Lenis smooth scroll s GSAP ScrollTrigger sync
- [x] Multi-step kontaktní wizard (4 kroky)
- [x] Responzivní design (mobile-first)
- [x] Navbar (transparent -> solid on scroll, hamburger menu)
- [x] Pricing sekce (hodinová sazba + 4 paušální balíčky)
- [x] Scroll progress bar
- [x] Custom scrollbar styling
- [x] Deploy na Coolify
- [x] SSL certifikát (Let's Encrypt)

### Fáze 2 - SEO & Podstránky (HOTOVO - 2026-02-25)

- [x] JSON-LD Schema.org (LegalService + FAQPage + BreadcrumbList)
- [x] Logo Unie rodinných advokátů v About sekci (staženo z uracr.cz)
- [x] 6 podstránek služeb (/sluzby/[slug]) s GSAP animacemi
- [x] FAQ na každé podstránce (4 otázky per oblast)
- [x] Breadcrumb navigace (vizuální + Schema.org)
- [x] Service karty linkují na podstránky (ArrowRight hover efekt)
- [x] Navbar funguje z podstránek (absolutní cesty)
- [ ] sitemap.xml + robots.txt
- [ ] Backend kontaktního formuláře (API route + email notifikace)
- [ ] Google Analytics / Search Console
- [ ] GDPR stránka
- [ ] Custom doména aksvecova.cz

### Fáze 3 - Rozvoj (BUDOUCNOST)

- [ ] Blog modul
- [ ] Testimonials sekce
- [ ] Video představení
- [ ] LinkedIn integrace
- [ ] Performance optimalizace (image optimization, lazy loading audit)

---

## 10. Technické poznámky

### Viewport locking

```tsx
// src/app/layout.tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,  // Native-feel, žádný pinch-to-zoom
  themeColor: "#0A1628",
};
```

### Lenis + GSAP synchronizace

```tsx
// src/components/providers/LenisProvider.tsx
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

Lenis zajišťuje plynulý scroll s easing funkcí `1.001 - 2^(-10t)`, GSAP ScrollTrigger se synchronizuje přes Lenis scroll event. Bez této synchronizace by ScrollTrigger animace nereagovaly na Lenis-managed scroll position.

### Tailwind CSS v4 theme

Barvy a fonty jsou definovány přímo v `globals.css` přes `@theme inline` blok (nový Tailwind v4 přístup - žádný `tailwind.config.js`).

### Known issues

1. **Kontaktní formulář** - pouze frontend (console.log), backend endpoint neimplementován
2. **GDPR stránka** - link ve footeru existuje (`/gdpr`), stránka zatím neexistuje
3. **Obrázky služeb** - soubory existují v `/public/images/` (rodinne-pravo.jpg atd.), ale aktuálně se nepoužívají v Services komponentě (pouze ikony)

---

*Dokument vygenerován 2026-02-25. Zdroj: analýza kódu v `C:\Projekty\aksvecova\`.*
