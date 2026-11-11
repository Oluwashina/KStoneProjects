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
| Email, phones, office addresses, LinkedIn & social URLs, CEO portrait | `src/data/site.ts` (social links and portrait still use `null` until supplied) |
| Services & categories | `src/data/services.ts` |
| Projects (empty until verified records are supplied) | `src/data/projects.ts` |
| Sectors, approach, values, partner types | `src/data/content.ts` |
| Image paths, alt text and crops | `src/data/images.ts` (files live in `public/images`) |
| Photo attribution | `src/data/credits.ts` (shown at `/credits`) |
| Design tokens (colours, fonts, motion) | `src/app/globals.css` |

### Adding a project
Add an object to `projects` in `src/data/projects.ts` (title, location, category, overview, scope, status, images).
Put JPEGs in `public/images/projects/`. Each project has a detail page at `/projects/[slug]` with a photo gallery.
Optional site video: add MP4/WebM under `public/videos/projects/` and list it in the project’s `videos[]` array.

### Setting the CEO portrait
Put the photo in `public/images/leadership/` and set `ceo.portrait` in `src/data/site.ts`.

## Enquiry forms

Both forms post to `/api/enquiry` with shared validation (`src/lib/validation.ts`). Internal delivery uses **Gmail SMTP**
(templates in `src/lib/enquiry-mail.ts` — separate layout for project vs partnership enquiries).

Copy `.env.example` to `.env.local` and set:

```
GMAIL_USER=kstoneprojectslimited@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password    # Google Account → Security → App passwords (2FA required)
ENQUIRY_NOTIFY_TO=kstoneprojectslimited@gmail.com   # optional; defaults to GMAIL_USER
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

On your host (Vercel, etc.), add the same variables under project settings. Remove spaces from the app password if
Google shows them in groups of four.

Optional fallback: `ENQUIRY_WEBHOOK_URL` is used only when Gmail credentials are **not** set.

In development without Gmail configured, submissions are logged to the terminal. In production with no channel, the API
returns 503 so leads are not silently dropped.

## Brand assets

The supplied logo artwork lives untouched in `public/brand`. `src/components/layout/Logo.tsx` picks the correct supplied
variant for light vs dark backgrounds — do not recolour or restyle the logo.
