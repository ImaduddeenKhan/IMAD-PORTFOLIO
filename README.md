# Imad Portfolio

Personal portfolio for Imaduddeen Khan with a full `/admin` editor, Supabase-backed content and uploads, project detail pages, theme studio, and deployment support for Vercel.

## Stack

- Next.js 15 App Router
- NextAuth v5 credentials auth
- Supabase Postgres + Storage
- Tailwind CSS 3
- Zod
- Vitest

## Local setup

Install dependencies:

```bash
npm install
```

Create env file:

```bash
cp .env.example .env.local
```

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Run local dev:

```bash
npm run dev
```

Run checks:

```bash
npm test
npm run build
```

## Required env vars

```env
NEXTAUTH_SECRET=replace-me
NEXTAUTH_URL=http://localhost:3000

ADMIN_NAME=Imaduddeen Khan
ADMIN_EMAIL=imad@example.com
ADMIN_PASSWORD=change-me
# or use ADMIN_PASSWORD_HASH=...

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_BUCKET=portfolios

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Imad Portfolio
```

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create a public storage bucket matching `SUPABASE_BUCKET`.
4. Use the service-role or secret server key for `SUPABASE_SERVICE_KEY`.
5. Seed the portfolio if needed:

```bash
npm run seed
```

## Vercel deployment

This repo is now configured to deploy to Vercel using the default Next.js runtime.

### Vercel dashboard steps

1. Push this repo to GitHub.
2. In Vercel, click `Add New...` -> `Project`.
3. Import this repository.
4. Keep the detected framework as `Next.js`.
5. Use the default install and build settings:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

6. Add the environment variables from `.env.example`.
7. Set these production values:

```env
NODE_ENV=production
NEXTAUTH_SECRET=generate-a-long-random-secret
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
ADMIN_NAME=Imaduddeen Khan
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-admin-password
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_BUCKET=portfolios
NEXT_PUBLIC_SITE_NAME=Imad Portfolio
```

8. Deploy.
9. After the first deploy, open `/api/health` and `/admin` to verify the app.
10. If you attach a custom domain, update both `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to that final HTTPS URL and redeploy.

### Vercel CLI commands

Install the CLI:

```bash
npm install -g vercel
```

Log in:

```bash
vercel login
```

Create the project and deploy a preview:

```bash
vercel
```

Promote to production:

```bash
vercel --prod
```

Pull remote env vars locally if needed:

```bash
vercel env pull .env.local
```

### Why these settings

- Vercel natively detects and builds Next.js App Router projects.
- The app no longer depends on a self-hosted standalone server entrypoint.
- `app/api/health/route.js` remains available for smoke checks after deploy.
- Node is pinned to major version 20 in `package.json`, which aligns with Vercel project settings.

## Production commands

Build locally:

```bash
npm run build
```

Run the production server locally:

```bash
npm start
```

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
