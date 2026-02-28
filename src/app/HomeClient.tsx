"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    ZapIcon,
    GlobeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { scaleUp } from "@/lib/motion";
import { tools, categories } from "@/lib/tools";

export function HomeClient() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredTools = activeCategory === "All"
        ? tools
        : tools.filter(tool => tool.category === activeCategory);

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-400/10 blur-[100px] rounded-full" />
                <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-teal-400/5 blur-[80px] rounded-full animate-bounce [animation-duration:10s]" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-8 md:pt-12 pb-8 md:pb-12">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="font-outfit text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-2 md:mb-3 leading-tight">
                        Complete Toolkit for Unified Image Processing
                    </h1>
                    <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground font-medium mb-4 md:mb-6 px-4 sm:px-0">
                        Professional-grade utilities for effortless media management.
                    </p>

                    {/* Category Filters - Now scrollable on mobile */}
                    <div className="flex items-center justify-start md:justify-center gap-3 mb-6 overflow-x-auto pb-4 md:pb-0 hide-scrollbar px-4 sm:px-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 md:px-7 py-2 rounded-xl text-[12px] md:text-[13px] font-extrabold uppercase tracking-widest transition-all border-2 whitespace-nowrap",
                                    activeCategory === cat
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                                        : "bg-white text-muted-foreground border-transparent hover:border-gray-200 hover:text-foreground"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section id="tools" className="pb-16 relative">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredTools.map((tool, idx) => (
                            <motion.div
                                key={tool.href}
                                variants={scaleUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={idx}
                            >
                                <Link
                                    href={tool.href}
                                    className="group relative flex flex-col bg-white border-2 border-transparent rounded-2xl p-6 h-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/10 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                                >
                                    {tool.isNew && (
                                        <div className="absolute top-5 right-5 bg-primary/10 text-primary text-[10px] font-extrabold px-3 py-1 rounded-full border border-primary/20 uppercase tracking-tighter">
                                            New
                                        </div>
                                    )}

                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
                                        tool.lightColor,
                                        tool.color
                                    )}>
                                        {tool.icon}
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <h3 className="font-outfit text-xl font-extrabold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {tool.title}
                                        </h3>
                                        <p className="text-muted-foreground text-[15px] font-medium leading-relaxed mb-2 line-clamp-3">
                                            {tool.description}
                                        </p>
                                    </div>

                                    {/* Subtle Hover Accent */}
                                    <div className={cn(
                                        "absolute -bottom-2 -right-2 w-24 h-24 blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none",
                                        tool.color.replace('text-', 'bg-')
                                    )} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-muted/20 border-y">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                                title: "Military-Grade Privacy",
                                desc: "Enterprise-level encryption for every session. Your documents are your business."
                            },
                            {
                                icon: <ZapIcon className="w-10 h-10 text-primary" />,
                                title: "Instant Results",
                                desc: "No queues. No waiting. Real-time conversion powered by low-latency serverless nodes."
                            },
                            {
                                icon: <GlobeIcon className="w-10 h-10 text-primary" />,
                                title: "Global Compatibility",
                                desc: "Optimized for all modern browsers and devices. Work from your phone or your workstation."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col items-start text-left group">
                                <div className="w-14 h-14 rounded-2xl bg-white border-2 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                                    {feature.icon}
                                </div>
                                <h4 className="font-outfit text-xl font-bold text-foreground mb-3 tracking-tight">{feature.title}</h4>
                                <p className="text-muted-foreground font-medium text-base leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Process Section - AdSense Value */}
            <section className="py-16 border-b">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-black uppercase tracking-widest">
                            <ZapIcon className="w-3 h-3" /> Technical Transparency
                        </div>
                        <h2 className="font-outfit text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                            How We Process Your Files Securely
                        </h2>
                        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                            Imgverto utilizes modern browser technologies to ensure your data stays where it belongs—with you.
                            We don't just "store" files; we transform them using heavy-duty logic optimized for the web.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8 pt-8 text-left">
                            <div className="space-y-4 p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm">1</span>
                                    Browser-Side Logic
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                    For most operations, we use <strong>WebAssembly (Wasm)</strong>. This allows us to run C++ and Rust code directly inside your chrome or safari tab, meaning sensitive data never even touches our servers.
                                </p>
                            </div>
                            <div className="space-y-4 p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm">2</span>
                                    Ephemeral Cloud Nodes
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                    When server-side power is required for complex PDF tasks, we use <strong>stateless serverless nodes</strong>. These nodes expire immediately after your download, leaving zero footprint of your files.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Knowledge Base Section - AdSense Value */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="space-y-4">
                            <h2 className="font-outfit text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                                Insights & Guides
                            </h2>
                            <p className="text-lg text-muted-foreground font-medium max-w-xl">
                                Expert advice on image optimization, document standards, and digital privacy.
                            </p>
                        </div>
                        <Link href="/blog" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:gap-4 transition-all group">
                            View All Articles <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "NEET UG 2025: Photo & Signature Requirements",
                                desc: "Official guidelines for passport images, postcard photos, and digital signatures.",
                                href: "/blog/neet-ug-photo-signature-requirements",
                                tag: "Exam Preparation"
                            },
                            {
                                title: "JPG vs PNG: Complete Comparison",
                                desc: "When to use lossy vs lossless compression for your web projects.",
                                href: "/blog/jpg-vs-png-which-is-better",
                                tag: "Technical Guide"
                            },
                            {
                                title: "UPSC CSE 2025: Photo & Signature Rules",
                                desc: "Master the 350x350 pixel requirements and name/date stamp guidelines.",
                                href: "/blog/upsc-cse-photo-signature-requirements",
                                tag: "Exam Preparation"
                            }
                        ].map((post, i) => (
                            <Link key={i} href={post.href} className="flex flex-col p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 block">{post.tag}</span>
                                <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{post.title}</h4>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-6 flex-1">{post.desc}</p>
                                <span className="inline-flex items-center gap-2 text-xs font-bold text-foreground mt-auto">Read More →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
