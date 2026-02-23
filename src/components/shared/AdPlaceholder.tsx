"use client";

import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
    className?: string;
    label?: string;
}

export function AdPlaceholder({ className, label = "Advertisement" }: AdPlaceholderProps) {
    return (
        <div className={cn("bg-muted/30 border border-dashed flex items-center justify-center text-muted-foreground/40 text-xs font-bold uppercase tracking-widest rounded-xl", className)}>
            {label}
        </div>
    );
}
