# ARCADA Ecommerce Platform

ARCADA is a 100% custom-programmed ecommerce website built by **Alaa Younsi**.

This project combines a premium storefront experience with a real database-backed backend and an integrated admin dashboard that allows people with no coding experience to manage products, orders, categories, messages, newsletter subscriptions, and key business data.

## Project Overview

This platform was built to solve two goals at once:

- Deliver a high-end, modern ecommerce UX focused on design quality, speed, and mobile responsiveness.
- Provide a practical admin panel so non-technical users can run day-to-day operations without touching code.

From catalog browsing to checkout and order management, every part of the flow is connected to Supabase and designed for real usage.

## Core Features

- Fully responsive storefront (desktop, tablet, mobile)
- Product catalog with categories, variants, and product detail pages
- Checkout flow with order creation and confirmation
- Contact form and newsletter subscription handling
- Admin dashboard with operational and analytics views
- Product, order, and category management interfaces
- Messages and newsletter management inside admin
- Internationalization support (English, French, Arabic)
- Smooth UI animations and premium visual treatment

## Tech Stack

### Frontend

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- Framer Motion
- React Router v6
- Zustand (state management)
- React Hook Form + Zod (forms + validation)
- React Helmet Async (SEO metadata)
- i18next + react-i18next (multilingual support)
- Lucide React (icons)

### Backend and API

- Node.js + Express (custom API server)
- Vercel serverless API route (`api/[...path].ts`) for production deployments
- Helmet + CORS middleware

### Database and Services

- Supabase (PostgreSQL + auth + storage + RLS)
- Supabase SQL schema and migration scripts

### Tooling

- TypeScript project references (`tsconfig.*`)
- PostCSS + Autoprefixer
- Concurrently + Bun scripts for local full-stack development

## Architecture

The codebase is structured in a full-stack style:

- `src/` contains the React app (storefront + admin UI).
- `server/` contains an Express API server for local/dev server workflows.
- `api/[...path].ts` contains the Vercel-compatible API handler used in deployment.
- `supabase/` contains SQL schema, RLS, seed data, and migration scripts.

This dual server setup gives flexibility: local development with Express and production-friendly serverless deployment on Vercel.

## File Structure

```text
arcada/
├── api/
│   └── [...path].ts               # Vercel API handler
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── server/
│   ├── index.ts                   # Express entrypoint
│   ├── lib/
│   │   └── supabase.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── cors.ts
│   └── routes/
│       ├── admin.ts
│       ├── categories.ts
│       ├── orders.ts
│       └── products.ts
├── src/
│   ├── components/
│   │   ├── layout/                # Navbar, Footer, Layout
│   │   ├── shop/                  # Cart, product UI blocks
│   │   ├── seo/
│   │   └── ui/
│   ├── hooks/
│   ├── i18n/
│   │   └── locales/               # en/fr/ar translations
│   ├── lib/                       # Client API + Supabase client
│   ├── pages/
│   │   ├── admin/                 # Admin dashboard pages
│   │   └── ...                    # Storefront pages
│   ├── store/                     # Zustand stores
│   └── types/
├── supabase/
│   ├── migrations/
│   ├── schema.sql
│   ├── rls.sql
│   ├── seed.sql
│   └── features.sql
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── vercel.json
```

## Admin Dashboard for Non-Technical Users

The admin system is intentionally designed for users with no coding background.

What admins can do directly from UI:

- Add, edit, and organize product catalog entries
- Track and process incoming orders
- Manage categories and storefront structure
- Read and manage contact messages
- Monitor newsletter subscriptions
- View key metrics in dashboard widgets

This enables business operations to run smoothly without developer intervention for everyday tasks.

## Design and UX Direction

ARCADA uses a premium editorial aesthetic with clean spacing, intentional typography, and soft visual depth.

Notable UI design choices:

- Floating rounded navigation shell for brand identity
- Warm neutral palette for a luxury ceramic/surface brand feel
- Smooth transition choreography via Framer Motion
- Mobile-first responsive behavior with overflow-safe layout constraints
- Structured card system for readability and consistency

The result is a modern storefront that feels polished while staying practical for daily use.

## Local Development

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Run full stack (frontend + server):

```bash
npm run dev:full
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment Variables

Create an `.env` file with your Supabase keys and API settings. Typical values include:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server/admin-only usage)

Do not expose server-only secrets in client-side code.

## Database Notes

Key SQL assets live in `supabase/`:

- `schema.sql` for core schema
- `rls.sql` for row-level security
- `seed.sql` for seed data
- `features.sql` for additional feature tables
- `migrations/` for targeted post-deploy schema updates

Run migrations in Supabase SQL Editor when needed (for example, adding new columns like `orders.notes`).

## MIT License

This project is licensed under the MIT License.

See the full license text here: [LICENSE](LICENSE)

## Author

Built and maintained by **Alaa Younsi**.

## Note

This repository represents a fully custom ecommerce build focused on production practicality, strong UX, and easy business-side management for non-developers.