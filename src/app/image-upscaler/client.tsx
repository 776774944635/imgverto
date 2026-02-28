"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Layers, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AdPlaceholder } from "@/components/shared/AdPlaceholder";
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
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0 px-0 lg:px-[160px]">
                    <Breadcrumbs items={[{ label: "Image Upscaler", href: "/image-upscaler" }]} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-6">
                    {/* Left Ad */}
                    <div className="hidden lg:block pt-4">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center pt-4">
                        <div className="w-full text-center mb-1">
                            <ToolHeader
                                title="Image Upscaler Online"
                                description="Increase image resolution by 2x or 4x instantly without blur."
                            />
                            <div className="flex justify-center mt-2">
                                <AdPlaceholder className="w-[728px] h-[90px]" />
                            </div>
                        </div>

                        {!file ? (
                            <ImageUploader onUpload={handleUpload} maxFiles={1} toolType="image" />
                        ) : (
                            <div className="w-full max-w-4xl mx-auto premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-6 mb-8 relative shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                                <div className="space-y-8">
                                    {/* Controls */}
                                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-5 bg-muted/30 rounded-3xl border border-border/50">
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-foreground text-sm">Factor:</span>
                                            <div className="flex gap-2">
                                                {[2, 4].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => setScale(s as 2 | 4)}
                                                        className={cn(
                                                            "px-4 py-1.5 rounded-xl font-bold text-sm transition-all border-2",
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
                                            className="w-full md:w-auto px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-extrabold text-base hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95 flex items-center gap-3 justify-center"
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
                                        <div className="flex justify-center pt-4 border-t border-border/10">
                                            <a
                                                href={upscaledUrl}
                                                download={`upscaled-${scale}x-${file.name}`}
                                                className="px-8 py-3 rounded-full bg-emerald-500 text-white font-extrabold text-base hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                            >
                                                <Download className="w-5 h-5" /> Download {scale}x Image
                                            </a>
                                        </div>
                                    )}

                                    <div className="flex justify-center">
                                        <button onClick={() => { setFile(null); setUpscaledUrl(null); setStats(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                            Upscale another image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="w-full max-w-4xl mx-auto border-t pt-8 mt-4">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "What this Image Upscaler Tool Does",
                                    content: `Imgverto's Image Upscaler is a sophisticated enhancement engine that breathes new life into low-resolution photos and blurry graphics. When you simply enlarge an image using traditional software, the result is often 'pixelated' or 'fuzzy' because the program just stretches the existing pixels. Our upscaler, however, uses advanced interpolation and sharpening algorithms to intelligently fill in the gaps between pixels.

This tool is a lifesaver for students and professionals who have old, small, or low-quality scans of important documents. If you have a passport-size photo that is only 200 pixels wide and you need to enlarge it for a visa or job application, Imgverto's engine recalculates the edges and textures to maintain a sharp, professional look. It works on everything from personal portraits to complex infographics, ensuring that your digital assets are ready for high-resolution displays or professional printing without losing clarity.`
                                }}
                                whoIsItFor={{
                                    title: "Who Should Use This Tool",
                                    content: `This tool is perfect for web designers and content creators who often work with 'found' assets or older project files that aren't high-resolution enough for modern layouts. By upscaling these images, they can ensure a consistent, sharp aesthetic across their entire platform.

Candidates for competitive exams like NDA, CDS, or Banking also use this tool to fix small or unclear scans of certificates and ID cards. Many government portals have a minimum DPI or pixel requirement; if your scan is too small, Imgverto can bring it up to standard while keeping the text and details legible. It's for anyone who needs to make an image bigger and better, quickly and for free.`
                                }}
                                howToUse={{
                                    title: "How to Use the Free Online Image Upscaler",
                                    steps: [
                                        "Click the 'Upload' button or drag your low-resolution JPG, PNG, or WebP file into the workspace. You can immediately see the original pixel dimensions.",
                                        "Press the 'Upscale Image Now' button. Our server-side processing will begin the enhancement and sharpening cycle.",
                                        "Wait for the progress verification. Our system ensures that the enlarged edges are smooth and the details are preserved before finalizing.",
                                        "Check the 'Upscale Ready' status and review the new, larger version of your photo in the preview window.",
                                        "Click the 'Download Upscaled Image' button to save the high-resolution version to your device. Your image is now crisp and ready for use."
                                    ]
                                }}
                                benefits={{
                                    title: "Benefits of Using Imgverto",
                                    items: [
                                        "Smart Sharpening: We don't just stretch pixels; we enhance them to ensure your enlarged photos look naturally sharp.",
                                        "Resolution Boost: Instantly double or triple the pixel count of your assets for high-resolution web and print needs.",
                                        "Edge Preservation: Our algorithms focus on keeping lines crisp and colors clean, even during significant enlargement.",
                                        "Privacy Guaranteed: Your uploaded photos are processed securely and are automatically deleted shortly after you finish.",
                                        "Zero Cost: Enjoy high-quality image enhancement without the expensive price tag of professional design software.",
                                        "No Watermarks: We never overlay logos on your work. The upscaled output is clean and ready for professional deployment.",
                                        "Universal Support: Works perfectly with your mobile phone or desktop browser, from anywhere, at any time."
                                    ]
                                }}
                                faqs={[
                                    {
                                        question: "Can I upscale a PNG signature?",
                                        answer: "Yes, our tool supports PNG and JPG. Upscaling a signature can help make the thin lines more defined and easier to verify on official forms."
                                    }
                                ]}
                            />

                            <RelatedTools currentPath="/image-upscaler" />
                        </div>
                    </div>

                    {/* Right Ad */}
                    <div className="hidden lg:block">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>
                </div>
            </div>
        </Section>
    );
}
