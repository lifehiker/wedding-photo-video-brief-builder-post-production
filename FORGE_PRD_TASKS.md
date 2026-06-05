# FORGE PRD Tasks - BriefedWed

## Implementation Order

### 1. Foundation
- [x] Read `PRD.md` end-to-end.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end.
- [x] Read relevant installed Next.js 16 docs in `node_modules/next/dist/docs/` for App Router, `output: "standalone"`, and the `proxy.ts` convention.
- [x] Use system fonts only; no `next/font/google`.
- [x] Configure Next standalone output in `next.config.ts`.
- [x] Keep Stripe, Resend, and OpenAI initialization lazy and guarded.
- [x] Sync Prisma schema with `npx prisma db push`.

### 2. Data Model
- [x] User, Account, Session, VerificationToken models for auth.
- [x] User onboarding model for role, outsource state, and deliverable preferences.
- [x] Wedding project model with couple names, date, venue, brand, editor, notes, and status.
- [x] Vendor library and project-vendor join model.
- [x] Style guide model with editing, color, music, pacing, caption, and delivery defaults.
- [x] Brief model with type, structured form data, generated text, share token, status, and export count.
- [x] Subscription model with Stripe IDs, status, plan, price, and period end.
- [x] SQLite/Prisma local fallback database is usable without external credentials.

### 3. Auth
- [x] NextAuth v5 route handlers at `/api/auth/[...nextauth]`.
- [x] Credentials auth for local credential-free signup/login.
- [x] Guarded Google OAuth provider when `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are present.
- [x] Login page with optional Google button when `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true`.
- [x] Signup page with optional Google button and local account creation.
- [x] Protected app routes through Next 16 `src/proxy.ts`.
- [x] Account/settings page.
- [x] Free/unpaid account state through plan permissions.

### 4. Core Workflows
- [x] Dashboard with recent projects, plan state, and quick actions.
- [x] Project list with create action.
- [x] Project filters for all, draft, completed, and exported projects.
- [x] New project form with all required project setup fields.
- [x] Project detail page with project data, vendors, briefs, and actions.
- [x] Paid duplicate-project workflow copying project details, vendors, and brief templates.
- [x] Vendor library CRUD and reusable project association model.
- [x] Style guide CRUD with paid gating and default-style application in brief generation.
- [x] Deliverable selector for all 10 PRD brief types.
- [x] Server-side free-tier brief type gating for the 3 free brief types.
- [x] Structured brief forms for must-have moments, avoid moments, music, tone, style, audio, aspect ratio, target length, captions, vendor tags, deadline, and reference links.
- [x] Deterministic brief generation from structured fields without claiming footage/video analysis.
- [x] Editable generated brief preview.
- [x] Optional AI polish with OpenAI guard and deterministic fallback.
- [x] Export menu with copy, Markdown download, print/PDF, and share-link generation.
- [x] Export-count gating for free users.
- [x] Public share page by share token.
- [x] Public free brief generator that works without authentication.
- [x] Basic onboarding form for role, outsourcing, and deliverables.

### 5. API Routes And Server Actions
- [x] Signup action.
- [x] Project create/update/delete/duplicate actions.
- [x] Vendor create/update/delete actions.
- [x] Style guide create/update/delete actions.
- [x] Brief create/update/regenerate/delete/share/export actions.
- [x] `/api/briefs/[briefId]` for authenticated brief loading.
- [x] `/api/briefs/polish` for guarded AI polish.
- [x] `/api/briefs/record-export` for export counting.
- [x] `/api/vendors` and `/api/style-guides` read APIs.
- [x] `/api/user/permissions` for plan gating.
- [x] `/api/onboarding` for onboarding save.
- [x] Stripe checkout, portal, subscription, and webhook routes with safe missing-env responses.

### 6. Billing, Email, Storage, Analytics
- [x] Free plan: 1 saved project, 1 export, public generator, 3 basic brief types.
- [x] Solo plan: unlimited projects, all brief types, exports, style guides, vendors, share links, duplicates.
- [x] Studio plan: same implementation as paid with studio pricing and metadata.
- [x] One-off Stripe price support in pricing config.
- [x] Stripe checkout and webhook guarded by credentials.
- [x] Billing portal guarded by credentials.
- [x] Resend welcome email guarded by credentials and non-blocking on signup.
- [x] OpenAI polish guarded by credentials and no-network fallback.
- [x] Analytics wrapper for Plausible/PostHog globals with no-op fallback.
- [x] Local SQLite storage fallback; production persistence documented in `HUMAN_INPUT_NEEDED.md`.

### 7. Marketing And SEO
- [x] Marketing layout with header and footer.
- [x] Production homepage at `/` replacing the default Next template.
- [x] Pricing page for Free, Solo, Studio, and one-off pack.
- [x] Templates index page.
- [x] 10 SEO template pages at the PRD slugs.
- [x] Template pages include guidance, preview/example output, CTA, and FAQ schema.
- [x] Free brief generator page.
- [x] Sitemap including static pages and all template pages.
- [x] Robots file.
- [x] Root metadata and Open Graph/Twitter metadata.

### 8. Deployment
- [x] `next.config.ts` uses `output: "standalone"`.
- [x] Production `Dockerfile` added with multi-stage build.
- [x] Dockerfile copies only existing directories/files: `src`, `prisma`, `public`, and config files.
- [x] Dockerfile copies `.next/static`, `public`, and local SQLite fallback into standalone runtime.
- [x] Docker build attempted; blocked by host Docker daemon socket permission, documented in verification.
- [x] `HUMAN_INPUT_NEEDED.md` created for external credentials and production persistence.

### 9. Verification
- [x] `npx prisma db push` passes.
- [x] `npm run build` passes.
- [x] `npm run lint` passes.
- [x] Dev server starts successfully on `http://localhost:3001` when port 3000 is occupied.
- [x] Dev server starts successfully on `http://localhost:3000` after final changes.
- [x] Public route smoke tests pass for `/`, `/pricing`, `/templates`, and `/free-brief-generator`.
- [x] Protected route smoke tests confirm `/dashboard` and `/projects` redirect to `/login`.
- [x] Auth providers API responds with credentials locally and Google when configured.
- [x] Sitemap route responds.
- [x] Visual screenshots reviewed for homepage, pricing, and mobile free generator.
- [x] Playwright smoke test verifies the public generator can create a brief with configurable `BW_BASE_URL`.
- [x] `FORGE_COMPLETION_AUDIT.md` created.

## Remaining External-Credential Items

These are intentionally deferred because they require external accounts or secrets. The app still builds and runs without them through guarded local fallbacks.

- [ ] Google OAuth credentials for production login.
- [ ] Stripe keys, webhook secret, and price IDs for live billing.
- [ ] Resend API key and verified sending domain for production email.
- [ ] OpenAI API key for optional AI polish.
- [ ] Plausible/PostHog script installation for analytics collection.
- [ ] Production durable database/volume or PostgreSQL migration decision.
- [ ] Google Search Console domain verification and sitemap submission.
