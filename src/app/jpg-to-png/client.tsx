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
                    content: `This tool is an essential part of the toolkit for web developers, UI/UX designers, and digital artists. If you have a logo or a high-contrast graphic that was unfortunately saved as a JPG, converting it to PNG is crucial before integrating it into a website, as PNGs handle the sharp lines and text of UI elements much better than JPEGs. It's also vital for anyone who plans to perform multi-stage editing on a photo; by switching to PNG early in the process, you prevent the 'generational loss' that occurs when saving a JPG multiple times.

Marketing professionals and social media managers also find this tool useful for ensuring their brand assets remain crisp across different platforms. Many modern apps and CMS platforms prefer PNG for thumbnails and profile pictures because of their superior clarity. Whether you're a professional designer preparing assets for a high-end application or a student wanting to make sure your presentation graphics look their best, Imgverto's converter provides the stability and quality you need without the overhead of heavy software.`
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
                        question: "Will converting a JPG to PNG improve the image quality?",
                        answer: "No, converting to PNG cannot 'add' detail that was already lost in the original JPG. However, it prevents any *further* quality loss if you plan to edit the image or save it multiple times in the future."
                    },
                    {
                        question: "Does the output PNG support transparency?",
                        answer: "Yes. While the source JPG lacks transparency, the file we generate is a true PNG-24 with alpha channel support. You can then use background removal tools on this file to create transparent areas."
                    },
                    {
                        question: "Is there a limit to the resolution of the converter?",
                        answer: "Imgverto's converter can handle high-resolution photos up to standard DSLR qualities. For extremely large files (above 10-15MB), performance may depend on your device's available memory, as processing happens locally."
                    },
                    {
                        question: "How does Imgverto protect my privacy?",
                        answer: "We use a 'client-side' processing model. This means the heavy lifting of converting pixels happens in your own browser's memory. Your image is never sent across the internet to our servers, keeping your data 100% private."
                    },
                    {
                        question: "Can I use the converted PNGs for professional printing?",
                        answer: "Absolutely. PNG is an excellent format for high-quality printing because of its lossless nature. Since we preserve the original resolution, your converted files are perfect for brochures, business cards, and more."
                    },
                    {
                        question: "Why do PNG files often have a larger file size than JPGs?",
                        answer: "PNG is a lossless format, so it stores every single bit of information for every pixel. JPGs are smaller because they use 'smart' math to throw away data. For logos and text, the size difference is worth the quality gain."
                    }
                ]}
            />

            <RelatedTools currentPath="/jpg-to-png" />
        </Section>
    );
}
