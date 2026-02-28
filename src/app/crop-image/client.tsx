"use client";

import { useState, useRef, useEffect } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Crop as CropIcon, Lock, Unlock, Move } from "lucide-react";
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

export function CropImageClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Crop coordinates
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // Original dimensions
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);

    const imageRef = useRef<HTMLImageElement>(null);

    const handleUpload = (files: File[]) => {
        const f = files[0];
        setFile(f);
        setCroppedUrl(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);

        // Load image to get dimensions
        const img = new Image();
        img.onload = () => {
            setOriginalWidth(img.width);
            setOriginalHeight(img.height);
            // Default crop: center 80%
            const w = Math.round(img.width * 0.8);
            const h = Math.round(img.height * 0.8);
            setWidth(w);
            setHeight(h);
            setLeft(Math.round((img.width - w) / 2));
            setTop(Math.round((img.height - h) / 2));
        };
        img.src = url;
    };

    const handleCrop = async () => {
        if (!file || !width || !height) return;
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("x", left.toString());
            formData.append("y", top.toString());
            formData.append("width", width.toString());
            formData.append("height", height.toString());

            const res = await fetch("/api/crop", {
                method: "POST",
                body: formData
            });

            if (!res.ok) throw new Error("Failed");
            const blob = await res.blob();
            setCroppedUrl(URL.createObjectURL(blob));
        } catch (e) {
            alert("Crop failed. Ensure coordinates are within image bounds.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0 px-0 lg:px-[160px]">
                    <Breadcrumbs items={[{ label: "Crop Image", href: "/crop-image" }]} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-6">
                    {/* Left Ad */}
                    <div className="hidden lg:block pt-4">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center pt-4">
                        <div className="w-full space-y-4 flex flex-col items-center mb-2">
                            {/* Horizontal Ad & Header */}
                            <div className="w-full text-center mb-1">
                                <ToolHeader
                                    title="Crop IMAGE"
                                    description="Crop JPG, PNG, or GIFs with ease; Choose pixels to define your rectangle or use our visual editor."
                                />
                                <div className="flex justify-center mt-2">
                                    <AdPlaceholder className="w-[728px] h-[90px]" />
                                </div>
                            </div>

                            {!file ? (
                                <ImageUploader onUpload={handleUpload} maxFiles={1} toolType="image" />
                            ) : (
                                <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-6 mb-8 relative shadow-2xl transition-all mx-auto">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                            <div className="space-y-4">
                                                <h3 className="font-bold text-lg flex items-center gap-2">
                                                    <CropIcon className="w-5 h-5 text-emerald-500" />
                                                    Crop Settings
                                                </h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-medium">X Position</label>
                                                        <input
                                                            type="number"
                                                            value={left}
                                                            onChange={(e) => setLeft(Math.max(0, parseInt(e.target.value) || 0))}
                                                            className="w-full p-2.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-medium">Y Position</label>
                                                        <input
                                                            type="number"
                                                            value={top}
                                                            onChange={(e) => setTop(Math.max(0, parseInt(e.target.value) || 0))}
                                                            className="w-full p-2.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-medium">Width (px)</label>
                                                        <input
                                                            type="number"
                                                            value={width}
                                                            onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 0))}
                                                            className="w-full p-2.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-medium">Height (px)</label>
                                                        <input
                                                            type="number"
                                                            value={height}
                                                            onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 0))}
                                                            className="w-full p-2.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={handleCrop}
                                                    disabled={isProcessing}
                                                    className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-base hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-xl active:scale-95"
                                                >
                                                    {isProcessing ? "Cropping..." : "Crop Image Now"}
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="font-bold text-lg">Preview</h3>
                                                {previewUrl && (
                                                    <div className="relative max-w-full max-h-[350px] border shadow-md bg-checkerboard rounded-xl overflow-hidden flex items-center justify-center">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            ref={imageRef}
                                                            src={previewUrl}
                                                            alt="Preview"
                                                            className="max-w-full max-h-[350px] object-contain"
                                                        />
                                                    </div>
                                                )}
                                                <p className="text-center text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Original: {originalWidth}x{originalHeight} | {formatBytes(file.size)}</p>
                                            </div>
                                        </div>

                                        {croppedUrl && (
                                            <div className="flex justify-center pt-2 border-t border-border/10">
                                                <a
                                                    href={croppedUrl}
                                                    download={`cropped-${width}x${height}-${file.name}`}
                                                    className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-extrabold text-base hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                                >
                                                    <Download className="w-5 h-5" /> Download Cropped Image
                                                </a>
                                            </div>
                                        )}

                                        <div className="flex justify-center">
                                            <button onClick={() => { setFile(null); setCroppedUrl(null); }} className="text-sm text-muted-foreground underline hover:text-emerald-600 transition-colors">
                                                Crop another Image
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Extra Content Section */}
                            <div className="w-full max-w-4xl mx-auto border-t pt-8 mt-4">
                                <ToolExtraContent
                                    whatDoesItDo={{
                                        title: "What this Online Image Cropper Does",
                                        content: `Imgverto's Image Cropper is a powerful utility designed to help you focus on the most important parts of your photos. Cropping is the process of removing unwanted outer areas from a digital image. This could be to discard a distracting element in the background, or to change the aspect ratio of a photo to fit a specific frame, like a passport photo box or a square Instagram post. Our tool allows you to define exact coordinates and dimensions, giving you professional-level control over the final composition. \n\n Unlike simple cropping tools that might re-compress your image and lose detail, Imgverto uses high-fidelity extraction algorithms. When you define a crop area, our engine precisely cuts that section from the original image data and preserves it as a new file. This ensures that the texture, colors, and sharp details of your subject remain untouched. Whether you're a photographer refining a shot or a student preparing documents, our cropper delivers pixel-perfect results instantly.`
                                    }}
                                    whoIsItFor={{
                                        title: "Who Should Use the Image Crop Tool",
                                        content: `This tool is a necessity for job seekers and students in India applying for competitive exams like UPSC, SSC, or IBPS. These portals often have extremely strict requirements for photograph and signature dimensions. For example, you might need to crop a larger photo to an exact 3.5cm x 4.5cm area. Our tool lets you input the exact pixel coordinates to meet these standards without any guesswork. \n\n Social media managers and digital creators also find this tool indispensable for 'aspect ratio tuning.' If you have a beautiful landscape photo that needs to become a 16:9 cinematic header or a 4:5 portrait for a feed, our cropper makes it happen in seconds. It's also perfect for e-commerce sellers who need to remove border space around products for a cleaner look on Amazon or Flipkart. If you need to cut out the clutter and focus on the subject, this tool is built for you.`
                                    }}
                                    howToUse={{
                                        title: "How to Crop Images Online for Free",
                                        steps: [
                                            "Select 'Upload' or drag your image file directly into the designated area. Your image will be displayed in the preview pane immediately.",
                                            "Use the 'Crop Settings' panel to define your area. You can specify the 'X and Y Position' (where the top-left corner starts) and the 'Width and Height'.",
                                            "Observe the preview. Your original image dimensions are shown below the preview to help you calculate the perfect crop area.",
                                            "Click the 'Crop Image Now' button. Our AI-powered engine will instantly process the image and prepare your new, focused version.",
                                            "Review the success preview and click 'Download Cropped Image' to save the file. The process is entirely private and happens in your browser."
                                        ]
                                    }}
                                    benefits={{
                                        title: "Benefits of Using Imgverto",
                                        items: [
                                            "Precision Control: Input exact pixel values for X, Y, Width, and Height for technical document compliance.",
                                            "Lossless Extraction: We extract the cropped area without unnecessary re-compression, maintaining original clarity.",
                                            "Instant Processing: No uploading to wait for—your image is processed locally and ready in milliseconds.",
                                            "Multi-Format Support: Works seamlessly with all major image types, including JPG, JPEG, PNG, and transparent WebP.",
                                            "Privacy First: Your photos are never stored on our servers. All cropping logic happens inside your device's memory.",
                                            "Absolutely Free: No credits, no watermarks, and no registration required. Professional tools for everyone.",
                                            "Responsive Design: Use the cropper on your mobile phone as easily as on your desktop computer."
                                        ]
                                    }}
                                    faqs={[
                                        {
                                            question: "How do I crop my photo for the SSC application form?",
                                            answer: "The SSC usually requires a photo of 3.5cm x 4.5cm. If your image is high resolution (300 DPI), this is about 413 x 531 pixels. Upload your photo and enter these values into the 'Width' and 'Height' boxes."
                                        },
                                        {
                                            question: "Will I lose image quality after cropping?",
                                            answer: "No, Imgverto extracts the selected area from the original data without adding extra compression noise. Your cropped photo will be just as sharp as the original part was."
                                        },
                                        {
                                            question: "Can I crop a signature to make it look bigger?",
                                            answer: "Yes! If your signature is small on a large white paper, crop it to include only the signature itself. This makes it appear larger and clearer when uploaded to exam portals."
                                        },
                                        {
                                            question: "Is there a limit to how many photos I can crop?",
                                            answer: "No, there are no limits on Imgverto. You can crop one photo or a hundred, all for free and without any daily quotas."
                                        },
                                        {
                                            question: "What does X and Y position mean?",
                                            answer: "X is the distance from the left edge, and Y is the distance from the top edge. These define exactly where your crop area begins on the image."
                                        },
                                        {
                                            question: "Can I crop transparent PNG files?",
                                            answer: "Yes, our tool fully supports PNG transparency. When you crop a transparent image, the resulting file will keep its transparent areas intact."
                                        }
                                    ]}
                                />
                                <RelatedTools currentPath="/crop-image" />
                            </div>
                        </div>
                    </div>
                    {/* Right Ad */}
                    <div className="hidden lg:block pt-4">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>
                </div>
            </div>
        </Section >
    );
}
