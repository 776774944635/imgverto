"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Image as ImageIcon, FileType } from "lucide-react";
import { cn } from "@/lib/utils";

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function JpgToPngClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [pngUrl, setPngUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pngSize, setPngSize] = useState<string | null>(null);

    const handleUpload = (files: File[]) => {
        const f = files[0];
        if (f.type !== "image/jpeg" && f.type !== "image/jpg") {
            // Basic client check, though Uploader might handle accept prop
            // But valid to double check or just allow generic images to verify logic
        }
        setFile(f);
        setPngUrl(null);
        setPngSize(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
    };

    const handleConvert = () => {
        if (!file || !previewUrl) return;
        setIsProcessing(true);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                alert("Browser error.");
                setIsProcessing(false);
                return;
            }

            // Draw JPG to canvas
            ctx.drawImage(img, 0, 0);

            // Convert canvas to PNG
            canvas.toBlob((blob) => {
                if (blob) {
                    setPngUrl(URL.createObjectURL(blob));
                    setPngSize(formatBytes(blob.size));
                } else {
                    alert("Conversion failed.");
                }
                setIsProcessing(false);
            }, "image/png");
        };
        img.onerror = () => {
            alert("Failed to load image.");
            setIsProcessing(false);
        };
        img.src = previewUrl;
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="JPG to PNG Converter"
                description="Convert JPG images to high-quality PNG format instantly. Free, secure, and preserves image details with transparent-ready output."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-500" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }} />
                ) : (
                    <div className="space-y-10">
                        {/* Status Bar */}
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-muted/30 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                    <FileType className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground text-lg">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{formatBytes(file.size)} • JPG</p>
                                </div>
                            </div>

                            <button
                                onClick={handleConvert}
                                disabled={isProcessing || !!pngUrl}
                                className={cn(
                                    "px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center gap-3",
                                    pngUrl
                                        ? "bg-green-500 text-white cursor-default"
                                        : "bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
                                )}
                            >
                                {pngUrl ? (
                                    <>
                                        <Zap className="w-5 h-5" /> Converted!
                                    </>
                                ) : isProcessing ? (
                                    <>
                                        <Scan className="w-5 h-5 animate-spin" /> Converting...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" /> Convert to PNG
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Comparison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider block text-center">Input (JPG)</span>
                                <div className="relative aspect-video bg-checkerboard rounded-2xl overflow-hidden border shadow-inner flex items-center justify-center">
                                    {previewUrl && (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={previewUrl} alt="Original JPG" className="max-w-full max-h-full object-contain" />
                                    )}
                                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                                        JPG
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <span className="text-sm font-bold text-primary uppercase tracking-wider block text-center">Output (PNG)</span>
                                <div className={cn(
                                    "relative aspect-video bg-checkerboard rounded-2xl overflow-hidden border-2 shadow-inner flex items-center justify-center transition-all",
                                    pngUrl ? "border-primary/20 bg-white" : "border-dashed border-border opacity-50"
                                )}>
                                    {pngUrl ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={pngUrl} alt="Converted PNG" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground/50">
                                            <ImageIcon className="w-12 h-12 mb-2" />
                                            <span className="text-sm font-bold">Waiting to convert...</span>
                                        </div>
                                    )}
                                    {pngUrl && (
                                        <div className="absolute bottom-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shdaow-sm">
                                            PNG • {pngSize}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {pngUrl && (
                            <div className="flex justify-center pt-6 border-t border-border/10">
                                <a
                                    href={pngUrl}
                                    download={`${file.name.replace(/\.[^/.]+$/, "")}.png`}
                                    className="px-12 py-5 rounded-full bg-primary text-primary-foreground font-black text-xl hover:opacity-90 transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-6 h-6" /> Download PNG File
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => { setFile(null); setPngUrl(null); setPngSize(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                Convert another JPG
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate prose-lg dark:prose-invert mb-16">
                <h2>Why convert JPG to PNG?</h2>
                <p>
                    While JPG (JPEG) is excellent for photography due to its small size, it uses "lossy" compression which can create artifacts.
                    <strong>PNG (Portable Network Graphics)</strong> is a lossless format, meaning it preserves all image quality.
                    It is also the standard format for web graphics that require transparency and sharp text.
                </p>

                <h3>Benefits of PNG Format</h3>
                <ul>
                    <li><strong>Lossless Quality:</strong> No compression artifacts, ensuring crisp edges and details.</li>
                    <li><strong>Web Standard:</strong> Supported by all browsers and perfect for logos, screenshots, and diagrams.</li>
                    <li><strong>Stability:</strong> Saving a PNG repeatedly doesn't degrade its quality like JPG does.</li>
                </ul>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl my-8">
                    <p className="text-slate-800 m-0 font-medium">
                        <strong>Did you know?</strong> Converting JPG to PNG won't magically improve a blurry photo (you can't add data that isn't there),
                        but it <em>will</em> prevent any further quality loss when you edit or save it again.
                    </p>
                </div>

                <h3>How to use Imgverto JPG to PNG Converter?</h3>
                <ol>
                    <li>Click <strong>Upload Image</strong> or drag your JPG file onto the box.</li>
                    <li>Press the <strong>Convert to PNG</strong> button.</li>
                    <li>Our engine processes the image instantly in your browser.</li>
                    <li>Download your new high-quality PNG file.</li>
                </ol>
            </div>

            <FAQSection items={[
                { question: "Is this converter free?", answer: "Yes, Imgverto is 100% free to use." },
                { question: "Is it safe?", answer: "Yes! Your images are processed locally in your browser and are never uploaded to our servers." },
                { question: "Will I lose quality?", answer: "No. The conversion to PNG is lossless, so the visual quality remains exactly the same as the original JPG." },
                { question: "Can I convert multiple files?", answer: "Currently, we support converting one high-quality image at a time for maximum performance." }
            ]} />

            <RelatedTools currentPath="/jpg-to-png" />
        </Section>
    );
}
