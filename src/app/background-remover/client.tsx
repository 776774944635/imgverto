"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Layers, Image as ImageIcon, Eraser, AlertCircle } from "lucide-react";
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

export function BackgroundRemoverClient() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState<string>("Initializing...");

    const handleUpload = (files: File[]) => {
        const f = files[0];
        setFile(f);
        setProcessedUrl(null);

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
    };

    const handleRemoveBackground = async () => {
        if (!file || !previewUrl) return;
        setIsProcessing(true);
        setProgress("Loading Advanced Segmentation Model (this may take a moment)...");

        try {
            // Dynamically import the library to avoid build-time errors
            const { removeBackground } = (await import("@imgly/background-removal")) as any;
            const imglyRemoveBackground = removeBackground;

            // Processing
            const blob = await imglyRemoveBackground(previewUrl, {
                progress: (key: string, current: number, total: number) => {
                    const percent = Math.round((current / total) * 100);
                    setProgress(`Processing: ${percent}%`);
                }
            });

            setProcessedUrl(URL.createObjectURL(blob));
        } catch (e: any) {
            console.error(e);
            alert("Failed to remove background. Ensure your browser supports WebAssembly/SharedArrayBuffer.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Remove Background Online Free"
                description="Instantly remove image backgrounds with high-precision segmentation. Create transparent PNGs for transparency, logos, and e-commerce product photos."
            />

            <div className="w-full max-w-5xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                {!file ? (
                    <ImageUploader onUpload={handleUpload} maxFiles={1} />
                ) : (
                    <div className="space-y-10">
                        {/* Controls */}
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-muted/30 rounded-3xl border border-border/50">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-foreground">File:</span>
                                <span className="text-sm font-medium text-muted-foreground truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs px-2 py-1 rounded bg-white border">{formatBytes(file.size)}</span>
                            </div>

                            <button
                                onClick={handleRemoveBackground}
                                disabled={isProcessing}
                                className="w-full md:w-auto px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-xl active:scale-95 flex items-center gap-3 justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <Scan className="w-5 h-5 animate-spin" /> {progress}
                                    </>
                                ) : (
                                    <>
                                        <Eraser className="w-5 h-5" /> Remove Background
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Preview Area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
                                    <span>Original Image</span>
                                </div>
                                <div className="relative aspect-square bg-checkerboard rounded-2xl overflow-hidden border shadow-inner flex items-center justify-center group">
                                    {previewUrl && (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm font-bold text-primary">
                                    <span>Transparent Result</span>
                                </div>
                                <div className="relative aspect-square bg-checkerboard rounded-2xl overflow-hidden border-2 border-primary/20 shadow-inner flex items-center justify-center bg-white/50">
                                    {processedUrl ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img src={processedUrl} alt="Processed" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground/50 p-6 text-center">
                                            {isProcessing ? (
                                                <div className="space-y-4 animate-pulse">
                                                    <Scan className="w-12 h-12 mx-auto opacity-50" />
                                                    <p className="text-sm font-bold">Algorithmic engine is analyzing pixels...</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <Layers className="w-12 h-12 mb-2" />
                                                    <span className="text-sm font-bold">Click "Remove Background" to start</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {processedUrl && (
                            <div className="flex justify-center pt-6 border-t border-border/10">
                                <a
                                    href={processedUrl}
                                    download={`no-bg-${file.name.replace(/\.[^/.]+$/, "")}.png`}
                                    className="px-10 py-4 rounded-full bg-emerald-500 text-white font-black text-lg hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-2xl active:scale-95"
                                >
                                    <Download className="w-6 h-6" /> Download Transparent PNG
                                </a>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button onClick={() => { setFile(null); setProcessedUrl(null); }} className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
                                Process another image
                            </button>
                        </div>
                    </div>
                )}
            </div>


            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this Background Remover Tool Does",
                    content: `Imgverto's Background Remover is a sophisticated web-based application designed to strip the background from any photo with surgical precision. 

For candidates of Indian exams like NEET, JEE, and SSC, the background of the passport photo must often be plain white or a very light color. Photos with dark or cluttered backgrounds are frequently rejected by NTA and other government portals. Our tool uses advanced AI-driven segmentation to isolate your face and shoulders, allowing you to create a professional transparent or white background photo from a simple home-taken selfie. This ensures your application is compliant and looks professional for official identification.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `This tool is primarily designed for students, job seekers, and digital creators. If you need to fix your passport photo for an exam registration or a visa application, Imgverto is the fastest way to get it right.

Web developers and e-commerce owners also use this tool to isolate product images for their stores. By removing distracting backgrounds, products become the sole focus, leading to a much more professional and trustworthy appearance on your website.`
                }}
                howToUse={{
                    title: "How to Use the Free Background Remover",
                    steps: [
                        "Click the 'Upload Image' button or simply drag and drop your photo into the designated area. We support JPG, PNG, and WebP formats.",
                        "Once uploaded, click the 'Remove Background' button. If this is your first time using the tool, wait a few seconds for the processing engine to initialize in your browser.",
                        "The system will automatically analyze your image. You will see a side-by-side comparison of your original photo and the new transparent version.",
                        "Inspect the results. Our engine handles complex edges like hair and fur with surprising accuracy. If you like what you see, proceed to the final step.",
                        "Click the 'Download Transparent PNG' button to save your cutout to your device. You can now use this image in any design project or marketplace listing."
                    ]
                }}
                benefits={{
                    title: "Benefits of Using Imgverto",
                    items: [
                        "100% Free Forever: No hidden fees, no subscriptions, and no credit-based limits on how many images you can process.",
                        "Privacy First: Your images never leave your computer. All processing is done locally in your browser for maximum security.",
                        "High Resolution: We don't downscale your images. Get high-quality, sharp cutouts suitable for professional printing and web use.",
                        "No Signup Required: Start removing backgrounds immediately without creating an account or providing an email address.",
                        "Professional Quality: Our engine is optimized on millions of images to provide edge detection that rivals manual editing.",
                        "Cross-Platform: Works seamlessly on Windows, Mac, Linux, and mobile devices directly through your web browser.",
                        "Instant Downloads: No waiting for server-side queues. Once the engine is loaded, processing and downloading are near-instant."
                    ]
                }}
                faqs={[
                    {
                        question: "How do I make my photo background white for NEET/JEE?",
                        answer: "Upload your photo to Imgverto and use the Background Remover. It will create a transparent PNG. You can then easily put a white background behind it for any official exam application."
                    },
                    {
                        question: "Does NTA accept photos with a colored background?",
                        answer: "Most NTA exams (like NEET and JEE Main) prefer a white background. It's safer to use our tool to remove a colored background and replace it with white to avoid rejection."
                    },
                    {
                        question: "Will my hair looks natural after background removal?",
                        answer: "Yes, our high-precision model is trained to handle complex edges like hair and fur, ensuring a professional cutout that looks natural on official forms."
                    },
                    {
                        question: "Is it safe to upload my personal photo for background removal?",
                        answer: "Absolutely. Imgverto processes your images locally in your browser using WebAssembly. Your photos are never uploaded to our servers, ensuring 100% privacy."
                    },
                    {
                        question: "Can I use this for my passport photo background?",
                        answer: "Yes, this tool is perfect for preparing passport and visa photos where a plain, clean background is mandatory."
                    },
                    {
                        question: "Does the tool reduce the quality of my face?",
                        answer: "No, our background remover isolates the background while keeping the original resolution and clarity of your face and body intact."
                    },
                    {
                        question: "Is there any charge for removing image backgrounds?",
                        answer: "No, this tool is completely free. We do not place any watermarks on your professional photos."
                    },
                    {
                        question: "What format is the output file?",
                        answer: "The output is a high-quality PNG with a transparent background, which is the best format for layering onto white for exam forms."
                    }
                ]}
            />

            <RelatedTools currentPath="/background-remover" />
        </Section>
    );
}
