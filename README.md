# Imad Portfolio

Personal portfolio for Imaduddeen Khan with a full `/admin` editor, Supabase-backed content and uploads, project detail pages, theme studio, and Railway-ready deployment.

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

## Railway deployment

This repo is set up for Railway with:

- `next.config.mjs` using `output: "standalone"`
- `railway.toml` for build/start/healthcheck
- `app/api/health/route.js` for Railway health checks

### Railway dashboard steps

1. Push this repo to GitHub.
2. In Railway, click `New Project`.
3. Choose `Deploy from GitHub repo`.
4. Select this repository.
5. Add all env vars from `.env.example`.
6. Set these production values:

```env
NEXTAUTH_URL=https://your-app-name.up.railway.app
NEXT_PUBLIC_SITE_URL=https://your-app-name.up.railway.app
NODE_ENV=production
```

7. Deploy.
8. After first deploy, open `/api/health` and `/admin` to verify the app.

### Railway CLI commands

Install CLI:

```bash
npm install -g @railway/cli
```

Login and link project:

```bash
railway login
railway init
```

Set env vars:

```bash
railway variables set NEXTAUTH_SECRET=your-secret
railway variables set NEXTAUTH_URL=https://your-app-name.up.railway.app
railway variables set ADMIN_NAME="Imaduddeen Khan"
railway variables set ADMIN_EMAIL=imad@example.com
railway variables set ADMIN_PASSWORD=your-password
railway variables set SUPABASE_URL=https://your-project.supabase.co
railway variables set SUPABASE_SERVICE_KEY=your-service-role-key
railway variables set SUPABASE_BUCKET=portfolios
railway variables set NEXT_PUBLIC_SITE_URL=https://your-app-name.up.railway.app
railway variables set NEXT_PUBLIC_SITE_NAME="Imad Portfolio"
railway variables set NODE_ENV=production
```

Deploy:

```bash
railway up
```

Open logs:

```bash
railway logs
```

Open shell:

```bash
railway shell
```

## Production commands

Build locally:

```bash
npm run build
```

Run the same standalone server Railway uses:

```bash
npm run start:standalone
```

## Removed unnecessary files

These Docker-only files were removed because Railway does not need them for this setup:

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
