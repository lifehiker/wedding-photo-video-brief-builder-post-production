import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://briefedwed.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/templates", "/free-brief-generator"],
        disallow: ["/dashboard", "/projects", "/vendors", "/style-guides", "/billing", "/settings", "/onboarding", "/share/"],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
