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
        <div className={cn("text-center space-y-1", className)}>
            <h1 className="font-outfit text-2xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {title}
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
                {description}
            </p>
        </div>
    );
}
