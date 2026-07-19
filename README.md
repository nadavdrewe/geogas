This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Content Editor

The project now includes a starter admin panel for editable site content:

- Open `/admin` to edit website text and image paths in visual mode or raw JSON mode.
- Upload images/videos/PDFs from `/admin` and paste returned `/uploads/...` paths into content fields.
- Manage homepage video posts directly in `/admin` (add/edit/remove cards, file/poster paths).
- Download a JSON snapshot from `/admin` for manual backups.
- Content is stored in `content/geogas-content.sqlite` in the `content_documents` table.
- A fresh database is seeded from the versioned JSON documents in `content/`; keep those files as the recoverable source of truth.
- `/admin` reads and writes content through `/api/admin/documents`, with the site document stored as `site:published`.
- Public client refreshes read site content through `/api/content/site`.
- `ADMIN_PANEL_KEY` is required: without it, all admin content and upload routes fail closed.
- `LEAD_WEBHOOK_URL` (or the contact/newsletter-specific override) is required for forms to report successful delivery. Without one, forms return a safe temporary-unavailable response and do not log personal data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
