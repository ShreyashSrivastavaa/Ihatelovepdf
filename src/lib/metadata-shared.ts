import { Metadata } from "next";
import { SITE_URL } from "./site";

export const METADATA_BASE = new URL(SITE_URL);

export const SHARED_ICONS = [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", type: "image/png", url: "/favicon.png" },
    { rel: "apple-touch-icon", url: "/apple-icon.png" },
];

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


