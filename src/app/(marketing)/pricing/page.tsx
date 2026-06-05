import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for BriefedWed. Free to start. Solo at $39/mo. Studio at $79/mo.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Try BriefedWed and generate your first wedding brief at no cost.",
    features: [
      "1 saved wedding project",
      "1 export",
      "3 brief types (Wedding Film, Reel, Culling)",
      "Free brief generator (no account)",
      "Copy to clipboard",
    ],
    cta: "Get started free",
    ctaHref: "/signup",
    featured: false,
  },
  {
    name: "Solo",
    monthly: "$39",
    yearly: "$390",
    description: "For solo wedding photographers and videographers.",
    features: [
      "Unlimited wedding projects",
      "All 10 brief types",
      "Unlimited exports",
      "Saved style guide",
      "Reusable vendor library",
      "Share links",
      "PDF / Markdown / plain text export",
      "Duplicate projects as templates",
    ],
    cta: "Start Solo plan",
    ctaHref: "/signup",
    featured: true,
  },
  {
    name: "Studio",
    monthly: "$79",
    yearly: "$790",
    description: "For small studios and teams with multiple editors.",
    features: [
      "Everything in Solo",
      "Multiple brand / style guides",
      "Multiple editor profiles",
      "Team share links",
      "Studio-wide vendor library",
      "Brief history & versioning",
      "Priority support",
    ],
    cta: "Start Studio plan",
    ctaHref: "/signup",
    featured: false,
  },
];

const oneOff = {
  name: "One-off Pack",
  price: "$15",
  description: "Generate and export one complete wedding brief pack. No subscription needed.",
  features: [
    "Full film or photo editing brief",
    "Social cut brief",
    "Vendor deliverables checklist",
    "All export formats",
  ],
};

const faq = [
  {
    q: "Can I try BriefedWed for free?",
    a: "Yes. The free plan lets you create one project, generate briefs, and export once. The free generator at /free-brief-generator works without any account.",
  },
  {
    q: "What's included in the one-off pack?",
    a: "The $15 one-off pack lets you generate and export a single wedding brief pack — a full film or photo editing brief, a social cut brief, and a vendor deliverables checklist. No monthly commitment.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. Cancel anytime from your billing page. You keep access until the end of your billing period.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes. Annual billing saves you approximately 2 months: Solo at $390/year ($32.50/mo equivalent), Studio at $790/year ($65.83/mo equivalent).",
  },
  {
    q: "What brief types are available on the free plan?",
    a: "Free users can access Wedding Film, Instagram Reel, and Photo Culling brief types. All 10 brief types are available on Solo and Studio plans.",
  },
  {
    q: "Do I need an account to use the free generator?",
    a: "No. The free generator at /free-brief-generator works without an account. You need an account to save projects, export, and use style guides.",
  },
];

export default function PricingPage() {
  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-stone-900 mb-3">Simple pricing</h1>
          <p className="text-lg text-stone-600">
            Start free. Upgrade when you need unlimited projects and exports.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col ${
                plan.featured
                  ? "border-rose-500 ring-1 ring-rose-500 shadow-md"
                  : "border-stone-200"
              }`}
            >
              {plan.featured && (
                <span className="text-xs font-semibold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full w-fit mb-3">
                  Most popular
                </span>
              )}
              <h2 className="text-xl font-bold text-stone-900 mb-1">{plan.name}</h2>
              <div className="mb-2">
                {plan.price ? (
                  <span className="text-3xl font-bold text-stone-900">{plan.price}</span>
                ) : (
                  <div className="space-y-0.5">
                    <div>
                      <span className="text-3xl font-bold text-stone-900">{plan.monthly}</span>
                      <span className="text-stone-500 text-sm">/mo</span>
                    </div>
                    <div className="text-sm text-stone-500">
                      or {plan.yearly}/yr (save 2 months)
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-stone-600 mb-5">{plan.description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-stone-600">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={plan.featured ? "bg-rose-700 hover:bg-rose-800 text-white" : ""}
                variant={plan.featured ? "default" : "outline"}
              >
                <Link href={plan.ctaHref}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* One-off */}
        <div className="border border-stone-200 rounded-xl p-6 mb-14 bg-stone-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-stone-900 mb-1">
                {oneOff.name} — {oneOff.price} one-time
              </h2>
              <p className="text-sm text-stone-600 mb-3">{oneOff.description}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {oneOff.features.map((f) => (
                  <li key={f} className="flex gap-1 text-xs text-stone-500">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/signup">Buy one-off pack</Link>
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {faq.map((item) => (
              <div key={item.q} className="border border-stone-200 rounded-lg p-4">
                <h3 className="font-semibold text-stone-900 mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
