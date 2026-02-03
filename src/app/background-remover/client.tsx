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
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Remove Background Online Free"
                description="Instantly remove image backgrounds with high-precision segmentation. Create transparent PNGs for transparency, logos, and e-commerce product photos."
            />

            <div className="w-full max-w-5xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} />
                ) : (
                    <div className="space-y-10">
                        {/* Controls */}
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-muted/30 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-foreground">File:</span>
                                <span className="text-sm font-medium text-muted-foreground truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs px-2 py-1 rounded bg-white border">{formatBytes(file.size)}</span>
                            </div>

                            <button
                                onClick={handleRemoveBackground}
                                disabled={isProcessing}
                                className="w-full md:w-auto px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95 flex items-center gap-3 justify-center"
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
                            <div className="flex justify-center pt-6 border-t border-border/10">
                                <a
                                    href={processedUrl}
                                    download={`no-bg-${file.name.replace(/\.[^/.]+$/, "")}.png`}
                                    className="px-10 py-4 rounded-full bg-emerald-500 text-white font-black text-lg hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-6 h-6" /> Download Transparent PNG
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => { setFile(null); setProcessedUrl(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                Process another image
                            </button>
                        </div>
                    </div>
                )}
            </div>


            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this Background Remover Tool Does",
                    content: `Imgverto's Background Remover is a sophisticated web-based application designed to strip the background from any image with surgical precision. Powered by advanced computational logic and pattern recognition models, our tool identifies the subject of your photo—whether it's a person, an animal, a product, or a logo—and separates it from the clutter behind it. This process, often called image segmentation, used to take hours of manual work in professional software like Adobe Photoshop. With Imgverto, it happens in seconds.

The tool uses high-performance algorithms to analyze the pixels in your image. It looks for edges, contrast, and color variances to determine what part of the image is the foreground and what is the background. Once the analysis is complete, it applies an alpha channel mask to the background, making it completely transparent while preserving the sharp edges and fine details of your main subject. This results in a high-quality transparent PNG file that you can layer over any other background or design.

What makes Imgverto unique is that all of this processing happens directly in your web browser. Most other online background removers upload your images to their servers, which can be slow and raises privacy concerns. By using WebAssembly and modern browser capabilities, Imgverto keeps your data on your device. This means faster processing, total privacy, and the ability to work even on slower internet connections once the initial processing engine is loaded.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `This tool is designed for anyone who needs high-quality image cutouts without the complexity of professional design software. It is particularly valuable for e-commerce entrepreneurs who need to display their products on a clean, professional white background to meet the requirements of platforms like Amazon, eBay, and Etsy. By removing distracting backgrounds, products become the sole focus, which significantly increases conversion rates and gives your store a more polished look.

Graphic designers and social media managers will find this tool indispensable for creating marketing materials, posters, and social media posts. Instead of spending time clicking around edges with a pen tool, they can quickly generate transparent assets to layer into their designs. Content creators and YouTubers can use it to isolate themselves for eye-catching thumbnails. 

Furthermore, casual users who want to create fun stickers for messaging apps, remove a photobomber from a great portrait, or prepare photos for personal projects like invitations or greeting cards will find the interface friendly and accessible. If you value your time and want professional results without a learning curve or a subscription fee, Imgverto's Background Remover is built for you.`
                }}
                howToUse={{
                    title: "How to Use the Free Background Remover",
                    steps: [
                        "Click the 'Upload Image' button or simply drag and drop your photo into the designated area. We support JPG, PNG, and WebP formats.",
                        "Once uploaded, click the 'Remove Background' button. If this is your first time using the tool, wait a few seconds for the processing engine to initialize in your browser.",
                        "The system will automatically analyze your image. You will see a side-by-side comparison of your original photo and the new transparent version.",
                        "Inspect the results. Our engine handles complex edges like hair and fur with surprising accuracy. If you like what you see, proceed to the final step.",
                        "Click the 'Download Transparent PNG' button to save your cutout to your device. You can now use this image in any design project or marketplace listing."
                    ]
                }}
                benefits={{
                    title: "Benefits of Using Imgverto",
                    items: [
                        "100% Free Forever: No hidden fees, no subscriptions, and no credit-based limits on how many images you can process.",
                        "Privacy First: Your images never leave your computer. All processing is done locally in your browser for maximum security.",
                        "High Resolution: We don't downscale your images. Get high-quality, sharp cutouts suitable for professional printing and web use.",
                        "No Signup Required: Start removing backgrounds immediately without creating an account or providing an email address.",
                        "Professional Quality: Our engine is optimized on millions of images to provide edge detection that rivals manual editing.",
                        "Cross-Platform: Works seamlessly on Windows, Mac, Linux, and mobile devices directly through your web browser.",
                        "Instant Downloads: No waiting for server-side queues. Once the engine is loaded, processing and downloading are near-instant."
                    ]
                }}
                faqs={[
                    {
                        question: "Is there a limit to how many backgrounds I can remove?",
                        answer: "Absolutely not. Imgverto is designed to be a truly free resource. You can remove backgrounds from as many images as you need, whether it's one photo for a personal project or hundreds for an e-commerce catalog."
                    },
                    {
                        question: "Why should I use Imgverto instead of Photoshop?",
                        answer: "Photoshop is a powerful tool, but it is expensive and has a steep learning curve. Imgverto offers a specialized engine that does one thing—background removal—extremely well and fast. For most users, our system provides results that are indistinguishable from professional manual work but takes only a fraction of the time and costs nothing."
                    },
                    {
                        question: "Does the tool work with complex subjects like hair or transparent objects?",
                        answer: "Yes, our processing engine is specifically tuned to handle difficult edge cases like messy hair, animal fur, and semi-transparent fabrics. While extremely fine details can occasionally be tricky, it provides a professional-grade starting point for almost any image."
                    },
                    {
                        question: "Can I save my image as a JPG after removing the background?",
                        answer: "We recommend saving as a PNG. The JPG format does not support transparency, so if you save a result with no background as a JPG, the background will automatically be filled with white or black. PNG is the standard for images with transparent elements."
                    },
                    {
                        question: "Is my data safe when using Imgverto?",
                        answer: "Your data is perfectly safe. Unlike most online tools, Imgverto performs all processing inside your browser. Your images are never uploaded to a cloud server, meaning nobody—not even us—ever sees your files. This makes it one of the most secure ways to edit photos online."
                    },
                    {
                        question: "Do I need to install any software or extensions?",
                        answer: "No installation is required. Imgverto is a pure web application that runs in any modern browser like Chrome, Firefox, Safari, or Edge. Just visit the site and you are ready to go."
                    }
                ]}
            />

            <RelatedTools currentPath="/background-remover" />
        </Section>
    );
}
