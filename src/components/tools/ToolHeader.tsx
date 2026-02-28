"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolHeaderProps {
    title: string;
    description: string;
    className?: string;
}

export function ToolHeader({ title, description, className }: ToolHeaderProps) {
    return (
        <div className={cn("text-center space-y-0", className)}>
            <h1 className="font-outfit text-xl md:text-2xl font-extrabold tracking-tight text-foreground leading-tight">
                {title}
            </h1>
            <p className="max-w-xl mx-auto text-xs md:text-sm text-muted-foreground font-medium underline underline-offset-4 decoration-muted leading-relaxed italic">
                {description}
            </p>
        </div>
    );
}
