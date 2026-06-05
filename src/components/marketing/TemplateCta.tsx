import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TemplateCtaProps {
  briefType?: string;
  ctaText?: string;
}

export function TemplateCta({ ctaText = "Generate Your Free Brief" }: TemplateCtaProps) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 sm:p-8 text-center my-10">
      <h3 className="text-xl font-semibold text-stone-900 mb-2">
        Ready to build your brief?
      </h3>
      <p className="text-stone-600 mb-6 max-w-lg mx-auto">
        Generate a structured, professional editor brief in minutes. Free to try — no credit card required.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild size="lg" className="bg-rose-700 hover:bg-rose-800 text-white">
          <Link href="/free-brief-generator">{ctaText}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/signup">Create free account</Link>
        </Button>
      </div>
    </div>
  );
}
