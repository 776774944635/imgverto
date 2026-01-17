"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Archive } from "lucide-react";

function formatBytes(bytes: number) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function PdfCompressorClient() {
    const [file, setFile] = useState<File | null>(null);
    const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = (files: File[]) => {
        setFile(files[0]);
        setCompressedBlob(null);
    };

    const handleCompress = async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/pdf-compressor", { method: "POST", body: formData });
            if (!res.ok) throw new Error("Failed");

            const blob = await res.blob();
            setCompressedBlob(blob);
        } catch (e) {
            alert("Compression failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!compressedBlob) return;
        const url = URL.createObjectURL(compressedBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `compressed-${file?.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Compress PDF Online Free"
                description="Reduce PDF file size online without losing quality. The best free PDF compressor for fast, secure optimization."
            />

            <div className="w-full max-w-3xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
                {!file ? (
                    <ImageUploader
                        onUpload={handleUpload}
                        maxFiles={1}
                        accept={{ 'application/pdf': ['.pdf'] }}
                    />
                ) : (
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-center space-y-2">
                            <Archive className="w-16 h-16 text-primary mx-auto" />
                            <p className="font-medium text-lg truncate max-w-md">{file.name}</p>
                            <p className="text-muted-foreground">{formatBytes(file.size)}</p>
                        </div>

                        {!compressedBlob ? (
                            <button
                                onClick={handleCompress}
                                disabled={isProcessing}
                                className="px-10 py-4 bg-primary text-primary-foreground font-black text-lg rounded-full hover:opacity-90 flex items-center gap-2 transition-transform active:scale-95 shadow-xl"
                            >
                                {isProcessing ? "Compressing..." : "Compress PDF Now"}
                            </button>
                        ) : (
                            <div className="space-y-6 w-full max-w-sm">
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
                                    <p className="text-sm text-green-700 dark:text-green-300 mb-1">Compression Complete!</p>
                                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatBytes(compressedBlob.size)}</p>
                                    <p className="text-xs text-green-600/80 mt-1">
                                        Saved {Math.max(0, Math.round((1 - compressedBlob.size / file.size) * 100))}%
                                    </p>
                                </div>

                                <button
                                    onClick={handleDownload}
                                    className="w-full px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:opacity-90 flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl"
                                >
                                    <Download className="w-5 h-5" /> Download
                                </button>

                                <button onClick={() => { setFile(null); setCompressedBlob(null); }} className="w-full text-sm text-muted-foreground underline">
                                    Process another file
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate dark:prose-invert mb-12">
                <h2>Why Compress PDF Files Online?</h2>
                <p>
                    Large PDF documents can be difficult to share via email or upload to web portals.
                    Our tool allows you to <strong>reduce PDF size</strong> quickly while maintaining the integrity of your text and images.
                    It is a <strong>free PDF compressor</strong> that works directly in your browser, ensuring your files remain private.
                </p>
                <h3>Top Benefits</h3>
                <ul>
                    <li><strong>Online & Free:</strong> No software installation or registration required.</li>
                    <li><strong>Efficient Size Reduction:</strong> Significant reduction for web-ready files.</li>
                    <li><strong>Privacy Guaranteed:</strong> Files are processed securely.</li>
                </ul>
                <h3>How to Compress PDF Online Free?</h3>
                <ol>
                    <li>Upload your PDF file using the tool above.</li>
                    <li>Wait for our engine to handle the optimization.</li>
                    <li>Download your significantly smaller PDF file instantly.</li>
                </ol>
            </div>

            <FAQSection items={[
                { question: "Is this PDF compressor free?", answer: "Yes, Imgverto provides a completely free tool to compress PDF files online." },
                { question: "How does it work?", answer: "We optimize the internal structure of the PDF file to remove redundant data while keeping visual quality high." },
                { question: "Will quality be affected?", answer: "Our compressor uses smart optimization techniques to reduce size with minimal impact on readability and image quality." },
                { question: "Is it secure?", answer: "Absolutely. We don't store your files on our servers permanently; processing happens securely." }
            ]} />

            <RelatedTools currentPath="/pdf-compressor" />
        </Section>
    );
}
