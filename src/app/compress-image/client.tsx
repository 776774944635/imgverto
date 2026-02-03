"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, RefreshCw } from "lucide-react";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";

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

            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this Image Compressor Tool Does",
                    content: `Imgverto's Image Compressor is a powerful tool designed to reduce the digital footprint of your photos without sacrificing their visual integrity. Every image file contains a vast amount of data, some of which is essential for what you see, and some of which is redundant or invisible to the naked eye. Our compressor uses advanced algorithms to perform both lossy and lossless compression. 

Lossless compression works by removing metadata and finding more efficient ways to store pixel data without losing a single bit of information. Lossy compression, on the other hand, strategically discards data that the human eye is less likely to notice, allowing for much more significant reductions in file size. By adjusting the quality slider, you can control this balance, finding the perfect 'sweet spot' for your specific needs. This process is essential for modern web development, where fast loading times are a critical factor in user experience and search engine optimization (SEO).

The tool handles the three most popular web formats: JPEG, PNG, and WebP. For JPEG files, it optimizes the quantization tables; for PNG, it reduces the color palette and optimizes the compression blocks; and for WebP, it leverages Google's advanced predictive coding. Unlike many other services, Imgverto processes these files quickly and securely, providing you with a download link the moment the compression is finished.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `The Image Compressor is a must-have for web developers and designers who are obsessed with PageSpeed Insights scores and Core Web Vitals. Large images are the leading cause of slow websites, and this tool helps eliminate that bottleneck. Bloggers and content creators using platforms like WordPress or Shopify will find it invaluable for keeping their page weights down, ensuring that their readers have a smooth experience even on slow mobile connections.

Social media managers also benefit greatly from compression. Many platforms have strict file size limits for uploads, and our tool allows you to stay under those limits while maintaining professional-looking visuals. Even casual users who are running out of storage space on their cloud drives (like Google Drive or iCloud) or who want to send multiple photos via email can use Imgverto to shrink their files before sending or archiving. If you work with images in any professional or personal capacity, our compressor will save you bandwidth and storage space every single day.`
                }}
                howToUse={{
                    title: "How to Use the Free Image Compressor",
                    steps: [
                        "Click the 'Upload' button or drag and drop your JPG, PNG, or WebP files into the uploader box. You can see the original file size immediately.",
                        "Adjust the 'Quality' slider. We recommend 80% for the best balance of size and visual fidelity, but you can go lower for even smaller files.",
                        "Click the 'Compress Image Now' button. Our server-side processing handles the heavy lifting in just a second or two.",
                        "Once finished, you will see a comparison showing your original size, the new compressed size, and the percentage of space saved.",
                        "Click the 'Download Compressed Image' button to save your newly optimized file. It's now ready for use on your website or social media."
                    ]
                }}
                benefits={{
                    title: "Benefits of Using Imgverto",
                    items: [
                        "Boost Website Speed: Smaller images load faster, leading to lower bounce rates and higher user engagement.",
                        "Improved SEO: Search engines like Google prioritize fast-loading websites in their search results.",
                        "Save Storage Space: Dramatically reduce the space occupied by your photo library on your phone or computer.",
                        "Faster Transfers: Smaller files mean faster uploads to social media and quicker email attachments.",
                        "Optimize for Mobile: Help your mobile visitors save data and load your content faster on 3G and 4G networks.",
                        "100% Secure: We use SSL encryption to handle your files, and they are automatically deleted shortly after processing.",
                        "No Limits: Compress as many images as you want for free, with no daily limits or watermarks."
                    ]
                }}
                faqs={[
                    {
                        question: "Will my images look blurry after compression?",
                        answer: "Not if you choose the right settings. At 80% quality, most users cannot distinguish between the original and the compressed version. If you go very low (below 30%), you might start to see 'artifacts', but for most web uses, a significant reduction is possible without visible loss."
                    },
                    {
                        question: "What is the difference between lossy and lossless compression?",
                        answer: "Lossless compression reduces file size without losing any data (perfect for logos/text). Lossy compression discards some data to achieve much smaller sizes (perfect for photographs). Our tool uses a smart hybrid approach to give you the best results."
                    },
                    {
                        question: "Is there a maximum file size limit for uploads?",
                        answer: "Currently, Imgverto supports files up to 10MB each. This covers 99% of standard digital photos and web graphics. If you have a larger file, we recommend resizing it first using our resize tool."
                    },
                    {
                        question: "Does Imgverto keep a copy of my images?",
                        answer: "No. Your privacy is a priority. Files are processed and held in a temporary secured folder only for as long as needed for you to download them. They are automatically cleared from our system regularly."
                    },
                    {
                        question: "Can I compress PNG files with transparency?",
                        answer: "Yes, our tool fully supports PNG transparency (alpha channels). The compression will reduce the file size while keeping the transparent background perfectly intact."
                    },
                    {
                        question: "Why should I compress WebP if it's already a modern format?",
                        answer: "While WebP is very efficient, many export tools don't optimize it to the fullest. Our compressor can often find another 10-20% of savings even on WebP files by applying more aggressive compression blocks."
                    }
                ]}
            />

            <RelatedTools currentPath="/compress-image" />
        </Section>
    );
}
