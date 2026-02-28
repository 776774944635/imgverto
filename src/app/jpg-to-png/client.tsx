"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Image as ImageIcon, FileType } from "lucide-react";
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

export function JpgToPngClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [pngUrl, setPngUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pngSize, setPngSize] = useState<string | null>(null);

    const handleUpload = (files: File[]) => {
        const f = files[0];
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
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0 px-0 lg:px-[160px]">
                    <Breadcrumbs items={[{ label: "JPG to PNG", href: "/jpg-to-png" }]} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-6">
                    {/* Left Ad */}
                    <div className="hidden lg:block pt-4">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center pt-4">
                        <div className="w-full text-center mb-1">
                            <ToolHeader
                                title="Convert JPG to PNG"
                                description="Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!"
                            />
                            <div className="flex justify-center mt-2">
                                <AdPlaceholder className="w-[728px] h-[90px]" />
                            </div>
                        </div>

                        <div className="w-full">
                            {!file ? (
                                <ImageUploader onUpload={handleUpload} maxFiles={1} accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }} toolType="image" />
                            ) : (
                                <div className="w-full max-w-4xl mx-auto premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-6 mb-8 relative shadow-2xl">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                                    <div className="space-y-8">
                                        {/* Status Bar */}
                                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-5 bg-muted/30 rounded-3xl border border-border/50">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                                                    <FileType className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">{file.name}</p>
                                                    <p className="text-xs text-muted-foreground">{formatBytes(file.size)} • JPG</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleConvert}
                                                disabled={isProcessing || !!pngUrl}
                                                className={cn(
                                                    "px-8 py-3 rounded-2xl font-extrabold text-base transition-all shadow-xl flex items-center gap-3",
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
                                            <div className="flex justify-center pt-4 border-t border-border/10">
                                                <a
                                                    href={pngUrl}
                                                    download={`${file.name.replace(/\.[^/.]+$/, "")}.png`}
                                                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-extrabold text-base hover:opacity-90 transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                                                >
                                                    <Download className="w-5 h-5" /> Download PNG File
                                                </a>
                                            </div>
                                        )}

                                        <div className="flex justify-center">
                                            <button onClick={() => { setFile(null); setPngUrl(null); setPngSize(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                                Convert another JPG
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full max-w-4xl mx-auto border-t pt-8 mt-4">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "What this JPG to PNG Converter Does",
                                    content: `Imgverto's JPG to PNG Converter is a specialized rendering engine that transforms your standard JPEG images into high-quality PNG files. While JPG is excellent for general photography, it uses 'lossy' compression which can lead to artifacts around sharp edges and text over time. PNG, or 'Portable Network Graphics,' uses 'lossless' compression, meaning every single pixel of the original data is preserved perfectly.

Our tool is particularly valuable for those working with logos, infographics, and scanned documents. When you convert a JPG to PNG, you stop the 'generation loss' that occurs every time a JPG is saved. The converter processes the complex color matrices of your JPEG and translates them into the robust PNG format, which supports higher bit-depths and better color accuracy. This ensures that your digital assets remain crisp and professional, whether they are being used in a high-end presentation or uploaded to a corporate website.`
                                }}
                                whoIsItFor={{
                                    title: "Who Should Use This Tool",
                                    content: `This utility is a favorite among graphic designers and web developers who need to ensure their assets are stored in a lossless format for future editing. If you have a high-quality product photo or a brand logo that was accidentally saved as a JPG, converting it to PNG helps stabilize the quality for use across various marketing materials.

Candidates applying for government exams also find this tool useful. Many official portals in India have specific format requirements for documents—some ask for JPG, while others specifically request PNG for clarity in scanned certificates. Imgverto allows these users to switch between formats instantly and for free. It is for anyone who values visual precision and needs a reliable way to bridge the gap between common image formats.`
                                }}
                                howToUse={{
                                    title: "How to Use the Free Online JPG to PNG Converter",
                                    steps: [
                                        "Click the 'Upload' button or drag your JPG file into the tool. You can see a live preview of the image almost immediately.",
                                        "Click the 'Convert to PNG' button. Our engine will begin the lossless translation process, ensuring every pixel is accurately mapped.",
                                        "Wait for the conversion to complete. You will see a success message once the new PNG file is ready for download.",
                                        "Review the final image in the preview box to ensure it looks exactly as you expect.",
                                        "Click the 'Download PNG' button to save the new version of your file. Your image is now in a high-quality, lossless format ready for any project."
                                    ]
                                }}
                                benefits={{
                                    title: "Benefits of Using Imgverto",
                                    items: [
                                        "Lossless Precision: Convert your files without losing any detail, ensuring your images stay sharp and professional.",
                                        "Universal Compatibility: PNG files created by Imgverto are 100% compatible with all modern browsers and design software.",
                                        "No Artifacts: Stop the compression noise associated with JPEG files and enjoy clean, clear graphics.",
                                        "Privacy Protected: We use secure connections and automatically delete your files shortly after processing.",
                                        "100% Free: Use our professional-grade conversion tools as many times as you need without any daily limits or hidden costs.",
                                        "Zero Watermarks: We believe your images belong to you. We never add logos or watermarks to your converted files.",
                                        "Lightning Fast: Our optimized processing engine delivers your converted PNG in just a few seconds."
                                    ]
                                }}
                                faqs={[
                                    {
                                        question: "Will converting JPG to PNG make the image look better?",
                                        answer: "Conversion won't 'add' detail that wasn't in the original JPG, but it will prevent the image from losing ANY more quality during future saves. It's the best way to 'freeze' the quality of your images."
                                    },
                                    {
                                        question: "Is PNG better than JPG for logos?",
                                        answer: "Yes, definitely. PNG is much better for logos and graphics with text because it doesn't create 'blurry artifacts' around sharp edges like JPG does."
                                    },
                                    {
                                        question: "Can I convert my photo for a government exam portal?",
                                        answer: "Absolutely. Many portals like SSC or UPSC might have specific format requirements. Use Imgverto to quickly switch your photo to the required PNG format."
                                    },
                                    {
                                        question: "Is the JPG to PNG converter free?",
                                        answer: "Yes, Imgverto's converter is 100% free to use. There are no subscriptions or usage limits."
                                    },
                                    {
                                        question: "Does the PNG format support transparency?",
                                        answer: "Yes, PNG supports transparency, but a standard JPG doesn't have transparency data. After converting a JPG to PNG, you can use an image editor to remove the background easily."
                                    },
                                    {
                                        question: "What is the maximum file size I can upload?",
                                        answer: "We support JPG uploads up to 20MB, which is more than enough for most high-resolution photos and scanned documents."
                                    },
                                    {
                                        question: "How long does the conversion take?",
                                        answer: "Our tool works instantly. Most conversions are completed in less than two seconds, depending on your internet connection."
                                    }
                                ]}
                            />

                            <RelatedTools currentPath="/jpg-to-png" />
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
