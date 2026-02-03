"use client";

import { useState, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Lock, Unlock } from "lucide-react";
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

export function ResizeImageClient() {
    const [file, setFile] = useState<File | null>(null);
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [lockAspectRatio, setLockAspectRatio] = useState(true);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resizedUrl, setResizedUrl] = useState<string | null>(null);

    const handleUpload = (files: File[]) => {
        const f = files[0];
        setFile(f);
        setResizedUrl(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);

        const img = new Image();
        img.onload = () => {
            setOriginalWidth(img.width);
            setOriginalHeight(img.height);
            setWidth(img.width);
            setHeight(img.height);
        };
        img.src = url;
    };

    const handleWidthChange = (val: number) => {
        setWidth(val);
        if (lockAspectRatio && originalWidth > 0) {
            setHeight(Math.round((val / originalWidth) * originalHeight));
        }
    };

    const handleHeightChange = (val: number) => {
        setHeight(val);
        if (lockAspectRatio && originalHeight > 0) {
            setWidth(Math.round((val / originalHeight) * originalWidth));
        }
    };

    const handleResize = async () => {
        if (!file || !width || !height) return;
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("width", width.toString());
            formData.append("height", height.toString());

            const res = await fetch("/api/resize", {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error("Failed");
            const blob = await res.blob();
            setResizedUrl(URL.createObjectURL(blob));
        } catch (e) {
            alert("Resize failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Resize Image Online Free"
                description="Change image dimensions easily. Perfect for Instagram, passports, or website optimization with aspect ratio locking."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} />
                ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-6">
                                <h3 className="font-bold text-lg">New Dimensions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Width (px)</label>
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                            className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Height (px)</label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                            className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setLockAspectRatio(!lockAspectRatio)}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg border transition-all",
                                        lockAspectRatio ? "bg-primary/10 border-primary text-primary" : "text-muted-foreground border-border"
                                    )}
                                >
                                    {lockAspectRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                    Lock Aspect Ratio
                                </button>

                                <button
                                    onClick={handleResize}
                                    disabled={isProcessing}
                                    className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95"
                                >
                                    {isProcessing ? "Resizing..." : "Resize Image Now"}
                                </button>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg">Preview</h3>
                                {previewUrl && (
                                    <div className="relative max-w-full max-h-[400px] border shadow-md bg-checkerboard rounded-xl overflow-hidden flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="max-w-full max-h-[400px] object-contain"
                                        />
                                    </div>
                                )}
                                <p className="text-center text-xs text-muted-foreground">Original: {originalWidth}x{originalHeight} | Size: {formatBytes(file.size)}</p>
                            </div>
                        </div>

                        {resizedUrl && (
                            <div className="flex justify-center pt-8 border-t border-border/10">
                                <a
                                    href={resizedUrl}
                                    download={`resized-${width}x${height}-${file.name}`}
                                    className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-black text-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-6 h-6" /> Download Resized Image
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => { setFile(null); setResizedUrl(null); }} className="text-sm text-muted-foreground underline">Resize another image</button>
                        </div>
                    </div>
                )}
            </div>

            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this Image Resizer Tool Does",
                    content: `Imgverto's Image Resizer is a versatile digital workbench that allows you to change the physical dimensions of your photos with precision. In the digital world, an image's size is measured in pixels—individual dots of color. Sometimes an image is too large for its intended purpose, like an email attachment or a website header, and other times you need a specific pixel count for a social media post or an official document. Our tool gives you direct control over these variables.

The core of our resizer is its intelligent aspect ratio management. When you change the width, the tool can automatically calculate the corresponding height to ensure your image doesn't look stretched or squashed. It uses modern resampling filters to recalculate the color values as pixels are added or removed, ensuring the results remain sharp and professional. Whether you are dealing with a ultra-high resolution DSLR photo or a small web icon, Imgverto scales the image smoothly while maintaining the integrity of the original file's metadata and color depth.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `This tool is indispensable for web content managers and bloggers who need to ensure every image on their site fits a specific layout or container. By resizing images to the exact size they appear on screen, you improve site speed and browsing performance. Social media coordinators also love this tool for quickly optimizing content for different platform requirements—like 1080x1080 for Instagram squares or 1200x630 for Facebook shared links.

Additionally, job seekers and students frequently use our resizer for official document preparation. Many application portals for passports, visas, or university admissions have strict pixel requirements for headshots; Imgverto makes meeting these standards a matter of a few clicks. Even for casual users, it's a great way to prepare photos for digital picture frames or to shrink large photo libraries before moving them to a cloud backup service. If you've ever been told an image is 'too big' or 'wrong size,' this tool is for you.`
                }}
                howToUse={{
                    title: "How to Use the Free Online Image Resizer",
                    steps: [
                        "Click 'Upload' or drag your JPG, PNG, or WebP file into the tool. You'll immediately see the current dimensions below the preview.",
                        "Decide whether you want to 'Lock Aspect Ratio.' Keep it locked to prevent distortion, or unlock it if you need specific, non-proportional sizes.",
                        "Enter your desired Width or Height in the boxes. If locked, the other dimension will update automatically to match the original proportions.",
                        "Click the 'Resize Image Now' button. Our engine will quickly generate a new version of your photo at the exact specifications you requested.",
                        "Check the preview and final pixel count. If everything looks perfect, click 'Download Resized Image' to save the file to your device."
                    ]
                }}
                benefits={{
                    title: "Benefits of Using Imgverto",
                    items: [
                        "Proportional Perfection: Our aspect ratio lock ensures your subjects never look unnaturally thin or wide during resizing.",
                        "Custom Pixel Control: Input exact values for width and height to meet any technical requirement for web or print.",
                        "High-Fidelity Resampling: We use advanced bilinear filters to ensure your resized images stay sharp and free of jagged edges.",
                        "Privacy by Design: Your images never touch our servers. All resizing logic happens locally in your browser's private memory.",
                        "Unlimited Usage: Resize as many photos as you need, from one single profile picture to an entire album, all for free.",
                        "Support for All Formats: Works seamlessly with common image extensions including JPG, JPEG, PNG, and WebP.",
                        "Zero Setup: No software to download, no accounts to create, and no email addresses required. Just visit and resize."
                    ]
                }}
                faqs={[
                    {
                        question: "What is aspect ratio, and why should I lock it?",
                        answer: "Aspect ratio is the proportional relationship between width and height. Locking it ensures that when you change one dimension, the other adjusts automatically. This prevents your image from looking distorted or 'squeezed'."
                    },
                    {
                        question: "Will my image lose quality if I make it smaller?",
                        answer: "No, making an image smaller actually tends to make it look sharper. However, making an image significantly *larger* than its original size can lead to blurriness. For enlarging, we recommend our specialized Image Upscaler tool."
                    },
                    {
                        question: "What is the ideal image size for social media?",
                        answer: "Platforms change their rules often, but 1080x1080 is safe for most posts. For landscape headers, 1200-1500px wide is common. Our tool allows you to input these specific numbers easily."
                    },
                    {
                        question: "Is there a limit on the file size I can upload?",
                        answer: "Imgverto supports large photos up to 10-15MB. Because resizing happens on your device, the limit is more about your browser's memory than our server's capacity."
                    },
                    {
                        question: "Can I resize a transparent PNG with this tool?",
                        answer: "Yes, our resizer fully supports PNG transparency. Your resized output will maintain its transparent background perfectly, making it ready for design work."
                    },
                    {
                        question: "Why should I resize images before uploading to my website?",
                        answer: "Oversized images are the #1 reason for slow websites. By resizing your image to the exact width needed for your layout, you can reduce file size by 70-80%, hugely improving your SEO and user experience."
                    }
                ]}
            />

            <RelatedTools currentPath="/resize-image" />
        </Section>
    );
}
