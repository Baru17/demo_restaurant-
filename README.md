# PONNIYIN VIRUNDHU

A premium, single-page restaurant website demo built with React, Vite, and Tailwind CSS. It is designed as a sales-ready concept for independent restaurants: dark editorial styling, a filterable menu, a keyboard-accessible gallery, and an honest demonstration of a reservation flow.

**PONNIYIN VIRUNDHU is a fictional restaurant.** The menu, address, phone number, email address, map, and reservation details are sample content. The site is marked `noindex, nofollow` and is not intended to collect real bookings.

---

## What is included

- Announcement bar with dismiss control
- Sticky header, active-section navigation, and a full-screen mobile menu
- Cinematic hero with prioritized local photography
- Philosophy section, four signature dishes, and an "Our Story" section
- Filterable menu with categories, dietary tags, and automatic dish counts
- Gallery with an accessible lightbox (arrow keys, Escape, focus trap)
- "Visit Us" section with hours, contact details, an illustrative map, and directions state
- Accessible reservation demo with client-side validation and an honest confirmation state
- Footer with navigation, hours, contact information, photo credits, and demo disclosure
- SEO title/description, Open Graph and Twitter cards, canonical URL support, JSON-LD, and favicon
- Responsive layouts verified at 320, 375, 430, 768, 1024, and 1440 px
- Reduced-motion support, visible focus states, skip link, and semantic landmarks

The production build is a static site with no backend, database, authentication, or environment secrets.

---

## Stack

| Tool | Version / notes |
| --- | --- |
| React | 19 |
| Vite | 8.3 |
| Tailwind CSS | 4.3 via `@tailwindcss/vite` |
| Lucide React | 1.64 |
| JavaScript | JSX, no TypeScript |
| Package manager | npm |

Node **20.19+ or 22.12+** is required by Vite 8. Node 22 LTS is recommended, especially for Cloudflare Pages.

---

## Quick start

```bash
npm install
npm run dev
```

Vite prints the local development URL (normally `http://localhost:5173`).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Serve the production build locally (normally port 4173) |
| `npm run lint` | Run ESLint over the project |

Build and lint before handing the site to a client:

```bash
npm run lint
npm run build
npm run preview
```

---

## Project structure

```text
.
├─ public/
│  ├─ _headers              # Cloudflare Pages security/cache headers
│  ├─ favicon.svg
│  ├─ robots.txt            # Disallows indexing for the demo
│  └─ images/               # Local photography + social preview image
├─ src/
│  ├─ components/           # Page sections, dialogs, image/header primitives
│  ├─ config/
│  │  └─ restaurant.js      # Brand, business details, copy, theme, SEO, reservation
│  ├─ data/
│  │  ├─ menu.js            # Menu categories, items, prices, dietary tags
│  │  └─ gallery.js         # Gallery images, captions, credits
│  ├─ hooks/                # Focus trap, scroll lock, active-section observer
│  ├─ utils/                # Class-name helper, formatters, form validation
│  ├─ App.jsx               # Section order, theme injection, modal state
│  ├─ index.css             # Tailwind theme tokens, shared components, motion
│  └─ main.jsx
├─ index.html               # Metadata placeholder tokens + noscript fallback
├─ vite.config.js           # React, Tailwind, and metadata/JSON-LD injection
├─ eslint.config.js
└─ package.json
```

### One source of truth

`src/config/restaurant.js` drives the visible business copy and most metadata. A small Vite plugin in `vite.config.js` reads that file at build and development time and replaces the `%TOKEN%` placeholders in `index.html`. This keeps the document head, social cards, and structured data aligned with the visible page.

The menu and gallery have their own files because they are longer collections:

- `src/data/menu.js`
- `src/data/gallery.js`

---

## Customization

### 1. Brand identity and copy

Edit `src/config/restaurant.js`:

| Field | Controls |
| --- | --- |
| `name` | Wordmark, footer, page labels, JSON-LD |
| `nameTamil` | Tamil wordmark line rendered under English wordmark |
| `tagline` | Hero headline / supporting brand copy |
| `taglineTamil` | Tamil translation of headline |
| `shortDescription`, `cuisine`, `priceRange` | Metadata and supporting copy |
| `demo` | Demo disclosure, footer demo tag, JSON-LD disclaimer |
| `nav` | Header, mobile menu, and footer navigation labels/anchors |
| `announcement` | Announcement text, link, and dismissible state |
| `hero` | Eyebrow, headline, description, CTAs, image, details, note |
| `philosophy` | Philosophy heading, body, image, and three supporting points |
| `signatureDishes` | Section copy and the four `dishIds` featured from the menu |
| `menu`, `gallery`, `story`, `visit` | Section headings, descriptions, and notes |
| `footer` | Blurb and photography credit link |
| `social` | Optional social links (text links; no brand icons) |
| `seo` | Title, description, site URL, OG image, robots directive, theme color |
| `brandDescriptor` | Shown in vertical label on hero and header |

Important brand details:

- The wordmark in `BrandMark.jsx` renders an ampersand in the accent style automatically. A name without `&` still works.
- The header city label, hero vertical label, and map neighborhood label now read from `restaurant.location`, so changing the neighborhood/city updates those areas too.
- The `noscript` fallback in `index.html` contains the current brand name and tagline; update it when rebranding.
- The Tamil font stack `var(--font-tamil)` is loaded from Google Fonts and mapped in `src/index.css`. To use a different Tamil font, replace the Google Fonts `<link>` in `index.html` and update `--font-tamil` in `src/index.css`.
- Replace `public/favicon.svg` and the OG image when changing the identity.

### 2. Colors and fonts

**Colors** are defined twice on purpose:

1. `src/config/restaurant.js` → `theme` applies CSS variables at runtime.
2. `src/index.css` → the `@theme` block contains fallbacks so the page has the right colors before React mounts.

When changing a brand color, update both places. The defaults are:

| Token | Value |
| --- | --- |
| Background | `#10100F` |
| Surface | `#191816` |
| Elevated | `#22201D` |
| Text | `#F5F0E8` |
| Muted | `#B5ADA0` |
| Gold accent | `#C7A56B` |
| Hairline border | `rgba(245, 240, 232, 0.14)` |

**Fonts** are loaded from Google Fonts in `index.html` and mapped in `src/index.css`:

```css
--font-display: "Cormorant Garamond", "Playfair Display", Georgia, "Times New Roman", serif;
--font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--font-tamil: "Noto Serif Tamil", "Noto Sans Tamil", "Nirmala UI", "Latha", serif;
--font-tamil-sans: "Noto Sans Tamil", "Nirmala UI", "Latha", sans-serif;
```

To change fonts:

1. Replace the Google Fonts `<link>` in `index.html`.
2. Update `--font-display` and/or `--font-sans` in `src/index.css`.
3. If you self-host fonts, remove the Google Fonts preconnect links and update the `Content-Security-Policy` in `public/_headers`.

### 3. Menu and prices

Edit `src/data/menu.js`.

- `MENU_CATEGORIES` controls category tabs and their descriptions.
- `MENU_ITEMS` holds each dish: `id`, `category`, `name`, `nameTamil`, `description`, `price` (number in INR), and optional `dietary`.
- `DIETARY_LABELS` controls the short tag code and the screen-reader label.
- Add `image: { src, alt, position }` to a dish if it should appear in the signature-dish section. The featured IDs come from `restaurant.signatureDishes.dishIds`.
- Prices are formatted with `Intl.NumberFormat` using `restaurant.currency` and `restaurant.locale` — the default currency is `INR`, so prices display as `₹320`.
- Counts and filter tabs update automatically when items or categories change.

Always verify allergens, dietary claims, and prices with the restaurant before publishing. The sample tags are illustrative only.

### 4. Gallery

Edit `src/data/gallery.js`. Each entry needs:

```js
{
  id: 'unique-id',
  src: '/images/your-photo.webp',
  alt: 'A specific description of what is visible.',
  caption: 'Short caption shown on the card and in the lightbox.',
  credit: 'Photographer / Pexels',
}
```

The gallery layout cycles through six fixed compositions in `GallerySection.jsx`. If you add more than six photos, review the `LAYOUTS` array so the grid still looks intentional. The lightbox supports any number of images.

### 5. Images

All photography is stored locally in `public/images/`, not hotlinked, so the site works with the restrictive content security policy and does not depend on third-party image availability.

To replace an image:

1. Add the new file to `public/images/` (JPG or WebP; keep file sizes reasonable).
2. Update the corresponding `src` in `restaurant.js`, `menu.js`, or `gallery.js`.
3. Update `alt` text to describe the new photograph.
4. Update the attribution table below.
5. If replacing the hero, keep the `hero.image.src` path accurate — the build uses it for the preload link.
6. If replacing the social preview, use a **1200 × 630** JPG/PNG at `public/images/og-ponniyin-virundhu.jpg` (or update `seo.ogImage`).

The local image set totals roughly 2.3 MB. Hero photography is loaded eagerly and prioritized; below-the-fold images are lazy-loaded. `SmartImage` reserves layout space and provides a branded fallback if an image fails.

### 6. Address, hours, contact, and directions

Edit these fields in `restaurant.js`:

- `location` — address lines, neighborhood, city, region, postal code, and `mapsUrl`.
- `hours` — the day-by-day list and `hoursSummary`.
- `contact.phone` / `contact.email` — display text, link target, and `isPlaceholder`.
- `visit` — section copy, map caption, and button labels.

Behavior to understand:

- While `location.isPlaceholder` is `true`, directions stay disabled and sample-location notes are shown.
- Directions become active when both `location.mapsUrl` is set and `location.isPlaceholder` is `false`.
- While a phone/email is marked `isPlaceholder`, it is rendered as plain text rather than a live link. Set the placeholder flag to `false` to enable `tel:` and `mailto:` links.
- JSON-LD omits the address and telephone while they are marked as placeholders. Fill them in and set the flags to `false` for a real client.
- `LocationMap` is a hand-drawn illustration, not a real map embed. It deliberately avoids sending location data to a third party.

### 7. Reservation form

The default configuration is an honest demo:

```js
reservation: {
  enabled: true,
  mode: 'demo',
  // ...
}
```

In demo mode, the form validates input, shows a confirmation state, and explicitly says that nothing was sent or stored. No network call is made and no data is retained.

For a live reservation flow:

1. Change `mode` to `'live'`.
2. Provide an async `onSubmit` handler in `restaurant.reservation`:

   ```js
   onSubmit: async (values) => {
     const response = await fetch('https://your-booking-endpoint.example/reservations', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(values),
     });
     if (!response.ok) throw new Error('Reservation request failed');
   },
   ```

3. Update `successTitle` and `successMessage` to match the real booking behavior. Never claim a table is confirmed unless the provider actually confirms it.
4. Update the `Content-Security-Policy` in `public/_headers` to allow the API origin in `connect-src` (the current policy only allows `'self'`).
5. Add server-side validation, spam protection/rate limiting, privacy disclosure, and a retention policy on the receiving service.

Client-side validation is a convenience, not a security boundary.

### 8. SEO, social cards, and indexing

Edit `restaurant.seo`:

- `title`, `description` — used in the document head and social metadata.
- `siteUrl` — the production origin, for example `https://ponniyin-virundhu.pages.dev` or a custom domain.
- `ogImage`, `ogImageAlt` — social preview image and description.
- `robots` — currently `noindex, nofollow`.
- `themeColor` — browser UI color.
- `structuredData` — enables or disables JSON-LD output.

**Before launch:**

1. Set `siteUrl` to the real production URL and rebuild. Without it, the canonical link and `og:url` are omitted, and social image URLs remain relative (many scrapers prefer absolute URLs).
2. Change `robots` to `index, follow`. Also update `public/robots.txt`, which currently disallows all crawling.
3. Replace the demo title, description, favicon, and OG image.
4. Set `demo.enabled` to `false` for a real client site. This removes the footer demo disclosure/tag and the "fictional restaurant" note from structured data.
5. Review `vite.config.js` → `buildStructuredData()` and make sure the restaurant schema matches the real business. Add opening hours, geo coordinates, or menu URLs only when the data is accurate.
6. Validate the result with a structured-data testing tool and test the social card with the platform's preview debugger.

### 9. Announcement and social links

- Set `announcement.enabled` to `false` to hide the top strip entirely.
- `announcement.dismissible` hides the close control; the dismissal is intentionally per-session (React state only, not persisted).
- Social links are text links to keep the dependency set small. Add entries to `restaurant.social`; each opens in a new tab with `rel="noopener noreferrer"`.

---

## Deploying to Cloudflare Pages

The repository is ready for a static Cloudflare Pages deployment. No environment variables or secrets are required for the demo.

### Dashboard flow

1. Push the project to GitHub (or GitLab).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository.
4. Use these build settings:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | `22` (environment variable `NODE_VERSION=22`) |

5. Deploy. The site is fully static; no Functions or server runtime are needed.
6. Add a custom domain if desired, then set `restaurant.seo.siteUrl` to the final origin and redeploy.

### CLI flow

```bash
npm run build
npx wrangler pages deploy dist --project-name ponniyin-virundhu
```

You will need to authenticate with Cloudflare the first time.

### Deployment notes

- `public/_headers` and `public/robots.txt` are copied into `dist/` by Vite and served by Cloudflare Pages.
- `_headers` adds `nosniff`, frame denial, a referrer policy, permissions restrictions, a content security policy, and long-lived immutable caching for hashed assets.
- The site uses hash anchors only. No SPA rewrite or `_redirects` rule is needed.
- **Do not publish with placeholder business details.** The demo is deliberately `noindex, nofollow`, and directions/contact links are disabled where appropriate.
- No localhost URLs, API keys, or secrets are included in the production bundle.
- Google Fonts is the only third-party runtime request. For a stricter deployment, self-host the fonts and adjust the CSP.

---

## Creating a second restaurant site

This project is a single-tenant static site. To adapt it for another restaurant, create a separate copy and deployment:

1. Copy the project to a new folder/repository.
2. Update `src/config/restaurant.js` with the new name, copy, address, hours, contacts, SEO, and theme.
3. Replace `src/data/menu.js` and `src/data/gallery.js`.
4. Replace `public/images/` and update all image paths, alt text, and credits.
5. Update the Google Fonts link and font tokens if the brand uses different typefaces.
6. Replace `public/favicon.svg` and the 1200 × 630 OG image.
7. Keep `demo.enabled: true` while pitching; set it to `false` and switch `reservation.mode` only when the client approves a live flow.
8. Set a new `seo.siteUrl`, update `robots`, and deploy to a separate Cloudflare Pages project.

If you expect to maintain many restaurant sites, consider moving `src/config/restaurant.js` and the data files to a CMS or a shared JSON schema. That would require a build step or runtime data source; the current site intentionally keeps content in source files for simplicity.

---

## Client launch checklist

- [ ] Restaurant name, tagline, and all section copy approved
- [ ] Real address, neighborhood, city, postal code, and Google Maps URL
- [ ] Directions enabled (`mapsUrl` set, `isPlaceholder: false`)
- [ ] Real phone and email, with placeholder flags set to `false`
- [ ] Hours verified, including holiday closures and last seating
- [ ] Menu names, descriptions, prices, and dietary/allergen claims verified
- [ ] Signature dishes reviewed and images approved
- [ ] Reservation provider/API selected, tested, and privacy language approved
- [ ] Reservation mode switched to `live` (or the demo form intentionally retained)
- [ ] Photography rights confirmed; credits updated
- [ ] Social links added or removed
- [ ] Favicon and OG image replaced
- [ ] `seo.siteUrl` set to the production origin
- [ ] `robots` changed to `index, follow` and `public/robots.txt` updated
- [ ] `demo.enabled` set to `false` if the site is no longer a demo
- [ ] JSON-LD validated against real business data
- [ ] Contact, directions, menu filters, gallery, and reservation flow tested on a phone
- [ ] Console and network panel clean in production
- [ ] Cloudflare Pages custom domain and HTTPS confirmed
- [ ] Client sign-off on final copy and imagery

---

## Accessibility and QA notes

The demo includes:

- A visible-on-focus skip link as the first focusable element
- Semantic landmarks, one `h1`, and ordered heading levels
- Keyboard-operable mobile menu, gallery lightbox, and reservation modal
- Focus trapping in dialogs, Escape-to-close, and focus restoration to the trigger
- `aria-expanded`, `aria-controls`, `aria-pressed`, `role="dialog"`, `aria-modal`, and live status/error regions
- Form labels, inline validation messages, `aria-invalid`, and focus on the first invalid field
- Descriptive alt text on every content image; decorative images are hidden from assistive technology
- `prefers-reduced-motion` handling that disables smooth scrolling and long reveal animations
- Touch targets sized to at least 44 px for primary controls
- Responsive verification at 320, 375, 430, 768, 1024, and 1440 px with no horizontal page overflow

The project was reviewed in headless Chromium with Playwright across the six target widths, including mobile navigation, menu filtering, lightbox keyboard behavior, form validation, scroll locking, reduced motion, image loading, console errors, and failed network requests. **No automated test suite is committed to this repository**, and Firefox/Safari were not part of that verification pass. Re-test on real iOS Safari and Android Chrome before a client launch.

---

## Image attribution

All photographs are local copies of images from [Pexels](https://www.pexels.com/) and are used under the [Pexels license](https://www.pexels.com/license/). Attribution is not required by the license, but is provided here for transparency.

| Local file | Used in | Photographer | Source |
| --- | --- | --- | --- |
| `hero-tamil-feast.webp` | Hero | Saveurs Secretes | [Pexels 14831547](https://www.pexels.com/photo/abundance-of-food-on-leaf-14831547/) |
| `tamil-breakfast.webp` | Philosophy | Ryshy | [Pexels 35539315](https://www.pexels.com/photo/traditional-south-indian-breakfast-spread-35539315/) |
| `dish-dosa.webp` | Menu / signature dosa | Praveen Dandin | [Pexels 38229508](https://www.pexels.com/photo/delicious-south-indian-pancakes-on-banana-leaf-38229508/) |
| `dish-chettinad.webp` | Menu / Chettinad chicken | Milton Das | [Pexels 34217292](https://www.pexels.com/photo/indian-curry-dish-with-fresh-garnish-34217292/) |
| `dish-biryani.webp` | Menu / biryani | alleksana | [Pexels 4224304](https://www.pexels.com/photo/chicken-biryani-on-black-plate-4224304/) |
| `dish-filter-coffee.webp` | Menu / filter coffee | Muhammed Shasal A V | [Pexels 38201891](https://www.pexels.com/photo/traditional-south-indian-filter-coffee-in-bengaluru-38201891/) |
| `tamil-dining-room.webp` | Our Story | Abhishek Shekhawat | [Pexels 32657750](https://www.pexels.com/photo/elegant-indian-restaurant-interior-with-ornate-decor-32657750/) |
| `restaurant-interior.webp` | Gallery | Ankit | [Pexels 11236819](https://www.pexels.com/photo/interior-of-restaurant-11236819/) |
| `idli-vada.webp` | Gallery | Preyansh Patel | [Pexels 37867687](https://www.pexels.com/photo/south-indian-breakfast-with-idli-and-vada-37867687/) |
| `payasam.webp` | Gallery | Rishi Raut | [Pexels 13532753](https://www.pexels.com/photo/top-view-of-a-dessert-in-a-bowl-surrounded-with-red-flower-petals-13532753/) |
| `uttapam.webp` | Gallery | Muhammed Shasal A V | [Pexels 38201893](https://www.pexels.com/photo/south-indian-breakfast-with-uttapam-and-chutneys-38201893/) |
| `vada.webp` | Gallery | Muhammed Shasal A V | [Pexels 38201889](https://www.pexels.com/photo/traditional-indian-breakfast-on-banana-leaf-38201889/) |
| `dosa-chutney.webp` | Gallery | Smitha Nittur | [Pexels 40373954](https://www.pexels.com/photo/top-view-of-black-rice-dosa-with-chutney-40373954/) |
| `og-ponniyin-virundhu.jpg` | Social preview | Derived from the hero image by the project author | Based on [Pexels 14831547](https://www.pexels.com/photo/abundance-of-food-on-leaf-14831547/) |

The gallery credits are also stored alongside the images in `src/data/gallery.js` and displayed in the lightbox.

---

## Known limitations

- **This is a demo, not a booking system.** The reservation form does not send or store data and does not reserve a table.
- Business details are deliberately fictional placeholders. Directions are disabled while the address is a placeholder.
- The map is an illustration, not a live map or geocoded location.
- Menu items, prices, dietary tags, and hours are sample content and must be verified before a real launch.
- There is no CMS, admin panel, analytics, cookie banner, or consent management. Content changes require editing source files and rebuilding.
- The form has no spam protection, rate limiting, or server-side validation. Do not connect it to a live endpoint without adding those.
- Google Fonts is an external dependency. If it is unavailable, the declared serif/sans fallbacks are used.
- The project was verified with Chromium. Safari, Firefox, and real device testing remain part of a responsible launch process.
- A custom `404` page is not required for this single-page hash-anchor site, but Cloudflare Pages will use its default 404 response if a visitor requests an unknown path.

For questions about adapting the demo for a specific restaurant, start with `src/config/restaurant.js`, then replace the menu and gallery data.