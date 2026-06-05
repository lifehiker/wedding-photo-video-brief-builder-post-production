export async function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  const { default: Stripe } = await import("stripe");
  return new Stripe(key, { apiVersion: "2026-05-27.dahlia" });
}

export const STRIPE_PRICES = {
  SOLO_MONTHLY: process.env.STRIPE_PRICE_SOLO_MONTHLY ?? "",
  SOLO_YEARLY: process.env.STRIPE_PRICE_SOLO_YEARLY ?? "",
  STUDIO_MONTHLY: process.env.STRIPE_PRICE_STUDIO_MONTHLY ?? "",
  STUDIO_YEARLY: process.env.STRIPE_PRICE_STUDIO_YEARLY ?? "",
  ONE_OFF: process.env.STRIPE_PRICE_ONE_OFF ?? "",
} as const;

export const PLAN_DETAILS = [
  {
    id: "solo_monthly",
    name: "Solo",
    price: 39,
    interval: "month" as const,
    priceId: STRIPE_PRICES.SOLO_MONTHLY,
    features: [
      "Unlimited wedding projects",
      "All 10 brief types",
      "Unlimited exports",
      "Saved style guide",
      "Reusable vendor library",
      "Share links",
      "PDF / Markdown export",
      "Duplicate projects",
    ],
  },
  {
    id: "solo_yearly",
    name: "Solo",
    price: 390,
    interval: "year" as const,
    priceId: STRIPE_PRICES.SOLO_YEARLY,
    features: [
      "Everything in Solo Monthly",
      "2 months free",
    ],
  },
  {
    id: "studio_monthly",
    name: "Studio",
    price: 79,
    interval: "month" as const,
    priceId: STRIPE_PRICES.STUDIO_MONTHLY,
    features: [
      "Everything in Solo",
      "Multiple brands / style guides",
      "Multiple editor profiles",
      "Team share links",
      "Studio-wide vendor library",
      "Priority support",
      "Brief history & versioning",
    ],
  },
  {
    id: "studio_yearly",
    name: "Studio",
    price: 790,
    interval: "year" as const,
    priceId: STRIPE_PRICES.STUDIO_YEARLY,
    features: [
      "Everything in Studio Monthly",
      "2 months free",
    ],
  },
  {
    id: "one_off",
    name: "One-off Pack",
    price: 15,
    interval: "one_time" as const,
    priceId: STRIPE_PRICES.ONE_OFF,
    features: [
      "Generate & export one wedding brief pack",
      "Full film or photo editing brief",
      "Social cut brief",
      "Vendor deliverables checklist",
    ],
  },
];
