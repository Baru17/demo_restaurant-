import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import restaurant from './src/config/restaurant.js';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const absoluteUrl = (path = '') => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const base = restaurant.seo.siteUrl?.replace(/\/$/, '');
  if (!base) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

function buildStructuredData() {
  if (!restaurant.seo.structuredData) return '';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: restaurant.seo.description,
    servesCuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange,
    ...(restaurant.demo.enabled
      ? {
          disambiguatingDescription:
            'Fictional restaurant created for a website design demonstration.',
        }
      : {}),
    ...(restaurant.seo.siteUrl ? { url: restaurant.seo.siteUrl } : {}),
    ...(restaurant.seo.ogImage ? { image: absoluteUrl(restaurant.seo.ogImage) } : {}),
    ...(restaurant.contact.phone.isPlaceholder
      ? {}
      : { telephone: restaurant.contact.phone.display }),
    ...(restaurant.location.isPlaceholder
      ? {}
      : {
          address: {
            '@type': 'PostalAddress',
            streetAddress: restaurant.location.addressLine1,
            addressLocality: restaurant.location.city,
            addressRegion: restaurant.location.region ?? 'NY',
            postalCode: restaurant.location.postalCode,
          },
        }),
  };

  const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

/**
 * Keep SEO/meta values in one place: src/config/restaurant.js.
 * This also runs during `vite dev`, so the head stays in sync while editing.
 */
function restaurantMetaPlugin() {
  return {
    name: 'restaurant-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const canonical = restaurant.seo.siteUrl
          ? `<link rel="canonical" href="${escapeHtml(restaurant.seo.siteUrl)}" />`
          : '';
        const ogUrl = restaurant.seo.siteUrl
          ? `<meta property="og:url" content="${escapeHtml(restaurant.seo.siteUrl)}" />`
          : '';
        const heroPreload = restaurant.hero?.image?.src
          ? `<link rel="preload" as="image" href="${escapeHtml(restaurant.hero.image.src)}" fetchpriority="high" />`
          : '';

        const tokens = {
          '%SITE_NAME%': escapeHtml(restaurant.name),
          '%SEO_TITLE%': escapeHtml(restaurant.seo.title),
          '%SEO_DESCRIPTION%': escapeHtml(restaurant.seo.description),
          '%THEME_COLOR%': escapeHtml(restaurant.seo.themeColor),
          '%ROBOTS%': escapeHtml(restaurant.seo.robots),
          '%CANONICAL%': canonical,
          '%OG_URL%': ogUrl,
          '%OG_IMAGE%': escapeHtml(absoluteUrl(restaurant.seo.ogImage)),
          '%OG_IMAGE_ALT%': escapeHtml(restaurant.seo.ogImageAlt),
          '%HERO_PRELOAD%': heroPreload,
          '%STRUCTURED_DATA%': buildStructuredData(),
        };

        return html.replace(/%[A-Z_]+%/g, (token) => tokens[token] ?? '');
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), restaurantMetaPlugin()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
