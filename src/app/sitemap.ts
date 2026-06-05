import { MetadataRoute } from "next";
import { getAllSeoTemplateSlugs } from "@/lib/seo-templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://briefedwed.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: appUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${appUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${appUrl}/templates`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${appUrl}/free-brief-generator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const templateRoutes: MetadataRoute.Sitemap = getAllSeoTemplateSlugs().map((slug) => ({
    url: `${appUrl}/templates/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...templateRoutes];
}
