"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Combine,
    ArrowRight,
    Minimize2,
    ImageIcon,
    ShieldCheck,
    Zap,
    Sparkles,
    ShieldIcon,
    ZapIcon,
    GlobeIcon,
    Eraser,
    FileType
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn, scaleUp } from "@/lib/motion";

export function HomeClient() {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Optimize", "Create", "Edit", "Convert", "Security"];

    const tools = [
        {
            title: "Compress IMAGE",
            description: "Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.",
            href: "/compress-image",
            icon: <Minimize2 className="w-8 h-8" />,
            category: "Optimize",
            color: "text-blue-500",
            lightColor: "bg-blue-50"
        },
        {
            title: "Resize IMAGE",
            description: "Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.",
            href: "/resize-image",
            icon: <ImageIcon className="w-8 h-8" />,
            category: "Edit",
            color: "text-teal-500",
            lightColor: "bg-teal-50"
        },
        {
            title: "Crop IMAGE",
            description: "Crop JPG, PNG, or GIFs with ease; Choose pixels to define your rectangle or use our visual editor.",
            href: "/crop-image",
            icon: <Eraser className="w-8 h-8" />,
            category: "Edit",
            color: "text-emerald-500",
            lightColor: "bg-emerald-50"
        },
        {
            title: "Convert to JPG",
            description: "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to JPG in bulk with ease.",
            href: "/image-to-pdf",
            icon: <FileType className="w-8 h-8" />,
            category: "Convert",
            color: "text-orange-500",
            lightColor: "bg-orange-50"
        },
        {
            title: "Convert from JPG",
            description: "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
            href: "/jpg-to-png",
            icon: <ImageIcon className="w-8 h-8" />,
            category: "Convert",
            color: "text-amber-500",
            lightColor: "bg-amber-50"
        },
        {
            title: "Upscale Image",
            description: "Enlarge your images with high resolution. Easily increase resolution while maintaining visual quality.",
            href: "/image-upscaler",
            icon: <Sparkles className="w-8 h-8" />,
            category: "Edit",
            isNew: true,
            color: "text-violet-500",
            lightColor: "bg-violet-50"
        },
        {
            title: "Remove background",
            description: "Quickly remove image backgrounds with high accuracy. Instantly detect objects and cut out backgrounds.",
            href: "/background-remover",
            icon: <Eraser className="w-8 h-8" />,
            category: "Create",
            isNew: true,
            color: "text-pink-500",
            lightColor: "bg-pink-50"
        },
        {
            title: "Merge PDF",
            description: "Combine multiple PDF files into one single PDF document easily.",
            href: "/merge-pdf",
            icon: <Combine className="w-8 h-8" />,
            category: "Edit",
            color: "text-indigo-500",
            lightColor: "bg-indigo-50"
        },
        {
            title: "Compress PDF",
            description: "Reduce PDF file size for easy sharing and storage without losing quality.",
            href: "/pdf-compressor",
            icon: <Zap className="w-8 h-8" />,
            category: "Optimize",
            color: "text-blue-600",
            lightColor: "bg-blue-50"
        }
    ];


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
            <section className="relative pt-12 md:pt-16 pb-16 md:pb-20">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="font-outfit text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 md:mb-6 leading-tight md:leading-[1.2]">
                        Complete Toolkit for Unified Image Processing
                    </h1>
                    <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground font-medium mb-8 md:mb-12 px-4 sm:px-0">
                        Professional-grade utilities for effortless media management.
                    </p>

                    {/* Category Filters - Now scrollable on mobile */}
                    <div className="flex items-center justify-start md:justify-center gap-3 mb-10 overflow-x-auto pb-4 md:pb-0 hide-scrollbar px-4 sm:px-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 md:px-7 py-2 rounded-xl text-[12px] md:text-[13px] font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap",
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
            <section id="tools" className="pb-24 relative">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
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
                                    className="group relative flex flex-col bg-white border-2 border-transparent rounded-[2rem] p-8 h-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/10 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                                >
                                    {tool.isNew && (
                                        <div className="absolute top-5 right-5 bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full border border-primary/20 uppercase tracking-tighter">
                                            New
                                        </div>
                                    )}

                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
                                        tool.lightColor,
                                        tool.color
                                    )}>
                                        {tool.icon}
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <h3 className="font-outfit text-xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                                            {tool.title}
                                        </h3>
                                        <p className="text-muted-foreground text-[15px] font-medium leading-relaxed mb-4 line-clamp-3">
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
            < section className="py-32 bg-muted/20 border-y" >
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
                                <div className="w-20 h-20 rounded-3xl bg-white border-2 flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                                    {feature.icon}
                                </div>
                                <h4 className="font-outfit text-xl font-bold text-foreground mb-3 tracking-tight">{feature.title}</h4>
                                <p className="text-muted-foreground font-medium text-base leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >
        </div >
    );
}
