import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TemplateCta } from "@/components/marketing/TemplateCta";

const briefTypes = [
  { icon: "🎬", label: "Full Wedding Film", desc: "Complete editor brief with must-have moments, music, pacing, and delivery specs." },
  { icon: "✨", label: "Highlight Film", desc: "Cinematic 3–8 min highlight brief with opening shot, music direction, and vendor tags." },
  { icon: "📱", label: "Instagram Reel", desc: "Hook, moments, beat-sync pacing, caption notes, and vendor tags in one brief." },
  { icon: "🎵", label: "TikTok", desc: "Scroll-stopping hook, trending audio direction, and platform-specific text overlays." },
  { icon: "⚡", label: "Sneak Peek", desc: "48-hour teaser brief with top clips, music, aspect ratio, and deadline locked in." },
  { icon: "📸", label: "Photo Culling", desc: "Coverage priority, must-include shots, burst handling, and delivery count." },
  { icon: "🎨", label: "Lightroom Editing", desc: "Preset, color science, skin tones, tricky lighting, and export specs in one doc." },
  { icon: "🤝", label: "Vendor Promo Clips", desc: "Per-vendor clip briefs with Instagram handles, featured moments, and aspect ratio." },
];

const steps = [
  { step: "1", title: "Create a wedding project", desc: "Add couple names, wedding date, venue, and editor details." },
  { step: "2", title: "Select your brief type", desc: "Choose from 10 brief types: full film, Reel, TikTok, culling, Lightroom, and more." },
  { step: "3", title: "Fill in the fields", desc: "Must-have moments, music direction, vendor tags, pacing — no guessing required." },
  { step: "4", title: "Export and share", desc: "Copy, download Markdown, print as PDF, or send a direct share link to your editor." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-50 to-white pt-20 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-rose-50 text-rose-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            For wedding photographers &amp; videographers
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">
            Stop writing editor briefs from scratch for every wedding
          </h1>
          <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            BriefedWed turns your wedding notes into structured, exportable post-production briefs
            for outsourced editors, social content contractors, and internal assistants.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-rose-700 hover:bg-rose-800 text-white text-base px-8">
              <Link href="/signup">Get started free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link href="/free-brief-generator">Try the free generator</Link>
            </Button>
          </div>
          <p className="text-sm text-stone-400 mt-4">Free to try — no credit card required</p>
        </div>
      </section>

      {/* Brief types */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">
              Every deliverable, covered
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              10 structured brief types built for real wedding post-production workflows.
              From full films to 30-second TikToks.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {briefTypes.map((type) => (
              <div
                key={type.label}
                className="p-5 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors"
              >
                <div className="text-2xl mb-3">{type.icon}</div>
                <h3 className="font-semibold text-stone-900 mb-1 text-sm">{type.label}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">How it works</h2>
            <p className="text-stone-600">
              From wedding notes to polished editor brief in under 10 minutes.
            </p>
          </div>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">{step.title}</h3>
                  <p className="text-stone-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/solution */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">The problem</h2>
              <ul className="space-y-3">
                {[
                  "Editor notes scattered across texts, Apple Notes, and email threads",
                  "Vendor tags copied one-by-one from Instagram every wedding",
                  "Writing Reel briefs from scratch for every couple",
                  "Revision rounds from unclear must-have moments or music direction",
                  "Sneak peek briefs missing deadlines and format specs",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-stone-600">
                    <span className="text-rose-400 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">What BriefedWed does</h2>
              <ul className="space-y-3">
                {[
                  "Structured form fields specific to each deliverable type",
                  "Reusable vendor library — add once, use across every wedding",
                  "Saved style guides pre-fill your color, music, and pacing preferences",
                  "Generated briefs cover every field your editor needs — no gaps",
                  "Export via clipboard, Markdown, PDF, or direct editor share link",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-stone-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 px-4 sm:px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-3">Simple pricing</h2>
          <p className="text-stone-600 mb-10">Start free. Upgrade when you need unlimited projects and exports.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              {
                name: "Free",
                price: "$0",
                features: ["1 project", "1 export", "3 brief types", "Free generator"],
              },
              {
                name: "Solo",
                price: "$39/mo",
                featured: true,
                features: ["Unlimited projects", "All 10 brief types", "Unlimited exports", "Saved style guide", "Share links"],
              },
              {
                name: "Studio",
                price: "$79/mo",
                features: ["Everything in Solo", "Multiple brands", "Team share links", "Studio vendor library", "Priority support"],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`p-6 rounded-xl border ${tier.featured ? "border-rose-500 ring-1 ring-rose-500 bg-white" : "border-stone-200 bg-white"}`}
              >
                <h3 className="font-bold text-stone-900 mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-stone-900 mb-4">{tier.price}</p>
                <ul className="space-y-1.5">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-stone-600 flex gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-8 bg-rose-700 hover:bg-rose-800 text-white">
            <Link href="/pricing">View full pricing</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <TemplateCta ctaText="Build your first brief for free" />
        </div>
      </section>
    </div>
  );
}
