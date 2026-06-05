import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BriefedWed — Wedding Editor Brief Generator",
    template: "%s | BriefedWed",
  },
  description:
    "Create wedding photo and video editing briefs for outsourced editors, Reels, TikToks, sneak peeks, culling, Lightroom edits, and vendor deliverables.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://briefedwed.com"
  ),
  openGraph: {
    type: "website",
    title: "BriefedWed — Wedding Editor Brief Generator",
    description:
      "Turn wedding notes into structured editor briefs for outsourced editing, social clips, culling, and vendor deliverables.",
    siteName: "BriefedWed",
  },
  twitter: {
    card: "summary",
    title: "BriefedWed — Wedding Editor Brief Generator",
    description:
      "Turn wedding notes into structured editor briefs for outsourced editing, social clips, culling, and vendor deliverables.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-white text-stone-900"
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
