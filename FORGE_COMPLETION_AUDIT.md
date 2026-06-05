# FORGE Completion Audit - BriefedWed

## Foundation
- Next.js App Router implementation: `src/app/**`
- Next 16 proxy route protection: `src/proxy.ts`
- Standalone build config: `next.config.ts`
- System-font root layout and metadata: `src/app/layout.tsx`
- No `next/font/google` usage found.

## Data Model
- Prisma schema: `prisma/schema.prisma`
- Prisma config: `prisma.config.ts`
- Database client with SQLite fallback: `src/lib/db.ts`
- Models cover users/accounts/sessions, onboarding, projects, vendors, project vendors, style guides, briefs, and subscriptions.

## Auth
- NextAuth config with credentials and guarded Google OAuth: `src/auth.ts`
- Auth route: `src/app/api/auth/[...nextauth]/route.ts`
- Signup action and welcome-email trigger: `src/app/signup/actions.ts`
- Login UI: `src/app/login/page.tsx`
- Signup UI: `src/app/signup/page.tsx`
- Protected app routes: `src/proxy.ts`
- Account page: `src/app/(app)/settings/page.tsx`

## App Pages
- App shell/sidebar: `src/app/(app)/layout.tsx`, `src/components/app/AppSidebar.tsx`
- Dashboard: `src/app/(app)/dashboard/page.tsx`
- Projects list/filtering: `src/app/(app)/projects/page.tsx`
- New project: `src/app/(app)/projects/new/page.tsx`
- Project detail: `src/app/(app)/projects/[projectId]/page.tsx`
- New brief: `src/app/(app)/projects/[projectId]/briefs/new/page.tsx`
- Brief editor/export page: `src/app/(app)/projects/[projectId]/briefs/[briefId]/page.tsx`
- Vendors: `src/app/(app)/vendors/page.tsx`
- Style guides: `src/app/(app)/style-guides/page.tsx`
- Onboarding: `src/app/(app)/onboarding/page.tsx`
- Billing: `src/app/(app)/billing/page.tsx`
- Public share page: `src/app/share/[shareToken]/page.tsx`

## Core Components And Workflows
- Project cards: `src/components/app/ProjectCard.tsx`
- Brief type selector with free/paid locking: `src/components/app/BriefTypeSelector.tsx`
- Accessible structured brief form: `src/components/app/BriefForm.tsx`
- Editable brief preview: `src/components/app/BriefPreview.tsx`
- Export menu for copy, Markdown, print/PDF, and share links: `src/components/app/ExportMenu.tsx`
- Upgrade dialog: `src/components/app/UpgradeDialog.tsx`
- Vendor form: `src/components/app/VendorForm.tsx`
- Style guide form: `src/components/app/StyleGuideForm.tsx`

## Brief Generation
- All 10 brief type definitions and free brief list: `src/lib/brief-templates.ts`
- Deterministic brief generation: `src/lib/generate-brief.ts`
- Optional guarded AI polish route: `src/app/api/briefs/polish/route.ts`
- Server-side paid brief-type enforcement: `src/app/(app)/projects/[projectId]/briefs/actions.ts`

## Server Actions And APIs
- Project CRUD, vendor linking, paid duplication: `src/app/(app)/projects/actions.ts`
- Brief CRUD, regeneration, share links, export counts: `src/app/(app)/projects/[projectId]/briefs/actions.ts`
- Vendor CRUD: `src/app/(app)/vendors/actions.ts`
- Style guide CRUD and paid gating: `src/app/(app)/style-guides/actions.ts`
- Brief read API: `src/app/api/briefs/[briefId]/route.ts`
- Export recording API: `src/app/api/briefs/record-export/route.ts`
- User permissions API: `src/app/api/user/permissions/route.ts`
- Vendors/style guides read APIs: `src/app/api/vendors/route.ts`, `src/app/api/style-guides/route.ts`
- Onboarding API: `src/app/api/onboarding/route.ts`

## Billing, Email, Analytics
- Plan permission logic: `src/lib/permissions.ts`
- Stripe lazy initialization and price config: `src/lib/stripe.ts`
- Checkout route: `src/app/api/stripe/checkout/route.ts`
- Portal route: `src/app/api/stripe/portal/route.ts`
- Subscription read route: `src/app/api/billing/subscription/route.ts`
- Stripe webhook route: `src/app/api/webhooks/stripe/route.ts`
- Resend lazy initialization and fallback: `src/lib/resend.ts`
- Welcome email HTML helper: `src/emails/WelcomeEmail.tsx`
- Plausible/PostHog wrapper with no-op fallback: `src/lib/analytics.ts`

## Marketing And SEO
- Homepage: `src/app/(marketing)/page.tsx`
- Marketing layout/header/footer: `src/app/(marketing)/layout.tsx`, `src/components/marketing/Header.tsx`, `src/components/marketing/Footer.tsx`
- Pricing page: `src/app/(marketing)/pricing/page.tsx`
- Templates index: `src/app/(marketing)/templates/page.tsx`
- 10 template pages: `src/app/(marketing)/templates/[slug]/page.tsx`, `src/lib/seo-templates.ts`
- Free generator: `src/app/(marketing)/free-brief-generator/page.tsx`
- Template CTA: `src/components/marketing/TemplateCta.tsx`
- Sitemap and robots: `src/app/sitemap.ts`, `src/app/robots.ts`

## Deployment
- Standalone output: `next.config.ts`
- Dockerfile: `Dockerfile`
- Human credential/deployment notes: `HUMAN_INPUT_NEEDED.md`

## Verification Results
- `npx prisma db push`: passed.
- `npm run build`: passed after final changes.
- `npm run lint`: passed after final changes.
- Dev server: started successfully on `http://localhost:3001` when port 3000 was occupied, and on `http://localhost:3000` after final changes.
- Route smoke tests: `/`, `/pricing`, `/templates`, `/free-brief-generator` returned 200.
- Protected route smoke tests: `/dashboard` and `/projects` returned 307 redirects to `/login`.
- Auth provider smoke test: `/api/auth/providers` returned credentials locally; Google appears when production env is configured.
- Visual review: screenshots captured and reviewed for homepage, pricing, and mobile free generator. The default Next template page was found and removed.
- Browser interaction: `BW_BASE_URL=http://localhost:3000 npx playwright test tests/free-generator.spec.ts --browser=chromium --reporter=line` passed, validating public brief generation.
- Docker: `docker build .` was attempted, but the environment denied access to `/var/run/docker.sock`. Dockerfile syntax and file-copy scope were reviewed; runtime database ownership was corrected for the non-root user.

## Intentionally Deferred External Items
- Google OAuth requires Google Cloud OAuth credentials. Local credentials auth remains available.
- Stripe requires secret key, webhook secret, and price IDs. Billing routes return safe missing-env responses.
- Resend requires an API key and verified domain. Signup does not fail if email is unavailable.
- OpenAI polish requires an API key. Without it, the route returns the deterministic brief unchanged.
- Analytics collection requires adding a Plausible or PostHog browser script. The wrapper is a no-op until one is present.
- Durable production storage requires a mounted SQLite volume or a PostgreSQL migration. The bundled SQLite fallback lets the app run without external database credentials.
