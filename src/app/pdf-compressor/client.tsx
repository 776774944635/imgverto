"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Archive } from "lucide-react";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";

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

            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this PDF Compressor Tool Does",
                    content: `Imgverto's PDF Compressor is a sophisticated optimization engine designed to shrink the digital footprint of your documents without sacrificing their professional appearance. PDF files often become 'bloated' due to high-resolution embedded images, redundant font information, and excess metadata that isn't necessary for viewing or printing. Our tool performs a deep audit of the PDF's internal structure to identify these inefficiencies.

Specifically, the compressor uses intelligent downsampling to reduce the DPI (dots per inch) of large images to a web-standard resolution (typically 150-720 DPI). It also streamlines the document's resource dictionary—consolidating duplicate font data and removing non-essential document history. The result is a 'lean' version of your file that looks almost identical to the original but occupies significantly less storage space, making it perfect for rapid sharing and archival.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `This tool is a lifesaver for job seekers and college applicants who are frequently faced with strict 2MB or 5MB file size limits on upload portals. If your beautifully designed resume or portfolio is just a few megabytes too large, Imgverto can bring it under the limit in seconds. Business professionals also use the compressor to prepare large slide decks and reports for email distribution, ensuring that their messages don't bounce back due to 'attachment size' restrictions.

Public sector workers and legal clerks use the tool to optimize massive case files for digital filing systems, saving gigabytes of server space over time. Even for individual users, compressing a library of PDF ebooks or scanned manuals can free up valuable space on tablets and e-readers. If you've ever been frustrated by slow document loading times or storage limits, our compressor is the remedy.`
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
                        question: "How much will my PDF be reduced in size?",
                        answer: "The reduction depends on the original content. Documents with many high-res images can often be shrunken by 70-90%. Files that are primarily text will see a smaller reduction, typically around 10-30%, as text is already highly efficient."
                    },
                    {
                        question: "Will the text in my PDF become blurry?",
                        answer: "No. Our compression algorithms are designed to protect text and vector elements (like logos). We primarily focus on optimizing the heavy image data, so your document remains perfectly readable."
                    },
                    {
                        question: "Can I choose the level of compression?",
                        answer: "To keep the experience fast and simple, we apply a 'Universal Optimization' profile that balances size and quality perfectly for 99% of users. This eliminates the guesswork of choosing complex technical settings."
                    },
                    {
                        question: "Is there a limit to the size of the PDF I can upload?",
                        answer: "You can upload PDFs up to 50MB for free. For files larger than this, we recommend merging or splitting files first to maintain optimal processing speed."
                    },
                    {
                        question: "Does the PDF Compressor work on scanned documents?",
                        answer: "Yes! Scanned documents are often the largest files because they are essentially just large images in a PDF wrapper. Imgverto is extremely effective at reducing the size of these types of files."
                    },
                    {
                        question: "Will my PDF's layout or fonts change?",
                        answer: "No. The structural integrity of the pages, the layout of the text, and the font embedding remain exactly as they were. We only optimize how the data is stored, not the document's visual design."
                    }
                ]}
            />

            <RelatedTools currentPath="/pdf-compressor" />
        </Section>
    );
}
