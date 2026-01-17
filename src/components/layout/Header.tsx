"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Github, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Image from "next/image";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-24 items-center justify-between px-4 lg:px-8">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative w-18 h-18 group-hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/logo.jpg"
                                alt="Imgverto Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-outfit text-2xl font-black tracking-tighter text-foreground uppercase italic hidden sm:block">
                            {siteConfig.name}
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8 text-[13px] font-bold uppercase tracking-widest text-muted-foreground">
                        <Link
                            href="/#tools"
                            className="transition-colors hover:text-primary"
                        >
                            All Tools
                        </Link>
                        <Link
                            href="/about"
                            className="transition-colors hover:text-primary"
                        >
                            About
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/#tools"
                        className="hidden sm:flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}
