"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
    items: { label: string; href: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground font-medium">
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    {index > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
                    <Link
                        href={item.href}
                        className={index === items.length - 1 ? "text-foreground font-semibold" : "hover:text-primary transition-colors"}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    );
}
