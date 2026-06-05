import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-semibold text-stone-900">BriefedWed</span>
            <p className="mt-2 text-sm text-stone-500 leading-relaxed">
              Wedding post-production briefs for photographers and videographers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-3">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="text-sm text-stone-500 hover:text-stone-700">Pricing</Link></li>
              <li><Link href="/free-brief-generator" className="text-sm text-stone-500 hover:text-stone-700">Free Generator</Link></li>
              <li><Link href="/templates" className="text-sm text-stone-500 hover:text-stone-700">Templates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-3">Templates</h3>
            <ul className="space-y-2">
              <li><Link href="/templates/wedding-film-editor-brief-template" className="text-sm text-stone-500 hover:text-stone-700">Wedding Film Brief</Link></li>
              <li><Link href="/templates/wedding-videography-reel-brief-template" className="text-sm text-stone-500 hover:text-stone-700">Reel Brief</Link></li>
              <li><Link href="/templates/lightroom-editing-brief-for-wedding-photographers" className="text-sm text-stone-500 hover:text-stone-700">Lightroom Brief</Link></li>
              <li><Link href="/templates/wedding-photographer-culling-notes-template" className="text-sm text-stone-500 hover:text-stone-700">Culling Notes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-3">Account</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-sm text-stone-500 hover:text-stone-700">Sign in</Link></li>
              <li><Link href="/signup" className="text-sm text-stone-500 hover:text-stone-700">Create account</Link></li>
              <li><Link href="/dashboard" className="text-sm text-stone-500 hover:text-stone-700">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-stone-400">
            &copy; {new Date().getFullYear()} BriefedWed. All rights reserved.
          </p>
          <p className="text-xs text-stone-400">
            Built for wedding photographers &amp; videographers.
          </p>
        </div>
      </div>
    </footer>
  );
}
