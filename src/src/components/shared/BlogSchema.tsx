import { SchemaMarkup } from "./SchemaMarkup";
import { siteConfig } from "@/lib/site-config";

interface BlogSchemaProps {
    title: string;
    description: string;
    url: string;
    datePublished?: string;
    authorName?: string;
    image?: string;
}

export function BlogSchema({
    title,
    description,
    url,
    datePublished = "2024-01-01T00:00:00Z",
    authorName = "Imgverto Team",
    image = siteConfig.ogImage
}: BlogSchemaProps) {
    const blogData = {
        "headline": title,
        "description": description,
        "image": image,
        "author": {
            "@type": "Organization",
            "name": authorName,
            "url": siteConfig.url
        },
        "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "logo": {
                "@type": "ImageObject",
                "url": `${siteConfig.url}/logo.png`
            }
        },
        "datePublished": datePublished,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}${url}`
        }
    };

    return <SchemaMarkup type="BlogPosting" data={blogData} />;
}
