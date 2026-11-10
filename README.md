# Kstone Projects Limited — corporate website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Lucide icons.
All pages are statically rendered; the only server code is the enquiry endpoint.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Routes

`/` · `/about` · `/services` · `/projects` · `/leadership` · `/partnerships` · `/contact` · `/credits`
plus `/api/enquiry`, `sitemap.xml`, `robots.txt`, Open Graph/Twitter images and icons.

## Where to edit content

| What | File |
| --- | --- |
| Email, phone, address, LinkedIn & social URLs, CEO portrait | `src/data/site.ts` (every `null` is a labelled placeholder in the UI) |
| Services & categories | `src/data/services.ts` |
| Projects (empty until verified records are supplied) | `src/data/projects.ts` |
| Sectors, approach, values, partner types | `src/data/content.ts` |
| Image paths, alt text and crops | `src/data/images.ts` (files live in `public/images`) |
| Photo attribution | `src/data/credits.ts` (shown at `/credits`) |
| Design tokens (colours, fonts, motion) | `src/app/globals.css` |

### Adding a project
Add an object to `projects` in `src/data/projects.ts` (title, location, category, overview, scope, status, images).
Placeholders disappear automatically for any category that has real entries.

### Setting the CEO portrait
Put the photo in `public/images/leadership/` and set `ceo.portrait` in `src/data/site.ts`.

## Enquiry forms

Both forms (`/contact`, `/partnerships`) validate on the client and again on the server (`src/lib/validation.ts`,
`src/app/api/enquiry/route.ts`). To deliver enquiries, set an environment variable:

```
ENQUIRY_WEBHOOK_URL=https://…   # Zapier / Make / Formspree / Slack / your own endpoint — receives JSON
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

In development, enquiries are logged to the console. In production **without** a delivery channel the API returns 503
(so no lead is silently lost). To use a direct email/CRM integration, replace `deliver()` in the route handler.

## Brand assets

The supplied logo artwork lives untouched in `public/brand`. `src/components/layout/Logo.tsx` picks the correct supplied
variant for light vs dark backgrounds — do not recolour or restyle the logo.
