# INKORA — Front-end E-commerce Demo

A pixel-accurate Next.js App Router storefront built from Figma. Front-end only — no backend, database, or authentication. Cart and wishlist are persisted in localStorage.

## Tech
- Next.js 16.4.3 (App Router, Cache Components, Partial Prefetching)
- React 19.3
- TypeScript
- Tailwind CSS v4
- Zustand
- next/font (Geist)

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build
```bash
npm run build
npm start
```

## Add a product
Edit `data/products.ts`. Drop images into `public/products/`. Add a product object with a unique `slug`. It will automatically appear on `/shop`, filters, search, related products, and its own page at `/product/[slug]`.

## Re-theme
Update design tokens in `src/app/globals.css` under `@theme`.

## Replace logo/images
Update `siteConfig.logo` in `data/site-config.ts`, or swap files in `public/`.

## Deploy
Zero-config deploy to Vercel. Push to a Git repo and import the `frontend/` directory as the project root.
