# Human Input Needed

The app runs locally without external credentials by using email/password auth, SQLite, deterministic brief generation, no-op analytics, and guarded billing/email/AI fallbacks.

Provide these values for production features:

- `AUTH_SECRET`: A strong random secret for NextAuth sessions.
- `NEXT_PUBLIC_APP_URL`: Public app URL, for example `https://briefedwed.com`.
- Google OAuth: set `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, and `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true`. Add `/api/auth/callback/google` as an authorized callback path in Google Cloud.
- Stripe billing: set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and price IDs for `STRIPE_PRICE_SOLO_MONTHLY`, `STRIPE_PRICE_SOLO_YEARLY`, `STRIPE_PRICE_STUDIO_MONTHLY`, `STRIPE_PRICE_STUDIO_YEARLY`, and optionally `STRIPE_PRICE_ONE_OFF`.
- Resend email: set `RESEND_API_KEY` and verify the sending domain used for `noreply@briefedwed.com`.
- AI polish: set `OPENAI_API_KEY` to enable the optional brief-polishing endpoint. Without it, the endpoint returns the existing generated text unchanged.
- Analytics: add Plausible or PostHog scripts in production if event collection is desired. The client event wrapper already detects either global.
- Production database: this build uses SQLite through Prisma for a credential-free runnable app. For persistent production use, mount a durable SQLite volume at the path in `DATABASE_URL` or migrate the schema/provider to PostgreSQL and run Prisma setup against that database.
- Google Search Console: verify the production domain and submit `/sitemap.xml`.
