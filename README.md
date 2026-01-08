# Baseline

Single-app Next.js (App Router) starter with Prisma, PostgreSQL, and magic-link auth.

## Requirements

- Node.js 18+
- Docker + Docker Compose

## Getting started

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Start Postgres + MailHog:

   ```bash
   docker compose up -d
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run migrations:

   ```bash
   npm run prisma:migrate
   ```

5. (Optional) Seed the pilot workspace:

   ```bash
   SEED_ADMIN_EMAIL=you@domain.com npm run prisma:seed
   ```

6. Start the app:

   ```bash
   npm run dev
   ```

Visit http://localhost:3000.

## Prisma commands

- Generate client: `npm run prisma:generate`
- Run migrations: `npm run prisma:migrate`
- Open Studio: `npm run prisma:studio`
- Run seed: `npm run prisma:seed`

## Magic link login (local)

1. Ensure MailHog is running via `docker compose up -d`.
2. Open the MailHog UI at http://localhost:8025.
3. Navigate to http://localhost:3000/auth/signin and request a magic link.
4. Open the email in MailHog and click the sign-in link.

## Workspace admin route

After seeding, visit `/w/ra24/admin` while signed in with the seeded email to see the workspace admin page.
