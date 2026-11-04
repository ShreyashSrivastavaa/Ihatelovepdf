import { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/"],
        disallow: ["/api/", "/scratch/"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-SearchBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Meta-ExternalAgent",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/", "/scratch/"],
      },
    ],
    sitemap: "https://www.ihatelovepdf.com/sitemap.xml",
  };
}
