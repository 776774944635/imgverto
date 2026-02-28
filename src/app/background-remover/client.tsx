"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Layers, Image as ImageIcon, Eraser, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AdPlaceholder } from "@/components/shared/AdPlaceholder";

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function BackgroundRemoverClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState<string>("Initializing...");

    const handleUpload = (files: File[]) => {
        const f = files[0];
        setFile(f);
        setProcessedUrl(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
    };

    const handleRemoveBackground = async () => {
        if (!file || !previewUrl) return;
        setIsProcessing(true);
        setProgress("Loading Advanced Segmentation Model (this may take a moment)...");

        try {
            // Dynamically import the library to avoid build-time errors
            const { removeBackground } = (await import("@imgly/background-removal")) as any;
            const imglyRemoveBackground = removeBackground;

            // Processing
            const blob = await imglyRemoveBackground(previewUrl, {
                progress: (key: string, current: number, total: number) => {
                    const percent = Math.round((current / total) * 100);
                    setProgress(`Processing: ${percent}%`);
                }
            });

            setProcessedUrl(URL.createObjectURL(blob));
        } catch (e: any) {
            console.error(e);
            alert("Failed to remove background. Ensure your browser supports WebAssembly/SharedArrayBuffer.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0 px-0 lg:px-[160px]">
                    <Breadcrumbs items={[{ label: "Background Remover", href: "/background-remover" }]} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-6">
                    {/* Left Ad */}
                    <div className="hidden lg:block pt-4">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center pt-4">
                        <div className="w-full text-center space-y-4 mb-2">
                            <div className="flex justify-center">
                                <AdPlaceholder className="w-[728px] h-[90px]" />
                            </div>
                            <ToolHeader
                                title="Remove Background Online Free"
                                description="Instantly remove image backgrounds with high-precision segmentation for logos and photos."
                            />
                        </div>

                        {!file ? (
                            <ImageUploader
                                onUpload={handleUpload}
                                maxFiles={1}
                                description="Upload an image to remove its background"
                                toolType="image"
                            />
                        ) : (
                            <div className="w-full max-w-4xl mx-auto premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-6 mb-8 relative shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                                <div className="space-y-8">
                                    {/* Controls */}
                                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-5 bg-muted/30 rounded-3xl border border-border/50">
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="font-bold text-foreground">File:</span>
                                            <span className="font-medium text-muted-foreground truncate max-w-[150px]">{file.name}</span>
                                            <span className="text-xs px-2 py-1 rounded bg-white border">{formatBytes(file.size)}</span>
                                        </div>

                                        <button
                                            onClick={handleRemoveBackground}
                                            disabled={isProcessing}
                                            className="w-full md:w-auto px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-extrabold text-base hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95 flex items-center gap-3 justify-center"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <Scan className="w-5 h-5 animate-spin" /> {progress}
                                                </>
                                            ) : (
                                                <>
                                                    <Eraser className="w-5 h-5" /> Remove Background
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Preview Area */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
                                                <span>Original Image</span>
                                            </div>
                                            <div className="relative aspect-square bg-checkerboard rounded-2xl overflow-hidden border shadow-inner flex items-center justify-center group">
                                                {previewUrl && (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-sm font-bold text-primary">
                                                <span>Transparent Result</span>
                                            </div>
                                            <div className="relative aspect-square bg-checkerboard rounded-2xl overflow-hidden border-2 border-primary/20 shadow-inner flex items-center justify-center bg-white/50">
                                                {processedUrl ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img src={processedUrl} alt="Processed" className="max-w-full max-h-full object-contain" />
                                                ) : (
                                                    <div className="flex flex-col items-center text-muted-foreground/50 p-6 text-center">
                                                        {isProcessing ? (
                                                            <div className="space-y-4 animate-pulse">
                                                                <Scan className="w-12 h-12 mx-auto opacity-50" />
                                                                <p className="text-sm font-bold">Algorithmic engine is analyzing pixels...</p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <Layers className="w-12 h-12 mb-2" />
                                                                <span className="text-sm font-bold">Click "Remove Background" to start</span>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {processedUrl && (
                                        <div className="flex justify-center pt-4 border-t border-border/10">
                                            <a
                                                href={processedUrl}
                                                download={`no-bg-${file.name.replace(/\.[^/.]+$/, "")}.png`}
                                                className="px-8 py-3 rounded-full bg-emerald-500 text-white font-extrabold text-base hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                            >
                                                <Download className="w-5 h-5" /> Download Transparent PNG
                                            </a>
                                        </div>
                                    )}

                                    <div className="flex justify-center">
                                        <button onClick={() => { setFile(null); setProcessedUrl(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                            Process another image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="w-full max-w-4xl mx-auto border-t pt-8 mt-4">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "What this Background Remover Does",
                                    content: `Imgverto's Background Remover is a cutting-edge artificial intelligence engine that can isolate any subject from its surroundings with a single click. In the past, removing a background from a photo required hours of tedious manual tracing with professional design software. Our tool automates this entire process, using complex neural networks to distinguish between a subject—whether it's a person, a product, or an object—and the complex environment behind it.

The result is a clean, professional-looking cutout with a transparent background. This is essential for creating high-impact marketing materials, clean product listings for re-retail, or professional profile pictures. Our AI is trained to handle tricky edges like hair, fur, and semi-transparent objects, ensuring that you get a high-quality PNG file that looks perfectly natural when placed on any new background or digital design.`
                                }}
                                whoIsItFor={{
                                    title: "Who Should Use This Tool",
                                    content: `This utility is a favorite among student job seekers and early-career professionals in India. If you need a professional LinkedIn profile picture but only have a photo taken in a crowded park or your living room, Imgverto can remove that busy background in seconds, leaving you with a clean image that looks like it was taken in a studio.

E-commerce entrepreneurs and small business owners also use the Background Remover to prepare product photos for platforms like Amazon, Flipkart, or eBay. By removing distracting backgrounds, they can create the clean, 'white background' look that online marketplaces require. From social media influencers wanting a clean cutout for their latest thumbnail to students preparing a clear photo for an official ID card, this tool is built for anyone who needs to focus on what matters most in a photo: the subject.`
                                }}
                                howToUse={{
                                    title: "How to Use the Free AI Background Remover",
                                    steps: [
                                        "Click the 'Upload' button or drag any JPG, PNG, or WebP photo into the workspace. Clear, high-contrast photos work best.",
                                        "Click the 'Remove Background Now' button. Our AI will immediately begin analyzing the image to find the subject's edges.",
                                        "Wait for the progress bar to finish. For most standard photos, our neural network processes the cutout in just a few seconds.",
                                        "Preview the result in our comparison view. You'll see the original photo next to the new, transparent cutout version.",
                                        "If satisfied, click the 'Download Cutout' button to save your new transparent PNG file. Your subject is now ready for any new design or document."
                                    ]
                                }}
                                benefits={{
                                    title: "Benefits of Using Imgverto",
                                    items: [
                                        "High-Precision AI: Our neural networks are specifically trained to identify subjects and handle difficult edges like hair and leaves.",
                                        "Instant Results: No more manual pen tools or complex software. Get a professional cutout in a matter of seconds.",
                                        "Universal File Support: Works with photos from any source—smartphone captures, DSLR shots, or web-based images.",
                                        "Total Privacy: We value your personal data. All processing is secure, and your photos are automatically deleted from our system.",
                                        "100% Free Service: Enjoy professional-grade AI background removal without expensive credits or monthly subscriptions.",
                                        "No Branding or Watermarks: Claim your clean cutout without any annoying overlay logos—it's yours for any use.",
                                        "Web-Based Convenience: No app to download. Access the power of advanced AI background removal directly from your browser."
                                    ]
                                }}
                                faqs={[
                                    {
                                        question: "Does this background remover work for hair and fuzzy edges?",
                                        answer: "Yes! Our AI is highly optimized to handle complex edges like hair, animal fur, and clothing textures, ensuring you get a professional-quality cutout."
                                    },
                                    {
                                        question: "Will the quality of my photo decrease after removal?",
                                        answer: "No. Our tool processes your photo at its original resolution, ensuring your subject stays sharp while the background is removed."
                                    },
                                    {
                                        question: "Is it good for creating transparent signatures?",
                                        answer: "Absolutely. If you have a scan of your signature on white paper, the AI can remove that background perfectly for use on digital documents."
                                    },
                                    {
                                        question: "How do I make my photo look professional for a job site?",
                                        answer: "Use our Background Remover to cut yourself out from a casual background, then place the transparent PNG on a solid color or professional gradient."
                                    },
                                    {
                                        question: "Is the AI background remover free to use?",
                                        answer: "Yes, Imgverto's background removal tool is 100% free for all users. You don't need to pay for credits or watch ads."
                                    },
                                    {
                                        question: "Can I remove backgrounds from product photos?",
                                        answer: "Yes, it is perfect for e-commerce sellers on Amazon, Flipkart, or eBay who need clean product cutouts with no distractions."
                                    },
                                    {
                                        question: "Are my photos safe on Imgverto?",
                                        answer: "Yes, your privacy is our priority. Your photos are processed securely and deleted from our servers shortly after you finish."
                                    }
                                ]}
                            />

                            <RelatedTools currentPath="/background-remover" />
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
