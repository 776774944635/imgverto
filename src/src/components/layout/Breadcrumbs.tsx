"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { siteConfig } from "@/lib/site-config";

export function Breadcrumbs() {
    const pathname = usePathname();
    if (pathname === "/") return null;

    const paths = pathname.split("/").filter(Boolean);

    // Create Breadcrumb List for Schema
    const breadcrumbItems = [
        { name: "Home", item: siteConfig.url },
        ...paths.map((path, index) => {
            const url = `/${paths.slice(0, index + 1).join("/")}`;
            const name = path
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            return { name, item: `${siteConfig.url}${url}` };
        })
    ];

    const breadcrumbSchema = {
        "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item
        }))
    };

    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <SchemaMarkup type="BreadcrumbList" data={breadcrumbSchema} />
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
                <li className="flex items-center">
                    <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                    </Link>
                </li>
                {paths.map((path, index) => {
                    const url = `/${paths.slice(0, index + 1).join("/")}`;
                    const isLast = index === paths.length - 1;
                    const name = path
                        .split("-")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");

                    return (
                        <li key={url} className="flex items-center">
                            <ChevronRight className="w-3.5 h-3.5 mx-1" />
                            {isLast ? (
                                <span className="font-bold text-slate-900 truncate max-w-[200px]" aria-current="page">
                                    {name}
                                </span>
                            ) : (
                                <Link
                                    href={url}
                                    className="hover:text-primary transition-colors"
                                >
                                    {name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
