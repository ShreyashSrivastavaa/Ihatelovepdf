import Script from "next/script";

export function SchemaOrg() {
    const schema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        "name": "ihatelovepdf",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All modern web browsers (Windows, macOS, Linux, Android, iOS)",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "description": "Free and 100% private browser-based PDF toolkit. Merge, Compress, Split, Extract, Crop, Rotate, Reorder, PDF to Image, and Image to PDF with zero file uploads.",
        "url": "https://ihatelovepdf.com",
        "softwareVersion": "1.0.0",
        "applicationSubCategory": "PDF Processing Toolkit",
        "browserRequirements": "Requires WebAssembly & JavaScript in modern browsers",
        "keywords": "merge pdf, compress pdf, split pdf, extract pdf pages, rotate pdf, crop pdf, pdf to jpg, jpg to pdf, free online pdf tools, private pdf converter",
        "featureList": [
            "100% Private Local Browser Processing",
            "Zero File Uploads to External Servers",
            "Merge PDF Files",
            "Compress PDF Files",
            "Split PDF Documents",
            "Extract Specific PDF Pages",
            "Crop PDF Page Dimensions",
            "Rotate PDF Pages",
            "Reorder & Organize PDF Pages",
            "Convert PDF to JPG / PNG Images",
            "Convert JPG / PNG Images to PDF"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        },
        "author": {
            "@type": "Person",
            "name": "Shreyash Srivastava",
            "jobTitle": "Creator & Lead Engineer",
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
