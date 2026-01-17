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
        <div className={cn("text-center space-y-6 mb-16 pt-8", className)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[11px] font-black uppercase tracking-widest border border-primary/10">
                <Sparkles className="w-3 h-3" /> Professional Utility
            </div>

            <div className="space-y-4">
                <h1 className="font-outfit text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                    {title}
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
                <div className="h-1 w-10 rounded-full bg-primary/10" />
                <div className="h-1 w-6 rounded-full bg-primary" />
                <div className="h-1 w-10 rounded-full bg-primary/10" />
            </div>
        </div>
    );
}
