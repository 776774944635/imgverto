"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Layers, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";
import Image from "next/image";

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function ImageUpscalerClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [upscaledUrl, setUpscaledUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scale, setScale] = useState<2 | 4>(2);
    const [stats, setStats] = useState<{ originalSize: string, originalDims: string, newDims: string } | null>(null);

    const handleUpload = (files: File[]) => {
        const f = files[0];
        setFile(f);
        setUpscaledUrl(null);
        setStats(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);

        const img = new window.Image();
        img.onload = () => {
            setStats({
                originalSize: formatBytes(f.size),
                originalDims: `${img.width}x${img.height}`,
                newDims: 'Calculating...'
            });
        };
        img.src = url;
    };

    const handleUpscale = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("scale", scale.toString());

            const res = await fetch("/api/upscale", {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Upscale failed");
            }

            const blob = await res.blob();
            setUpscaledUrl(URL.createObjectURL(blob));

            // Calculate new hypothetical dimensions based on scale
            // (In a real app, the server should ideally return metadata, but this is a good approximation)
            if (stats) {
                const [w, h] = stats.originalDims.split('x').map(Number);
                const newW = w * scale;
                const newH = h * scale;
                setStats({ ...stats, newDims: `${newW}x${newH}` });
            }

        } catch (e: any) {
            alert(e.message || "Failed to upscale image.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Image Upscaler Online"
                description="Increase image resolution by 2x or 4x instantly using high-precision resampling algorithms. Enhance quality without blur."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} />
                ) : (
                    <div className="space-y-10">
                        {/* Controls */}
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-6 bg-muted/30 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-foreground">Upscale Factor:</span>
                                <div className="flex gap-2">
                                    {[2, 4].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setScale(s as 2 | 4)}
                                            className={cn(
                                                "px-6 py-2 rounded-xl font-bold transition-all border-2",
                                                scale === s
                                                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                                                    : "bg-white text-muted-foreground border-transparent hover:bg-muted"
                                            )}
                                        >
                                            {s}x
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleUpscale}
                                disabled={isProcessing}
                                className="w-full md:w-auto px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95 flex items-center gap-3 justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <Scan className="w-5 h-5 animate-spin" /> Enhancing...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" /> Upscale Image
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Preview Area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
                                    <span>Original</span>
                                    <span>{stats?.originalDims}</span>
                                </div>
                                <div className="relative aspect-video bg-checkerboard rounded-2xl overflow-hidden border shadow-inner flex items-center justify-center group">
                                    {previewUrl && (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm font-bold text-primary">
                                    <span>Upscaled Result</span>
                                    <span>{stats?.newDims}</span>
                                </div>
                                <div className="relative aspect-video bg-checkerboard rounded-2xl overflow-hidden border-2 border-primary/20 shadow-inner flex items-center justify-center bg-primary/5">
                                    {upscaledUrl ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={upscaledUrl} alt="Upscaled" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground/50">
                                            <ImageIcon className="w-12 h-12 mb-2" />
                                            <span className="text-sm font-bold">Waiting for process...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {upscaledUrl && (
                            <div className="flex justify-center pt-6 border-t border-border/10">
                                <a
                                    href={upscaledUrl}
                                    download={`upscaled-${scale}x-${file.name}`}
                                    className="px-10 py-4 rounded-full bg-emerald-500 text-white font-black text-lg hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-6 h-6" /> Download {scale}x Image
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => { setFile(null); setUpscaledUrl(null); setStats(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                Upscale another image
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this Image Upscaler Tool Does",
                    content: `Imgverto's Image Upscaler is an advanced digital laboratory for your low-resolution photos. Traditionally, enlarging an image meant stretching the existing pixels, which inevitably led to a blurry, pixelated, or 'blocky' mess. Our tool bypasses these limitations by using sophisticated interpolation and resampling algorithms, such as Lanczos3. Instead of simply making pixels bigger, it mathematically analyzes the relationship between neighboring pixels to calculate what the intermediate data should look like, effectively 'filling in the blanks' with high precision.

This process significantly increases the pixel density and overall resolution of your image. Whether you need to double the size (2x) or quadruple it (4x), the tool works to maintain sharp edges, preserve textures, and minimize the digital noise that often occurs during resizing. For photographers, this means being able to crop a small portion of a photo and upscaling it back to a usable size. For designers, it means taking small web assets and turning them into high-quality elements suitable for larger layouts or even physical printing.

Every processed image is carefully handled by our backend servers to ensure the highest mathematical accuracy during the resampling process. The result is a crisp, clean version of your original file that looks like it was captured at a higher resolution from the start. We support the core web formats—JPEG, PNG, and WebP—ensuring that whatever your source material is, you can give it the resolution boost it deserves.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `The Image Upscaler is a lifesaver for professional photographers and digital artists who need to prepare their work for large-format printing. If you have a beautiful shot that just doesn't have enough megapixels for a high-quality poster or canvas, this tool provides the necessary resolution boost. It's also an essential asset for e-commerce store owners who might receive low-quality product shots from suppliers and need to make them look sharp and professional on high-resolution Retina displays.

History enthusiasts and families looking to digitize and restore old photographs will also find great value here. Often, older digital cameras or scanned physical photos lack the resolution needed for modern screen standards. By upscaling these memories, you give them a new life in the digital age. Furthermore, logo designers who need to extract a high-res version of a small icon or web developers who want to optimize their site for users with high-density screens will find this tool to be a permanent fixture in their workflow. It's built for anyone who refuses to settle for pixelated results.`
                }}
                howToUse={{
                    title: "How to Use the Free Image Upscaler",
                    steps: [
                        "Upload your image by clicking the 'Upload' button or dragging a JPG, PNG, or WebP file into the tool. You'll see your current resolution instantly.",
                        "Choose your upscale factor. Select '2x' to double both width and height, or '4x' to increase the total number of pixels by sixteen times.",
                        "Click the 'Upscale Image' button. Our advanced processing engine will begin the high-precision resampling of your file.",
                        "Review the 'Upscaled Result' preview window. You can compare the sharpness of the original versus the new high-resolution output.",
                        "Click the 'Download Image' button to save the final product. Your new high-res image is now ready for print, web use, or archival storage."
                    ]
                }}
                benefits={{
                    title: "Benefits of Using Imgverto",
                    items: [
                        "Crisp Edge Preservation: Our Lanczos3 algorithm prevents the blurriness associated with standard bilinear or bicubic resizing.",
                        "Print-Ready Results: Easily convert web-sized images into resolutions suitable for high-quality physical printing.",
                        "Support for Large Scales: Upscale up to 4x your original resolution, giving even tiny icons massive visual clarity.",
                        "No Data Loss: We prioritize maintaining the original color profile and dynamic range of your photos during processing.",
                        "Privacy Protected: Files are processed securely and deleted from our temporary storage shortly after your session ends.",
                        "Fast Algorithmic Resampling: Get high-resolution results in seconds, not minutes, thanks to our optimized backend infrastructure.",
                        "Completely Free: No hidden fees, no subscriptions, and absolutely no watermarks on your enhanced images."
                    ]
                }}
                faqs={[
                    {
                        question: "How is upscaling different from regular resizing?",
                        answer: "Standard resizing simply stretches pixels, making the image look blurry. Upscaling with Imgverto uses mathematical resampling to calculate new pixel values, maintaining sharp edges and finer details for a more professional look."
                    },
                    {
                        question: "Can I upscale a very small thumbnail into a 4K image?",
                        answer: "While you can, the results depend on the quality of the source. Our tool works wonders on average-sized photos, but upscaling a tiny 50px icon to 4K will still have limitations. It works best when the original has some discernible detail."
                    },
                    {
                        question: "Does the tool add watermarks to my upscaled photos?",
                        answer: "No. Imgverto believes in providing clean, professional tools. All upscaled images are your property and come with no watermarks or branding, making them ready for immediate commercial or personal use."
                    },
                    {
                        question: "Which file formats are best for upscaling?",
                        answer: "PNG and WebP typically yield the best results because they are less 'noisy' than JPEGs. However, our tool handles JPEGs extremely well, helping to smooth out compression artifacts during the enlargement process."
                    },
                    {
                        question: "Is there a limit to how many images I can upscale per day?",
                        answer: "There are no daily limits. You are free to upscale as many images as your project requires. We are committed to keeping this tool accessible to everyone without frustrating restrictions."
                    },
                    {
                        question: "Can I use the upscaled images for commercial purposes?",
                        answer: "Absolutely. Since we don't add watermarks and you provide the original source, you are free to use the high-resolution output for ads, product listings, brochures, or any other commercial venture."
                    }
                ]}
            />

            <RelatedTools currentPath="/image-upscaler" />
        </Section>
    );
}
