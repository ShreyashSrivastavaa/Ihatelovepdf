import Script from "next/script";

export function SchemaOrg() {
    const softwareSchema = {
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
        "description": "Free and 100% private browser-based PDF toolkit. Merge, Compress, Split, Extract, Crop, Rotate, Reorder, Redact, OCR, Convert, and Protect PDFs with zero file uploads.",
        "url": "https://ihatelovepdf.com",
        "softwareVersion": "1.2.0",
        "applicationSubCategory": "PDF Processing Toolkit",
        "browserRequirements": "Requires WebAssembly & JavaScript in modern browsers",
        "keywords": "merge pdf, compress pdf, split pdf, redact pdf, offline ocr pdf, pdf to excel, word to pdf, crop pdf, rotate pdf, private pdf converter, client-side pdf tools",
        "featureList": [
            "100% Private Local Browser Processing",
            "Zero File Uploads to External Servers",
            "Merge Unlimited PDF Files",
            "Extreme Lossless & High-Ratio PDF Compression",
            "Split PDF Documents by Page Range",
            "Visual Page Crop & Margin Trimming",
            "Permanent Black-Box Redaction & Sanitization",
            "WebAssembly OCR Text Recognition (100+ Languages)",
            "Convert PDF to Images, Excel, PowerPoint, HTML, EPUB",
            "Convert Office Documents, Images, Markdown & HTML to PDF",
            "Extract Plain & Structured Text",
            "Add Custom Watermarks, Page Numbers, Headers & Footers",
            "Visual Document Compare & Corruption Repair",
            "Client-Side Camera Scanner with Perspective Correction",
            "TextRank AI Document Summarizer & Offline Chat"
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

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ihatelovepdf",
        "url": "https://ihatelovepdf.com",
        "description": "Powerful, Private & Free PDF Tools running 100% in your browser.",
        "inLanguage": ["en", "es", "pt", "de", "fr", "hu", "it", "ro", "ru"],
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://ihatelovepdf.com/tools?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <Script
                id="schema-org-software"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <Script
                id="schema-org-website"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
}
