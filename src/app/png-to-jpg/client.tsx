"use client";

import { useState, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Image as ImageIcon, FileType, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

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

            <div className="w-full max-w-3xl prose prose-slate prose-lg dark:prose-invert mb-16">
                <h2>Fast PNG to JPG Conversion</h2>
                <p>
                    Convert your <strong>PNG images to JPG</strong> format instantly with Imgverto.
                    Whether you need to reduce file size for a website or ensure compatibility with legacy software,
                    our tool makes it simple.
                </p>

                <h3>When to use JPG instead of PNG?</h3>
                <ul>
                    <li><strong>Photography:</strong> JPG is optimized for real-world photos with complex colors.</li>
                    <li><strong>Email & Web:</strong> JPG files are significantly smaller, making them load faster.</li>
                    <li><strong>Compatibility:</strong> JPG is the most widely supported image format in existence.</li>
                </ul>

                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl my-8">
                    <p className="text-blue-800 m-0 font-medium">
                        <strong>Quality Control:</strong> Use the slider above to balance quality vs file size.
                        A quality of <strong>80%</strong> is usually the sweet spot for web use!
                    </p>
                </div>
            </div>

            <FAQSection items={[
                { question: "Is this converter free?", answer: "Yes, Imgverto provides unlimited free conversions." },
                { question: "What happens to transparency?", answer: "JPG does not support transparency. Transparent areas will turn white." },
                { question: "Can I use this on my phone?", answer: "Absolutely! Our tool works perfectly on iOS and Android browsers." },
                { question: "Is my data private?", answer: "Yes. All conversion happens locally in your browser. No files are uploaded." }
            ]} />

            <RelatedTools currentPath="/png-to-jpg" />
        </Section>
    );
}
