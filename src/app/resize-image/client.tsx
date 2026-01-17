"use client";

import { useState, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function ResizeImageClient() {
    const [file, setFile] = useState<File | null>(null);
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [lockAspectRatio, setLockAspectRatio] = useState(true);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resizedUrl, setResizedUrl] = useState<string | null>(null);

    const handleUpload = (files: File[]) => {
        const f = files[0];
        setFile(f);
        setResizedUrl(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);

        const img = new Image();
        img.onload = () => {
            setOriginalWidth(img.width);
            setOriginalHeight(img.height);
            setWidth(img.width);
            setHeight(img.height);
        };
        img.src = url;
    };

    const handleWidthChange = (val: number) => {
        setWidth(val);
        if (lockAspectRatio && originalWidth > 0) {
            setHeight(Math.round((val / originalWidth) * originalHeight));
        }
    };

    const handleHeightChange = (val: number) => {
        setHeight(val);
        if (lockAspectRatio && originalHeight > 0) {
            setWidth(Math.round((val / originalHeight) * originalWidth));
        }
    };

    const handleResize = async () => {
        if (!file || !width || !height) return;
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("width", width.toString());
            formData.append("height", height.toString());

            const res = await fetch("/api/resize", {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error("Failed");
            const blob = await res.blob();
            setResizedUrl(URL.createObjectURL(blob));
        } catch (e) {
            alert("Resize failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Resize Image Online Free"
                description="Change image dimensions easily. Perfect for Instagram, passports, or website optimization with aspect ratio locking."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} />
                ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-6">
                                <h3 className="font-bold text-lg">New Dimensions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Width (px)</label>
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                            className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Height (px)</label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                            className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg border transition-all",
                                        lockAspectRatio ? "bg-primary/10 border-primary text-primary" : "text-muted-foreground border-border"
                                    )}
                                >
                                    {lockAspectRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                    Lock Aspect Ratio
                                </button>

                                <button
                                    onClick={handleResize}
                                    disabled={isProcessing}
                                    className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95"
                                >
                                    {isProcessing ? "Resizing..." : "Resize Image Now"}
                                </button>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg">Preview</h3>
                                {previewUrl && (
                                    <div className="relative max-w-full max-h-[400px] border shadow-md bg-checkerboard rounded-xl overflow-hidden flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="max-w-full max-h-[400px] object-contain"
                                        />
                                    </div>
                                )}
                                <p className="text-center text-xs text-muted-foreground">Original: {originalWidth}x{originalHeight} | Size: {formatBytes(file.size)}</p>
                            </div>
                        </div>

                        {resizedUrl && (
                            <div className="flex justify-center pt-8 border-t border-border/10">
                                <a
                                    href={resizedUrl}
                                    download={`resized-${width}x${height}-${file.name}`}
                                    className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-black text-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-6 h-6" /> Download Resized Image
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => { setFile(null); setResizedUrl(null); }} className="text-sm text-muted-foreground underline">Resize another image</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate dark:prose-invert mb-12">
                <h2>Why use our Online Image Resizer?</h2>
                <p>
                    Whether you need to <strong>resize image for instagram</strong>, optimize photos for your blog, or change dimensions for a passport photo, our tool makes it effortless.
                    You can <strong>change photo dimensions</strong> while locking the aspect ratio to prevent distortion. Everything works directly in your browser, keeping your data secure.
                </p>
                <h3>Features</h3>
                <ul>
                    <li><strong>Pixel-Perfect:</strong> Enter exact width and height.</li>
                    <li><strong>Aspect Ratio Lock:</strong> Keep your photos looking natural.</li>
                    <li><strong>No Quality Loss:</strong> Uses high-quality resampling filters.</li>
                </ul>
            </div>

            <FAQSection items={[
                { question: "Is this image resizer free?", answer: "Yes, it is completely free to use without limits." },
                { question: "How do I keep the image from looking stretched?", answer: "Enable the 'Lock Aspect Ratio' button. This automatically updates one dimension when you change the other." },
                { question: "Can I resize PNGs?", answer: "Yes, we support JPG, PNG, and WebP." },
                { question: "What is the best size for Instagram?", answer: "For posts, 1080x1080 (square) or 1080x1350 (portrait) is recommended." }
            ]} />

            <RelatedTools currentPath="/resize-image" />
        </Section>
    );
}
