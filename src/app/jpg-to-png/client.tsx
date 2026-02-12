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

            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this JPG to PNG Converter Does",
                    content: `Imgverto's JPG to PNG Converter is a precision utility designed to transition your images from the ubiquitous but 'lossy' JPEG format to the robust, 'lossless' PNG (Portable Network Graphics) format. While JPG is the world's go-to for photographs due to its incredible compression ratios, every time a JPG is saved, it lose a bit of its soul—tiny details are discarded, and sharp edges can become 'noisy' or 'blocky.' PNG, on the other hand, prioritizes visual perfection. By converting to PNG, you ensure that no further data is lost during subsequent edits or saves.

Beyond simple quality preservation, this converter serves as the first step for many design projects. Although the source JPG doesn't support transparency, the resulting PNG container does. This means that once your file is in PNG format, you can easily use other tools—like our Background Remover—to create the transparent layers needed for professional graphic design. Our converter uses a high-fidelity rendering engine that maps every pixel from the source file into the destination container with 1:1 accuracy, ensuring that the colors and clarity you start with are exactly what you get in the output.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `This tool is primarily used by candidates who need to upload high-fidelity scans of academic records. Many government and private university portals recommend PNG for documents containing text to ensure they are readable by the evaluators.

Web designers also use this tool to take standard JPG photos and convert them into the PNG format before removing backgrounds or adding transparent layers. If you want your images to look sharp and avoid the 'fuzzy' look that JPGs can sometimes have around sharp edges, Imgverto is the perfect solution for you.`
                }}
                howToUse={{
                    title: "How to Use the Free JPG to PNG Converter",
                    steps: [
                        "Click 'Upload Image' or drag your JPG/JPEG file into the workspace. Our uploader will immediately verify the file format and size.",
                        "Press the 'Convert to PNG' button. Our browser-side engine will immediately begin re-encoding the image data into the PNG format.",
                        "Wait just a moment as the progress bar completes. For most standard images, this conversion is near-instant.",
                        "Compare the Input (JPG) and Output (PNG) in our preview windows. You'll see that the visual quality remains identical to the original.",
                        "Click 'Download PNG File' to save your new lossless asset. It's now ready for professional design, printing, or web deployment."
                    ]
                }}
                benefits={{
                    title: "Benefits of Using Imgverto",
                    items: [
                        "Lossless Conversion: We guarantee that not a single pixel of quality is lost during the transition from JPG to PNG.",
                        "Total Privacy: Unlike cloud-based converters, we process your image entirely in your browser. Your files never touch our servers.",
                        "High-Speed Output: No server queues or upload delays. Our converter leverages your device's power for instant results.",
                        "No Daily Limits: Convert as many JPGs as you need for your projects without hitting paywalls or daily conversion caps.",
                        "Format Stability: PNG files don't degrade over time or through repeated saves, making them perfect for master assets.",
                        "Completely Free: Enjoy professional-grade file conversion without subscriptions, hidden fees, or annoying watermarks.",
                        "Mobile Compatible: Our responsive design allows you to convert file formats on the go, directly from your smartphone or tablet."
                    ]
                }}
                faqs={[
                    {
                        question: "Why should I convert my JPG to PNG for university admissions?",
                        answer: "Many university portals (like Delhi University or BHU) prefer PNG for academic certificates. PNG is 'lossless,' meaning it keeps the text in your documents sharp and legible, unlike JPG which can make it blurry."
                    },
                    {
                        question: "Will converting to PNG make my image clearer?",
                        answer: "It won't fix an already blurry JPG, but it will prevent the image from losing any more quality. It's the best format for documents you plan to use multiple times."
                    },
                    {
                        question: "Does this PNG converter support transparency?",
                        answer: "Yes, the output is a standard PNG which supports transparency. Once converted, you can use background removal tools to make parts of the image transparent."
                    },
                    {
                        question: "Is it safe to upload my marksheets here?",
                        answer: "Yes, 100%. Imgverto processes your files directly in your browser. Your sensitive documents never leave your computer and are never uploaded to any server."
                    },
                    {
                        question: "Which is better for photos, JPG or PNG?",
                        answer: "For photos, JPG is usually better because the file size is much smaller. However, for documents with text (like certificates or ID cards), PNG is the superior choice for clarity."
                    },
                    {
                        question: "Can I convert high-quality scans to PNG?",
                        answer: "Absolutely. Our converter handles high-resolution scans and DSLR photos easily, ensuring you have a professional-grade PNG asset for any portal."
                    },
                    {
                        question: "Is there a limit on how many JPGs I can convert?",
                        answer: "No, you can convert an unlimited number of images for free. We don't have any daily caps or registration requirements."
                    },
                    {
                        question: "Why is my PNG file larger than the original JPG?",
                        answer: "PNG is a lossless format, so it stores much more data than a JPG to ensure perfect quality. This is normal and is the trade-off for having a clearer, uncompressed image."
                    }
                ]}
            />

            <RelatedTools currentPath="/jpg-to-png" />
        </Section>
    );
}
