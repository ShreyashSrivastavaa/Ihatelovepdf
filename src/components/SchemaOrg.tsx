import Script from "next/script";

export function SchemaOrg() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ihatelovepdf",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
        },
        "description": "Free and private PDF tools: Merge, Compress, Split, Extract, Reorder, PDF to Image, and Image to PDF. 100% local processing.",
        "url": "https://ihatelovepdf.com",
        "softwareVersion": "1.0.0",
        "applicationSubCategory": "PDF Tools & Utilities",
        "browserRequirements": "Requires JavaScript and a modern web browser",
        "keywords": "merge pdf, compress pdf, split pdf, extract pdf pages, rotate pdf, crop pdf, pdf to jpg, jpg to pdf, free online pdf tools",
        "featureList": [
            "Merge PDF",
            "Compress PDF",
            "Split PDF",
            "Extract Pages",
            "Crop Pages",
            "Rotate Pages",
            "Reorder Pages",
            "PDF to Image",
            "Image to PDF"
        ],
        "author": {
            "@type": "Person",
            "name": "Shreyash Srivastava (UTS — UPSCALE TECH SOLUTION)",
            "jobTitle": "Creator & Lead Developer",
            "url": "https://shreyashsrivastava.vercel.app/",
            "sameAs": [
                "https://github.com/ShreyashSrivastavaa",
                "https://shreyashsrivastava.vercel.app/"
            ]
        },
        "creator": {
            "@type": "Organization",
            "name": "UTS — UPSCALE TECH SOLUTION",
            "email": "upscaletechsolution@gmail.com",
            "url": "https://shreyashsrivastava.vercel.app/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "UTS — UPSCALE TECH SOLUTION",
            "email": "upscaletechsolution@gmail.com"
        }
    };

    return (
        <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
