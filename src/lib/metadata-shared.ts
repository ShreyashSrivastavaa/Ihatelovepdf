import { Metadata } from "next";
import { SITE_URL } from "./site";

export const METADATA_BASE = new URL(SITE_URL);

export const SHARED_ICONS: Metadata["icons"] = {
    icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "48x48" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
};

export const SHARED_OPEN_GRAPH: Metadata["openGraph"] = {
    images: [
        {
            url: `${SITE_URL}/og-image.png`,
            width: 1200,
            height: 630,
            alt: "ihatelovepdf - Private & Free PDF Tools"
        }
    ],
};

export const SHARED_TWITTER: Metadata["twitter"] = {
    card: "summary_large_image",
    images: [`${SITE_URL}/og-image.png`],
};

export const SHARED_AUTHORS = [{ name: "Shreyash Srivastava", url: SITE_URL }];
export const SHARED_CREATOR = "Shreyash Srivastava";
export const SHARED_PUBLISHER = "Shreyash Srivastava";
export const WEBSITE_LAUNCHES_VERIFICATION = "714e3c091b00f4a86f93e6be17c060fc";



