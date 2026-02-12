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
                    content: `Imgverto's Image Compressor is a powerful tool designed to reduce the digital footprint of your photos without sacrificing their visual integrity. Every image file contains a vast amount of data, some of which is essential for what you see, and some of which is redundant or invisible to the naked eye.

For students applying for competitive exams like NEET, JEE, or SSC, the photo and signature upload requirements are very strict (often between 10KB to 50KB). A standard smartphone photo is usually 3MB to 5MB. Our tool uses advanced algorithms to strategically discard non-essential data, allowing you to reach those small kilobyte limits while keeping your face and signature perfectly clear for official identification.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `This tool is specifically designed for candidates preparing for Indian competitive exams. Whether you are appearing for UPSC, IBPS Banking exams, or Railway Recruitment (RRB), you will always need to compress your passport-size photo and signature before uploading. Imgverto is the reliable partner for thousands of students who need to meet these technical requirements without visiting an internet cafe.

Web developers and social media managers also use this tool to optimize graphics for faster loading. By reducing the weight of your images, you ensure that your website or social media profile remains snappy and accessible, even on slower 4G/5G connections in rural areas.`
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
                        question: "How do I compress my photo to 20KB for an exam form?",
                        answer: "Upload your photo to Imgverto, and pull the 'Quality' slider down to around 50-60%. Check the 'Compressed Size' preview. If it's still above 20KB, lower the quality further. Our tool maintains clarity even at lower sizes."
                    },
                    {
                        question: "Will my signature be readable after compression?",
                        answer: "Yes. Our algorithms are optimized to preserve contrast in images like signatures and thumbprints, which is crucial for exam portals like SSC and JEE Main."
                    },
                    {
                        question: "What is the best format for government job photos?",
                        answer: "Most portals (UPSC, Banking, SSC) require photos in JPG or JPEG format. Our tool compresses these formats perfectly while ensuring the final output is accepted by the portal."
                    },
                    {
                        question: "Can I use this for NEET application photo upload?",
                        answer: "Absolutely! NEET has specific requirements for postcard size and passport size photos. You can use our compressor to bring them under the required kilobyte limit easily."
                    },
                    {
                        question: "Is it safe to upload my personal photo to Imgverto?",
                        answer: "Yes, we value your privacy. Your photos are processed in a secure environment and are automatically deleted from our system shortly after you finish."
                    },
                    {
                        question: "Does this work for signature and thumb impressions?",
                        answer: "Yes, you can upload any image of your signature or thumb impression. The tool will reduce the file size, making it ready for any online registration form."
                    },
                    {
                        question: "Can I compress multiple photos at once?",
                        answer: "Currently, you can process one image at a time to ensure the highest quality and precision for your specific size requirements."
                    },
                    {
                        question: "Why is the final file size slightly different than expected?",
                        answer: "Image data varies across different colors and textures. If you need an exact size, simply re-adjust the quality slider and hit 'Compress' again until you hit your target."
                    }
                ]}
            />

            <RelatedTools currentPath="/compress-image" />
        </Section>
    );
}
