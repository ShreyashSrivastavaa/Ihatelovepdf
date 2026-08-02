import { Metadata } from "next";
import { SITE_URL } from "./site";

export const METADATA_BASE = new URL(SITE_URL);

export const SHARED_ICONS = [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
];

export const SHARED_OPEN_GRAPH: Metadata["openGraph"] = {
    images: [
        {
            url: `${SITE_URL}/og-images/og-image-es.png`,
            width: 1409,
            height: 736,
            alt: "ihatelovepdf - Private & Free PDF Tools"
        }
    ],
};

export const SHARED_TWITTER: Metadata["twitter"] = {
    card: "summary_large_image",
};

export const SHARED_AUTHORS = [{ name: "Shreyash Srivastava", url: SITE_URL }];
export const SHARED_CREATOR = "Shreyash Srivastava";
export const SHARED_PUBLISHER = "Shreyash Srivastava";


