# GeoGas Services website

Production website and content-management application for GeoGas Services. It is a Next.js 16 application with a SQLite-backed content editor, customer forms, competition entry management, and a context-restricted OpenAI chatbot.

## Local development

Requirements:

- Node.js 20.x
- npm 10 or later

Set up a clean checkout:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. Never copy the production `.env`, SQLite database, certificates, uploads, or logs into Git.

Useful checks:

```bash
npm run lint
npm run typecheck
npm run audit:dependencies
npm run build
npm run verify
```

`npm run build` uses an isolated build directory and restores Next.js-generated changes to `next-env.d.ts` and `tsconfig.json`, keeping the working tree clean.

## Configuration

Copy `.env.example` to `.env.local` and provide only the values needed for the feature being tested.

- `ADMIN_PANEL_KEY`: long random secret for `/admin` API requests.
- `CONTACT_CAPTCHA_SECRET`: separate long random HMAC secret for contact challenges.
- `OPENAI_API_KEY` and `OPENAI_MODEL`: chatbot access and model selection.
- `GMAIL_SMTP_USER`, `GMAIL_SMTP_APP_PASSWORD`, and `BOOKING_NOTIFICATION_TO`: direct booking notifications.
- `LEAD_WEBHOOK_URL`, `CONTACT_WEBHOOK_URL`, and `NEWSLETTER_WEBHOOK_URL`: optional delivery fallbacks.
- `FORM_ALLOWED_ORIGINS`: comma-separated production origins accepted by booking routes.
- `CONTENT_DATABASE_PATH`: optional SQLite path; defaults to `content/geogas-content.sqlite`.

No real credential belongs in a tracked file. Production secrets must remain in the server environment and the operator's password manager.

## Project layout

- `app/`: pages and server API routes.
- `components/`: reusable UI and form components.
- `content/`: versioned seed content; runtime SQLite files are ignored.
- `data/`: typed default site content.
- `lib/`: authentication, validation, database, email, and request-security code.
- `public/`: static assets; runtime uploads are not source code.
- `scripts/`: build and Windows production-runner scripts.

The admin editor is available at `/admin`. It fails closed unless `ADMIN_PANEL_KEY` is configured. Public form and chatbot routes enforce origin, size, validation, and per-client rate limits.

## Production model

The production application must:

- bind only to `127.0.0.1:15023` behind Nginx;
- run through the low-privilege `NETWORK SERVICE` watchdog;
- be deployed from a reviewed, clean commit;
- keep `.env`, databases, uploads, certificates, build output, dependencies, and logs untracked;
- pass `npm run verify`, a staged secret/IOC scan, and a malware scan before release.

The Windows deployment helpers are intentionally specific to the managed production host. Do not use the removed legacy PM2 startup path.

## Content and data

Editable content is stored in `content/geogas-content.sqlite` at runtime and seeded from versioned JSON documents under `content/`. Competition entries and website leads contain personal data and must never be copied into Git or a development fixture.

Uploaded media is served from `public/uploads` in production. Review files before deliberately promoting any upload into versioned source.

## Security

Report security concerns through a private GitHub security advisory for this repository. Do not include credentials, customer data, exploit payloads, or production logs in a public issue.
