"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Menu, X, ChevronRight, Zap, Sparkles, ImageIcon, Minimize2, FileType, Eraser, Combine } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { tools } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-14 h-14 md:w-16 md:h-16 group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src="/logo.jpg"
                                    alt="Imgverto Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-outfit text-xl sm:text-2xl font-extrabold tracking-tighter text-foreground uppercase italic">
                                {siteConfig.name}
                            </span>
                        </Link>
                        <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-extrabold uppercase tracking-widest text-muted-foreground/70">
                            <Link href="/#tools" className="transition-all hover:text-primary hover:tracking-[0.2em]">All Tools</Link>
                            <Link href="/blog" className="transition-all hover:text-primary hover:tracking-[0.2em]">Guides</Link>
                            <Link href="/about" className="transition-all hover:text-primary hover:tracking-[0.2em]">About</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle className="mr-2" />
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                            aria-label="Open Menu"
                        >
                            <Menu className="w-5 h-5 transition-transform group-hover:rotate-180" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Hamburger Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-background border-l shadow-2xl z-[101] overflow-y-auto"
                        >
                            <div className="p-6 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-11 h-11">
                                            <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                                        </div>
                                        <span className="font-outfit text-2xl font-extrabold tracking-tighter uppercase italic">{siteConfig.name}</span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-8 flex-1">
                                    <div className="space-y-4">
                                        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground/60 px-4">Navigation</h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            <Link
                                                href="/"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group"
                                            >
                                                <span className="font-bold">Home</span>
                                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                            <Link
                                                href="/blog"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group"
                                            >
                                                <span className="font-bold">Guides</span>
                                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                            <Link
                                                href="/about"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group"
                                            >
                                                <span className="font-bold">About</span>
                                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                            <Link
                                                href="/#tools"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group"
                                            >
                                                <span className="font-bold">All Tools</span>
                                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pb-10">
                                        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground/60 px-4">Available Tools</h3>
                                        <div className="flex flex-col gap-2">
                                            {tools.map((tool) => (
                                                <Link
                                                    key={tool.href}
                                                    href={tool.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 border border-transparent hover:border-primary/10 transition-all group"
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform shrink-0",
                                                        tool.lightColor,
                                                        tool.color
                                                    )}>
                                                        {tool.icon}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm tracking-tight">{tool.title}</span>
                                                        <span className="text-[11px] text-muted-foreground font-medium line-clamp-1">{tool.description}</span>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t mt-auto">
                                    <p className="text-[11px] text-center text-muted-foreground font-medium uppercase tracking-widest">
                                        Powered by Imgverto Cloud
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
