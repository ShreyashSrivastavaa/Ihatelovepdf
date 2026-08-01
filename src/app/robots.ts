import { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

export const dynamic = "force-static";
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/",
            ],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}

