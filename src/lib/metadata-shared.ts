import { Metadata } from "next";

export const METADATA_BASE = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ihatelovepdf.vercel.app");

export const SHARED_ICONS = [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
];

export const SHARED_OPEN_GRAPH: Metadata["openGraph"] = {
    images: [
        {
            url: "https://ihatelovepdf.com/og-images/og-image-es.png",
            width: 1409,
            height: 736,
            alt: "ihatelovepdf - Procesamiento de PDFs privado y gratuito"
        }
    ],
};

export const SHARED_TWITTER: Metadata["twitter"] = {
    card: "summary_large_image",
};
