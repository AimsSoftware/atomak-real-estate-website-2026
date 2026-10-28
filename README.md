# ATOMAK | أتومك

Elegant bilingual (Arabic RTL / English LTR) Next.js website for ATOMAK Private Property Rental & Management Services in Abu Dhabi, UAE.

## Pages

- `/ar` and `/en`: homepage with brand introduction, services, categories, benefits, and Abu Dhabi service areas
- `/ar/about` and `/en/about`: company story, vision, mission, process
- `/ar/properties` and `/en/properties`: interactive property-category tabs with enquiry links
- `/ar/contact` and `/en/contact`: phone, WhatsApp, email enquiry, and Google Maps location

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000 (redirects to Arabic homepage).

## Deploy to Netlify

Import this GitHub repository via **Netlify → Add new project → Import an existing project → GitHub**. Select `AimsSoftware/atomak-real-estate-website-2026`. Netlify auto-detects Next.js. Configuration is included in `netlify.toml`: build command `npm run build`, publish directory `.next`, Node.js 22. Netlify automatically enables its modern Next.js runtime.

## Notes

- Actual branding cropped from the supplied ATOMAK promotional artwork (`public/images/atomak-logo.webp`).
- Category images are illustrative stock photography, **not** actual property listings. Do not represent them as available properties.
- Contact form opens the visitor's email application; no email storage/backend is configured.
- WhatsApp and office location use the supplied business information and coordinates (24.3044149, 54.6174772).
- For future live listings, integrate a property CMS/API and replace illustrative cards with verified inventory.
