import { siteConfig } from "@/lib/site-config";

interface SchemaMarkupProps {
    type: "SoftwareApplication" | "BreadcrumbList" | "BlogPosting" | "FAQPage";
    data?: any;
    // Keeping old props for backward compatibility
    name?: string;
    description?: string;
    applicationCategory?: string;
    operatingSystem?: string;
}

export function SchemaMarkup({ type, data, name, description, applicationCategory, operatingSystem }: SchemaMarkupProps) {
    let jsonLd: any = {
        "@context": "https://schema.org",
        "@type": type,
    };

    if (type === "SoftwareApplication") {
        jsonLd = {
            ...jsonLd,
            "name": name,
            "description": description,
            "applicationCategory": applicationCategory,
            "operatingSystem": operatingSystem,
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "publisher": {
                "@type": "Organization",
                "name": siteConfig.name,
                "url": siteConfig.url
            }
        };
    } else if (data) {
        jsonLd = {
            ...jsonLd,
            ...data
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
