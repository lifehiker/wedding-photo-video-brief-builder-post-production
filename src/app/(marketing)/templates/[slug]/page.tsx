import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSeoTemplate, getAllSeoTemplateSlugs } from "@/lib/seo-templates";
import { TemplateCta } from "@/components/marketing/TemplateCta";

export async function generateStaticParams() {
  return getAllSeoTemplateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getSeoTemplate(slug);
  if (!template) return {};
  return {
    title: template.metaTitle,
    description: template.metaDescription,
  };
}

export default async function TemplateSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getSeoTemplate(slug);
  if (!template) notFound();

  return (
    <article className="py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-stone-500 mb-6">
          <Link href="/templates" className="hover:text-stone-700">Templates</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-700">{template.title}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          {template.h1}
        </h1>

        <div className="bg-rose-50 border border-rose-200 rounded-lg px-4 py-2.5 mb-6 inline-block">
          <p className="text-xs text-rose-600 font-medium">
            Target keyword: {template.targetKeyword}
          </p>
        </div>

        <p className="text-lg text-stone-600 leading-relaxed mb-10">
          {template.intro}
        </p>

        {/* When to use */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            When to use this template
          </h2>
          <ul className="space-y-2">
            {template.whenToUse.map((item) => (
              <li key={item} className="flex gap-2 text-stone-600">
                <span className="text-rose-400 shrink-0 mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What to include */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            What to include
          </h2>
          <ol className="space-y-2 list-decimal list-inside">
            {template.whatToInclude.map((item) => (
              <li key={item} className="text-stone-600 leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <TemplateCta briefType={template.ctaBriefType} ctaText={template.ctaText} />

        {/* Example excerpt */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            Example brief excerpt
          </h2>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 overflow-auto">
            <pre className="text-sm text-stone-700 whitespace-pre-wrap font-mono leading-relaxed">
              {template.exampleExcerpt}
            </pre>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {template.faqItems.map((item) => (
              <div key={item.q} className="border border-stone-200 rounded-lg p-4">
                <h3 className="font-semibold text-stone-900 mb-2">{item.q}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="border-t border-stone-200 pt-8 text-center">
          <h2 className="text-xl font-bold text-stone-900 mb-2">
            Ready to generate your brief?
          </h2>
          <p className="text-stone-600 mb-4 text-sm">
            BriefedWed generates a complete, structured editor brief from your inputs.
            No blank page, no guessing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/free-brief-generator"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-sm font-medium transition-colors"
            >
              {template.ctaText}
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
    </article>
  );
}
