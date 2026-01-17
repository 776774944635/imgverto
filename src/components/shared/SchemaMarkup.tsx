import { siteConfig } from "@/lib/site-config";

interface SchemaMarkupProps {
    type: "SoftwareApplication";
    name: string;
    description: string;
    applicationCategory: string;
    operatingSystem: string;
}

export function SchemaMarkup({ name, description, applicationCategory, operatingSystem }: SchemaMarkupProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
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

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
