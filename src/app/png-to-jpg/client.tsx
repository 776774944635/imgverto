"use client";

import { useState, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Image as ImageIcon, FileType, Settings } from "lucide-react";
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

export function PngToJpgClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [jpgUrl, setJpgUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [jpgSize, setJpgSize] = useState<string | null>(null);
    const [quality, setQuality] = useState<number>(0.9);

    const handleUpload = (files: File[]) => {
        const f = files[0];
        setFile(f);
        setJpgUrl(null);
        setJpgSize(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
    };

    // Auto convert on settings change or file load
    useEffect(() => {
        if (!file || !previewUrl) return;

        const convert = () => {
            setIsProcessing(true);
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    setIsProcessing(false);
                    return;
                }

                // Fill white background for transparency
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw image
                ctx.drawImage(img, 0, 0);

                // Convert to JPG
                canvas.toBlob((blob) => {
                    if (blob) {
                        const newUrl = URL.createObjectURL(blob);
                        setJpgUrl(prev => {
                            if (prev) URL.revokeObjectURL(prev);
                            return newUrl;
                        });
                        setJpgSize(formatBytes(blob.size));
                    }
                    setIsProcessing(false);
                }, "image/jpeg", quality);
            };
            img.src = previewUrl;
        };

        // Debounce slightly for slider
        const timeout = setTimeout(convert, 100);
        return () => clearTimeout(timeout);
    }, [file, previewUrl, quality]);

    return (
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0 px-0 lg:px-[160px]">
                    <Breadcrumbs items={[{ label: "PNG to JPG", href: "/png-to-jpg" }]} />
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
                                title="PNG to JPG Converter"
                                description="Convert transparent PNGs to JPG online instantly!"
                            />
                        </div>

                        <div className="w-full">
                            {!file ? (
                                <ImageUploader onUpload={handleUpload} maxFiles={1} accept={{ 'image/png': ['.png'] }} toolType="image" />
                            ) : (
                                <div className="w-full max-w-4xl mx-auto premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-6 mb-8 relative shadow-2xl">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600" />
                                    <div className="space-y-8">
                                        {/* Controls */}
                                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-5 bg-muted/30 rounded-3xl border border-border/50">
                                            <div className="flex items-center gap-4 w-full md:w-auto">
                                                <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
                                                    <FileType className="w-5 h-5" />
                                                </div>
                                                <div className="overflow-hidden text-sm">
                                                    <p className="font-bold text-foreground truncate max-w-[150px]">{file.name}</p>
                                                    <p className="text-xs text-muted-foreground">{formatBytes(file.size)} • PNG</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full md:w-1/3">
                                                <div className="flex justify-between text-sm font-bold text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Settings className="w-4 h-4" /> Quality</span>
                                                    <span>{Math.round(quality * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0.1"
                                                    max="1.0"
                                                    step="0.05"
                                                    value={quality}
                                                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </div>

                                        {/* Comparison */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider block text-center">Input (PNG)</span>
                                                <div className="relative aspect-video bg-checkerboard rounded-2xl overflow-hidden border shadow-inner flex items-center justify-center">
                                                    {previewUrl && (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img src={previewUrl} alt="Original PNG" className="max-w-full max-h-full object-contain" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <span className="text-sm font-bold text-primary uppercase tracking-wider block text-center">Output (JPG)</span>
                                                <div className={cn(
                                                    "relative aspect-video bg-white rounded-2xl overflow-hidden border-2 shadow-inner flex items-center justify-center transition-all",
                                                    jpgUrl ? "border-primary/20" : "border-dashed border-border opacity-50"
                                                )}>
                                                    {jpgUrl ? (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img src={jpgUrl} alt="Converted JPG" className="max-w-full max-h-full object-contain" />
                                                    ) : (
                                                        <div className="flex flex-col items-center text-muted-foreground/50">
                                                            <Scan className="w-12 h-12 mb-2 animate-pulse" />
                                                            <span className="text-sm font-bold">Processing...</span>
                                                        </div>
                                                    )}
                                                    {jpgUrl && (
                                                        <div className="absolute bottom-3 left-3 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-sm">
                                                            JPG • {jpgSize}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {jpgUrl && (
                                            <div className="flex justify-center pt-4 border-t border-border/10">
                                                <a
                                                    href={jpgUrl}
                                                    download={`${file.name.replace(/\.[^/.]+$/, "")}.jpg`}
                                                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-extrabold text-base hover:opacity-90 transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                                                >
                                                    <Download className="w-5 h-5" /> Download JPG File
                                                </a>
                                            </div>
                                        )}

                                        <div className="flex justify-center">
                                            <button onClick={() => { setFile(null); setJpgUrl(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                                Convert another PNG
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="w-full max-w-4xl mx-auto border-t pt-8 mt-4">
                                <ToolExtraContent
                                    whatDoesItDo={{
                                        title: "What this PNG to JPG Converter Does",
                                        content: `Imgverto's PNG to JPG Converter is a fast, browser-based tool designed to transform heavy, transparent PNG images into lightweight, universally compatible JPG files. While PNGs are excellent for preserving transparency (like logos with no background), they often result in massive file sizes that can slow down websites or exceed email attachment limits. Our tool automatically detects the transparent areas of your PNG and seamlessly replaces them with a solid white background (the standard fallback for JPGs), maintaining the visual integrity of your image while significantly reducing its storage footprint.

Because our converter process runs entirely locally within your browser using HTML5 Canvas technology, your files are never uploaded to our servers. This guarantees absolute privacy and near-instantaneous conversion speeds, even for high-resolution graphics.`
                                    }}
                                    whoIsItFor={{
                                        title: "Who Should Use This Tool",
                                        content: `This utility is practically mandatory for students and job seekers filling out online application forms (like SSC, UPSC, or university portals). These systems often strictly require passport photos and signature uploads to be in .jpg or .jpeg format and strictly limit file sizes (e.g., under 50KB). If you have a scanned signature that was saved as a PNG, this tool will instantly convert it to the correct format so your application isn't rejected.

It is also an essential tool for web developers and digital marketers. Converting large hero images or blog graphics from PNG to JPG is a fundamental SEO practice to improve page load speeds and enhance Core Web Vitals. Anyone looking to save hard drive space or prepare images for social media platforms that don't support transparent backgrounds will find this tool invaluable.`
                                    }}
                                    howToUse={{
                                        title: "How to Convert PNG to JPG Online",
                                        steps: [
                                            "Click the 'Upload' area or simply drag and drop your PNG file into the workspace.",
                                            "Our system instantly generates a preview of your image. You can adjust the 'Quality' slider if you need to compress the file further.",
                                            "The conversion happens automatically in real-time. You'll see a side-by-side comparison of the original PNG and the new JPG output.",
                                            "Check the new file size displayed on the output image to ensure it meets your requirements.",
                                            "Click the 'Download JPG File' button to save the converted image directly to your device."
                                        ]
                                    }}
                                    benefits={{
                                        title: "Benefits of Using Imgverto",
                                        items: [
                                            "Instant Conversion: No waiting for server uploads; the HTML5 canvas converts your image in milliseconds.",
                                            "100% Private: Your files stay on your device. We never store, read, or transfer your images to the cloud.",
                                            "Adjustable Quality: Use the intuitive slider to perfectly balance image clarity and file size reduction.",
                                            "Smart Transparency Handling: Automatically fills transparent PNG backgrounds with clean white for perfect JPG formatting.",
                                            "Zero Cost or Limits: Convert as many PNGs as you need, whenever you need them, absolutely free.",
                                            "No Quality Loss Surprises: The side-by-side preview ensures you know exactly what the final JPG will look like before downloading.",
                                            "Universal Device Support: Works flawlessly on Windows, Mac, iOS, and Android web browsers."
                                        ]
                                    }}
                                    faqs={[
                                        {
                                            question: "Will I lose transparency if I convert my PNG to JPG?",
                                            answer: "Yes. The JPG format does not support transparency. Our tool naturally replaces any transparent areas in your original PNG with a solid white background during the conversion process."
                                        },
                                        {
                                            question: "How do I reduce the file size of the new JPG?",
                                            answer: "Simply adjust the 'Quality' slider before downloading. Moving it to the left (e.g., to 70%) will slightly reduce the image quality but significantly decrease the resulting file size, which is perfect for online applications."
                                        },
                                        {
                                            question: "Is it safe to upload personal documents like ID cards?",
                                            answer: "Absolutely. Imgverto processes the conversion locally in your web browser. Your ID card is never uploaded to the internet or stored on our servers."
                                        },
                                        {
                                            question: "Why does an exam portal reject my PNG photo?",
                                            answer: "Most government and exam portals require JPG or JPEG formats because they are standardized and require less storage space on their servers. Use this tool to quickly convert your file and bypass this error."
                                        },
                                        {
                                            question: "Are there any limits on file size or usage?",
                                            answer: "There are no usage limits. You can convert an unlimited number of files for free. File size limits are only bound by the memory capacity of your device's browser."
                                        },
                                        {
                                            question: "What is the difference between JPG and JPEG?",
                                            answer: "There is no difference in the actual image data; they are the exact same format. The different extensions simply trace back to older Windows systems that only supported three-letter file extensions (.jpg)."
                                        }
                                    ]}
                                />
                                <RelatedTools currentPath="/png-to-jpg" />
                            </div>
                        </div>
                    </div>

                    {/* Right Ad */}
                    <div className="hidden lg:block">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>
                </div>
            </div>
        </Section >
    );
}
