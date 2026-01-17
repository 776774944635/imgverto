"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, RefreshCw } from "lucide-react";

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function CompressImageClient() {
    const [file, setFile] = useState<File | null>(null);
    const [quality, setQuality] = useState(80);
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
    const [compressedSize, setCompressedSize] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = (files: File[]) => {
        setFile(files[0]);
        setCompressedUrl(null);
    };

    const handleCompress = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("quality", quality.toString());

            const response = await fetch("/api/compress", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Compression failed");

            const blob = await response.blob();
            setCompressedUrl(URL.createObjectURL(blob));
            setCompressedSize(blob.size);
        } catch (error) {
            alert("Error compressing image");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Free Online Image Compressor"
                description="Reduce image file size instantly. Optimize your JPG, PNG, and WebP images for free without losing quality."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} />
                ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg">Compression Settings</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <label>Quality</label>
                                        <span className="font-bold">{quality}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>
                                <button
                                    onClick={handleCompress}
                                    disabled={isProcessing}
                                    className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
                                >
                                    {isProcessing ? "Processing..." : "Compress Image Now"}
                                    {!isProcessing && <RefreshCw className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="p-6 bg-secondary/30 rounded-2xl border flex flex-col items-center justify-center text-center space-y-2">
                                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Original Size</p>
                                <p className="text-2xl font-black">{formatBytes(file.size)}</p>
                                {compressedSize && (
                                    <div className="pt-4 mt-4 border-t w-full">
                                        <p className="text-sm text-green-600 font-bold uppercase">Compressed Size</p>
                                        <p className="text-2xl font-black text-green-600">{formatBytes(compressedSize)}</p>
                                        <p className="text-xs font-medium text-green-600/80">
                                            Saved {Math.round((1 - compressedSize / file.size) * 100)}%
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {compressedUrl && (
                            <div className="flex justify-center pt-4">
                                <a
                                    href={compressedUrl}
                                    download={`compressed-${file.name}`}
                                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-5 h-5" /> Download Compressed Image
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => setFile(null)} className="text-sm text-muted-foreground underline">Upload another image</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate dark:prose-invert mb-12">
                <h2>Optimize Images for Web & Speed</h2>
                <p>
                    Large images can slow down your website and consume mobile data. Our <strong>online image compressor</strong> allows you to shrink file sizes up to 80% with minimal visual difference.
                    Target <strong>JPEG, PNG, and WebP</strong> formats easily and for free. Secure, fast, and no signup needed.
                </p>
                <h3>Why use Imgverto Compressor?</h3>
                <ul>
                    <li><strong>Lossless & Lossy:</strong> Smart balance between file size and quality.</li>
                    <li><strong>Bulk Friendly:</strong> Coming soon, but fast individual processing now.</li>
                    <li><strong>Privacy First:</strong> No files are stored permanently.</li>
                </ul>
            </div>

            <FAQSection items={[
                { question: "Is it really free?", answer: "Yes, our image compressor is 100% free to use." },
                { question: "Which formats are supported?", answer: "We support JPG, PNG, and WebP files." },
                { question: "Will my images lose quality?", answer: "Our algorithm is optimized to maintain high visual fidelity even at lower quality settings." },
                { question: "What is the maximum file size?", answer: "You can upload images up to 10MB each." }
            ]} />

            <RelatedTools currentPath="/compress-image" />
        </Section>
    );
}
