"use client";

import Link from "next/link";
import {
  FileText,
  FileType,
  Combine,
  ArrowRight,
  Minimize2,
  ImageIcon,
  ShieldCheck,
  Zap,
  Sparkles,
  ShieldIcon,
  ZapIcon,
  GlobeIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn, scaleUp } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const tools = [
    {
      title: "Compress Image",
      description: "Reduce image file size while maintaining the best quality and optimization.",
      href: "/compress-image",
      icon: <Minimize2 className="w-6 h-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Resize Image",
      description: "Change image dimensions by defining new height and width in pixels.",
      href: "/resize-image",
      icon: <ImageIcon className="w-6 h-6" />,
      color: "bg-teal-500",
      lightColor: "bg-teal-50",
      textColor: "text-teal-600"
    },
    {
      title: "Image to PDF",
      description: "Convert JPG, PNG, and WebP images to PDF documents in seconds.",
      href: "/image-to-pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into one single PDF document easily.",
      href: "/merge-pdf",
      icon: <Combine className="w-6 h-6" />,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      title: "Compress PDF",
      description: "Reduce PDF file size for easy sharing and storage without losing quality.",
      href: "/pdf-compressor",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600"
    },
    {
      title: "PDF to JPG",
      description: "Extract all pages from a PDF or convert each PDF page to a JPG image.",
      href: "/pdf-to-jpg",
      icon: <FileType className="w-6 h-6" />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600"
    },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-400/10 blur-[100px] rounded-full" />
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-teal-400/5 blur-[80px] rounded-full animate-bounce [animation-duration:10s]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[13px] font-black uppercase tracking-widest mb-10 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
              <Sparkles className="w-4 h-4" /> The Next-Gen Image Cloud
            </div>
            <h1 className="font-outfit text-6xl md:text-8xl font-black tracking-tight text-foreground mb-10 leading-[0.95]">
              Superior tools for <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-600 bg-clip-text text-transparent italic">creative workflow</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium mb-14 leading-relaxed opacity-80 uppercase tracking-tight">
              Professional, high-performance utilities to transform your media instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="#tools"
                className="w-full sm:w-auto px-12 py-5 rounded-full bg-primary text-primary-foreground font-black text-xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5)] hover:-translate-y-1 active:scale-95 transition-all"
              >
                Launch Utilities
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-12 py-5 rounded-full bg-white text-foreground font-black text-xl border-2 hover:bg-muted/30 transition-all"
              >
                Our Security
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-32 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl text-left">
              <div className="h-1.5 w-20 bg-primary rounded-full mb-6" />
              <h2 className="font-outfit text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-6 uppercase italic">
                Cloud Processing Engine
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                Zero-wait infrastructure. Your data is processed locally and never stored.
              </p>
            </div>
            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-muted/50 border border-border/50">
              <Zap className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-[13px] font-black uppercase tracking-widest text-foreground">
                Ultra Fast Node
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, idx) => (
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
                  className="group relative flex flex-col premium-card rounded-[3rem] p-10 h-full bg-white/80 backdrop-blur-sm border-2 overflow-hidden"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg",
                    tool.lightColor,
                    tool.textColor,
                    "border border-current/10"
                  )}>
                    {tool.icon}
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-outfit text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center justify-between">
                      {tool.title}
                      <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                    </h3>
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Enhanced Hover Accent */}
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none",
                    tool.color
                  )} />
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-1.5 transition-all opacity-0 group-hover:opacity-100 group-hover:h-2",
                    tool.color
                  )} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-muted/20 border-y">
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
                <h4 className="font-outfit text-2xl font-black text-foreground mb-4 uppercase tracking-tight">{feature.title}</h4>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
