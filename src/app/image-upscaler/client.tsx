"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Layers, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function ImageUpscalerClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [upscaledUrl, setUpscaledUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scale, setScale] = useState<2 | 4>(2);
    const [stats, setStats] = useState<{ originalSize: string, originalDims: string, newDims: string } | null>(null);

    const handleUpload = (files: File[]) => {
        const f = files[0];
        setFile(f);
        setUpscaledUrl(null);
        setStats(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);

        const img = new window.Image();
        img.onload = () => {
            setStats({
                originalSize: formatBytes(f.size),
                originalDims: `${img.width}x${img.height}`,
                newDims: 'Calculating...'
            });
        };
        img.src = url;
    };

    const handleUpscale = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("scale", scale.toString());

            const res = await fetch("/api/upscale", {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Upscale failed");
            }

            const blob = await res.blob();
            setUpscaledUrl(URL.createObjectURL(blob));

            // Calculate new hypothetical dimensions based on scale
            // (In a real app, the server should ideally return metadata, but this is a good approximation)
            if (stats) {
                const [w, h] = stats.originalDims.split('x').map(Number);
                const newW = w * scale;
                const newH = h * scale;
                setStats({ ...stats, newDims: `${newW}x${newH}` });
            }

        } catch (e: any) {
            alert(e.message || "Failed to upscale image.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Image Upscaler Online"
                description="Increase image resolution by 2x or 4x instantly using AI-powered resizing. Enhance quality without blur."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} />
                ) : (
                    <div className="space-y-10">
                        {/* Controls */}
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-6 bg-muted/30 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-foreground">Upscale Factor:</span>
                                <div className="flex gap-2">
                                    {[2, 4].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setScale(s as 2 | 4)}
                                            className={cn(
                                                "px-6 py-2 rounded-xl font-bold transition-all border-2",
                                                scale === s
                                                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                                                    : "bg-white text-muted-foreground border-transparent hover:bg-muted"
                                            )}
                                        >
                                            {s}x
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleUpscale}
                                disabled={isProcessing}
                                className="w-full md:w-auto px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95 flex items-center gap-3 justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <Scan className="w-5 h-5 animate-spin" /> Enhancing...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" /> Upscale Image
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Preview Area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
                                    <span>Original</span>
                                    <span>{stats?.originalDims}</span>
                                </div>
                                <div className="relative aspect-video bg-checkerboard rounded-2xl overflow-hidden border shadow-inner flex items-center justify-center group">
                                    {previewUrl && (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm font-bold text-primary">
                                    <span>Upscaled Result</span>
                                    <span>{stats?.newDims}</span>
                                </div>
                                <div className="relative aspect-video bg-checkerboard rounded-2xl overflow-hidden border-2 border-primary/20 shadow-inner flex items-center justify-center bg-primary/5">
                                    {upscaledUrl ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={upscaledUrl} alt="Upscaled" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground/50">
                                            <ImageIcon className="w-12 h-12 mb-2" />
                                            <span className="text-sm font-bold">Waiting for process...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {upscaledUrl && (
                            <div className="flex justify-center pt-6 border-t border-border/10">
                                <a
                                    href={upscaledUrl}
                                    download={`upscaled-${scale}x-${file.name}`}
                                    className="px-10 py-4 rounded-full bg-emerald-500 text-white font-black text-lg hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-6 h-6" /> Download {scale}x Image
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => { setFile(null); setUpscaledUrl(null); setStats(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                Upscale another image
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate prose-lg dark:prose-invert mb-16">
                <h2>Increase Image Resolution without Quality Loss</h2>
                <p>
                    Imgverto's <strong>AI Image Upscaler</strong> allows you to enlarge your photos by 200% or 400% while maintaining sharpness.
                    Unlike traditional resizing which just stretches pixels, our smart algorithm (Lanczos3 resampling) intelligently fills in details
                    to create a crisp, high-resolution result.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
                    {[
                        { title: "Smart Upsaling", icon: Layers, desc: "Uses advanced resampling for crisp edges." },
                        { title: "2x & 4x Mode", icon: Scan, desc: "Choose the resolution boost you need." },
                        { title: "Instant Download", icon: Download, desc: "No watermarks. No waiting." },
                    ].map((f, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white border shadow-sm">
                            <f.icon className="w-8 h-8 text-primary mb-4" />
                            <h4 className="font-black text-foreground mb-2">{f.title}</h4>
                            <p className="text-sm text-muted-foreground">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <h3>How to upscale an image?</h3>
                <ol>
                    <li>Upload your image (JPG, PNG, or WebP).</li>
                    <li>Select your desired upscale factor: <strong>2x</strong> or <strong>4x</strong>.</li>
                    <li>Click "Upscale Image" and wait a few seconds.</li>
                    <li>Download your high-resolution photo instantly.</li>
                </ol>

                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl my-8">
                    <p className="text-blue-800 m-0 font-medium">
                        <strong>Pro Tip:</strong> This tool is perfect for fixing pixelated logos, enhancing old photos for print, or improving
                        low-resolution images for e-commerce listings.
                    </p>
                </div>
            </div>

            <FAQSection items={[
                { question: "Does upscaling reduce quality?", answer: "No, our upscaler creates new pixels based on the original data (resampling), preventing the blurry 'stretched' look of standard resizing." },
                { question: "Is this tool free?", answer: "Yes, Imgverto Image Upscaler is 100% free with no hidden costs." },
                { question: "What formats are supported?", answer: "We support the most common web formats: JPG, PNG, and WebP." },
                { question: "Can I upscale 4K images?", answer: "To ensure server performance, we limit extremely large inputs, but you can easily upscale standard HD images to 4K or higher." }
            ]} />

            <RelatedTools currentPath="/image-upscaler" />
        </Section>
    );
}
