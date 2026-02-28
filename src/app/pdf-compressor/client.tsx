"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Archive } from "lucide-react";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AdPlaceholder } from "@/components/shared/AdPlaceholder";

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
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0">
                    <Breadcrumbs items={[{ label: "PDF Compressor", href: "/pdf-compressor" }
                    ]} />
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
                                title="Compress PDF Online Free"
                                description="Reduce PDF file size online without losing quality for fast and secure optimization."
                            />
                        </div>

                        {!file ? (
                            <ImageUploader
                                onUpload={handleUpload}
                                maxFiles={1}
                                accept={{ 'application/pdf': ['.pdf'] }}
                                toolType="pdf"
                            />
                        ) : (
                            <div className="w-full max-w-4xl mx-auto premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-6 mb-8 relative shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
                                <div className="flex flex-col items-center space-y-6">
                                    <div className="text-center space-y-2">
                                        <Archive className="w-12 h-12 text-primary mx-auto" />
                                        <p className="font-bold text-base truncate max-w-md">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                                    </div>

                                    {!compressedBlob ? (
                                        <button
                                            onClick={handleCompress}
                                            disabled={isProcessing}
                                            className="px-8 py-3 bg-primary text-primary-foreground font-extrabold text-base rounded-full hover:opacity-90 flex items-center gap-2 transition-transform active:scale-95 shadow-xl"
                                        >
                                            {isProcessing ? "Compressing..." : "Compress PDF Now"}
                                        </button>
                                    ) : (
                                        <div className="space-y-4 w-full max-w-sm">
                                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center">
                                                <p className="text-xs text-green-700 dark:text-green-300 mb-1">Compression Complete!</p>
                                                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatBytes(compressedBlob.size)}</p>
                                                <p className="text-[10px] text-green-600/80 mt-1">
                                                    Saved {Math.max(0, Math.round((1 - compressedBlob.size / file.size) * 100))}%
                                                </p>
                                            </div>

                                            <button
                                                onClick={handleDownload}
                                                className="w-full px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-full hover:opacity-90 flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl"
                                            >
                                                <Download className="w-5 h-5" /> Download
                                            </button>

                                            <button onClick={() => { setFile(null); setCompressedBlob(null); }} className="w-full text-xs text-muted-foreground underline">
                                                Process another file
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="w-full max-w-4xl mx-auto">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "What this PDF Compressor Tool Does",
                                    content: `Imgverto's PDF Compressor is a sophisticated optimization engine designed to shrink the digital footprint of your documents without sacrificing their professional appearance. PDF files often become 'bloated' due to high-resolution embedded images, redundant font information, and excess metadata that isn't necessary for viewing or printing. Our tool performs a deep audit of the PDF's internal structure to identify these inefficiencies.

Especially for government portals like SSC (Staff Selection Commission), UPSC, and State PSCs, file size limits are often as low as 200KB or 500KB. Simply saving a Word file as PDF often results in a file larger than 1MB. Our tool uses intelligent downsampling to reduce the DPI of large images to a web-standard resolution (typically 150-720 DPI) while consolidating duplicate font data. The result is a 'lean' version of your file that looks almost identical to the original but meets all official upload requirements.`
                                }}
                                whoIsItFor={{
                                    title: "Who Should Use This Tool",
                                    content: `This tool is a lifesaver for students, job seekers, and professionals. Competitive exam candidates for NEET, JEE Main, and BPSC often face strict size limits for uploading certificates and category documents. If your scanned 10th-grade marksheet or caste certificate is 1MB, it won't be accepted by the portal. Imgverto brings it under the 200KB limit in seconds.

Business professionals also use the compressor to prepare large reports and presentations for email, ensuring that messages don't bounce back due to 'attachment size' limits. Whether you are filing your taxes on the Income Tax portal or submitting a project report at college, this tool ensures your PDFs are small and fast.`
                                }}
                                howToUse={{
                                    title: "How to Use the Free Online PDF Compressor",
                                    steps: [
                                        "Click the 'Upload' button or drag your PDF file into the interface. Our tool will immediately display the original starting file size.",
                                        "Click the 'Compress PDF Now' button. Our automated engine will begin analyzing the document's images and data structures.",
                                        "Watch the progress bar as our optimization algorithms perform deep-level data reduction on your file.",
                                        "Review the final statistics. We'll show you exactly how many megabytes were saved and the percentage of reduction achieved.",
                                        "Click the 'Download' button to claim your optimized PDF. Your new, smaller file is now ready for email, upload, or storage."
                                    ]
                                }}
                                benefits={{
                                    title: "Benefits of Using Imgverto",
                                    items: [
                                        "Smart Image Downsampling: Reduce the weight of photos within your PDF while maintaining sharp, legible text.",
                                        "Meet Upload Limits: Easily satisfy the 'Maximum File Size' requirements of government, university, and job portals.",
                                        "Improved Load Times: Optimized PDFs open faster on mobile devices and slow internet connections.",
                                        "Privacy-First Processing: We prioritize your data security. Files are processed through secure channels and aren't permanently stored.",
                                        "No Quality Sacrifice: Our 'Sweet Spot' compression ensures that your documents still look high-quality when printed.",
                                        "100% Free Service: Use our professional-grade compression tools without any subscriptions or daily limits.",
                                        "Cross-Platform Ready: Works perfectly on any device with a browser—no need to install complex PDF utility software."
                                    ]
                                }}
                                faqs={[
                                    {
                                        question: "Is this online PDF compressor free to use?",
                                        answer: "Yes, Imgverto's PDF compressor is 100% free. You can compress multiple files without any subscription or hidden fees. It is perfect for candidates applying for government exams who need to resize documents quickly."
                                    },
                                    {
                                        question: "How much can I reduce my PDF size?",
                                        answer: "The reduction depends on the original file. PDFs with many images can often be reduced by 70-90%. For Indian exam forms like SSC or UPSC, where limits are often 200KB, our tool helps you reach that target while keeping text legible."
                                    },
                                    {
                                        question: "Will the quality of my certificates decrease?",
                                        answer: "Our tool uses smart compression that preserves text and clarity. While it reduces the file size, it ensures that your educational certificates and identity proofs remain clear enough for official verification."
                                    },
                                    {
                                        question: "Can I compress PDF for NEET and JEE application forms?",
                                        answer: "Absolutely. Many NTA and state-level entrance exam portals have strict PDF size limits (e.g., between 10KB to 300KB). Our tool is specifically optimized to help students meet these exact requirements."
                                    },
                                    {
                                        question: "Is it safe to upload my Aadhar or PAN card PDF?",
                                        answer: "Security is our top priority. All files are processed through an encrypted connection and are automatically deleted from our servers after processing. We do not store or view your personal documents."
                                    },
                                    {
                                        question: "Does this work on mobile for quick uploads?",
                                        answer: "Yes, Imgverto is fully mobile-optimized. You can scan a document using your phone, compress the PDF on our site, and upload it directly to the recruitment portal from your mobile browser."
                                    },
                                    {
                                        question: "What is the maximum file size I can upload?",
                                        answer: "You can upload files up to 50MB for compression. This is usually more than enough for any academic or professional document that needs optimization for web submission."
                                    }
                                ]}
                            />
                        </div>
                        <div className="w-full max-w-4xl mx-auto border-t pt-8 mt-4">
                            <RelatedTools currentPath="/pdf-compressor" />
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
