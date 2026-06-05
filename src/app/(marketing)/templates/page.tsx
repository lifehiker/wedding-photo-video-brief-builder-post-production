import type { Metadata } from "next";
import Link from "next/link";
import { SEO_TEMPLATES } from "@/lib/seo-templates";

export const metadata: Metadata = {
  title: "Wedding Editor Brief Templates",
  description:
    "Free wedding editor brief templates for photographers and videographers. Reel briefs, culling notes, Lightroom editing briefs, film editor handoffs, and more.",
};

export default function TemplatesPage() {
  return (
    <div className="py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-3">
            Wedding Editor Brief Templates
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Free, structured brief templates for every wedding post-production deliverable.
            Use them as guides or generate your own with BriefedWed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SEO_TEMPLATES.map((template) => (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className="group block border border-stone-200 rounded-xl p-5 hover:border-rose-300 hover:shadow-sm transition-all"
            >
              <h2 className="font-semibold text-stone-900 group-hover:text-rose-700 transition-colors mb-2">
                {template.title}
              </h2>
              <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
                {template.intro.slice(0, 150)}...
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-rose-600 font-medium">
                View template
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-600 mb-4">
            Want to generate a brief tailored to your specific wedding?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/free-brief-generator"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-sm font-medium transition-colors"
            >
              Try the free generator
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 text-sm font-medium transition-colors"
            >
              Create free account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
