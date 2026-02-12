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
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="PNG to JPG Converter"
                description="Convert transparent PNGs to JPG online. Control compression quality and reduce file size instantly."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} accept={{ 'image/png': ['.png'] }} />
                ) : (
                    <div className="space-y-10">
                        {/* Controls */}
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-6 bg-muted/30 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                                    <FileType className="w-6 h-6" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-bold text-foreground text-lg truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{formatBytes(file.size)} • PNG</p>
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
                            <div className="flex justify-center pt-6 border-t border-border/10">
                                <a
                                    href={jpgUrl}
                                    download={`${file.name.replace(/\.[^/.]+$/, "")}.jpg`}
                                    className="px-12 py-5 rounded-full bg-primary text-primary-foreground font-black text-xl hover:opacity-90 transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-6 h-6" /> Download JPG File
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => { setFile(null); setJpgUrl(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                Convert another PNG
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this PNG to JPG Converter Does",
                    content: `Imgverto's PNG to JPG Converter is a high-speed formatting tool that transforms your 'heavier' Portable Network Graphics (PNG) files into the universally recognized and highly compressed JPEG (JPG) format. PNG files are fantastic for design because they are lossless and support transparency, but these features come at the cost of significantly larger file sizes. Our converter bridges this gap by re-encoding your image data using the JPEG standard.

The conversion process involves complex mathematical transforms that prioritize efficiency. Since JPG does not support alpha channels (transparency), our tool intelligently applies a solid white background to any transparent areas of your PNG, ensuring the final image looks clean and professional. You also have full control over the compression 'Quality' slider. By adjusting this, you can decide exactly how much data should be discarded in exchange for a smaller file size, allowing you to optimize your images specifically for their intended use case.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `This tool is primarily for candidates preparing for UPSC, SSC, and Banking exams. Many application forms explicitly state 'Only JPG/JPEG files allowed.' If your mobile phone or scanner produced a PNG file, you can use Imgverto to format it correctly for the upload.

Web developers also use this tool to optimize their site speed. Since JPGs are typically 10 times smaller than PNGs for photographic content, converting helps in achieving better SEO scores. Whether you are a student or a digital marketer, this converter provides the simplest way to prepare 'web-ready' images.`
                }}
                howToUse={{
                    title: "How to Use the Free PNG to JPG Converter",
                    steps: [
                        "Click the 'Upload' button or drag your PNG file into the workspace. Our tool will immediately display the original file size.",
                        "Use the 'Quality' slider to set your desired compression level. 90% is excellent for quality, while 70-80% is the 'sweet spot' for web performance.",
                        "Watch as the conversion happens in real-time. Our automated engine updates the output JPG file every time you adjust the quality slider.",
                        "Compare the original PNG with the preview of the new JPG. Check for any 'artifacts' in the high-contrast areas to ensure you're happy with the result.",
                        "Click 'Download JPG File' to save the optimized image. The file is now ready for email, social media, or website integration."
                    ]
                }}
                benefits={{
                    title: "Benefits of Using Imgverto",
                    items: [
                        "Massive Size Reduction: Cut your image file sizes by up to 90%, freeing up significant storage and bandwidth.",
                        "Real-Time Previews: See exactly how your JPG will look as you adjust the quality settings—before you download.",
                        "Auto-Transparency Handling: We automatically apply a clean white background to transparent PNGs for a seamless transition.",
                        "Unrivaled Compatibility: JPG is supported by 100% of modern software and devices, from smart TVs to legacy office apps.",
                        "Full Quality Control: You decide the balance between file size and visual fidelity with our granular quality slider.",
                        "Zero Cost: Convert an unlimited number of PNGs to JPGs without ever paying a cent or watching an ad.",
                        "Browser-Based Security: Your data is never uploaded to a server. All conversion logic runs locally on your own hardware."
                    ]
                }}
                faqs={[
                    {
                        question: "Why should I convert PNG to JPG for an exam form?",
                        answer: "Most Indian government and entrance exam portals (like NTA, SSC, UPSC) only accept JPG or JPEG formats. PNG files, while high quality, are often rejected because of their larger size and transparency support."
                    },
                    {
                        question: "What happens to the transparent background in my PNG?",
                        answer: "Because the JPG format does not support transparency, Imgverto automatically fills those areas with solid white. This ensures your photo remains clear and compliant with official requirements."
                    },
                    {
                        question: "How do I ensure my JPG meets the 50KB limit?",
                        answer: "After the conversion, use our 'Quality' slider. Reducing quality to 80% or 90% can significantly drop the file size without any noticeable loss in clarity, helping you meet the strict limits of exam portals."
                    },
                    {
                        question: "Can I use this for NEET and JEE Main photo upload?",
                        answer: "Yes, this tool is perfect for converting your admission photos or signature scans into the JPG format required by NTA portals."
                    },
                    {
                        question: "Is it safe to convert my identity documents here?",
                        answer: "Absolutely. Imgverto processes your images locally in your browser. This means your files never leave your computer, providing the highest level of privacy for your sensitive documents."
                    },
                    {
                        question: "Does converting PNG to JPG reduce quality?",
                        answer: "JPG uses 'lossy' compression, so there is a minor loss of data. However, at a high quality setting (above 80%), the visual difference is virtually zero for the human eye."
                    },
                    {
                        question: "Is this converter free and unlimited?",
                        answer: "Yes, you can convert as many PNG files to JPG as you need. We do not require any sign-up or payments."
                    },
                    {
                        question: "Can I convert the JPG back to PNG later?",
                        answer: "Yes, but remember that the initial compression from the first conversion cannot be reversed. The new PNG will simply be a larger file of the current image."
                    }
                ]}
            />

            <RelatedTools currentPath="/png-to-jpg" />
        </Section>
    );
}
