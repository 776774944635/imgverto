"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, Scan, Zap, Layers, Image as ImageIcon, Eraser, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
        setProgress("Loading AI Model (this may take a moment)...");

        try {
            // Dynamically import the library to avoid build-time errors
            const { default: imglyRemoveBackground } = (await import("@imgly/background-removal")) as any;

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
                description="Instantly remove image backgrounds with AI. Create transparent PNGs for transparency, logos, and e-commerce product photos."
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
                                                    <p className="text-sm font-bold">AI is analyzing pixels...</p>
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

            <div className="w-full max-w-3xl prose prose-slate prose-lg dark:prose-invert mb-16">
                <h2>AI-Powered Background Eraser</h2>
                <p>
                    Effortlessly <strong>remove background from image</strong> online with Imgverto's cutting-edge AI technology.
                    Whether you are an e-commerce seller displaying products or a designer creating logos, our tool intelligently separates
                    the foreground from the background, delivering a clean <strong>transparent PNG</strong> in seconds.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
                    {[
                        { title: "Browser-Based AI", icon: Zap, desc: "Runs 100% on your device for speed & privacy." },
                        { title: "Transparent PNG", icon: Layers, desc: "Perfect cutout quality ready for design." },
                        { title: "Unlimited Free", icon: Scan, desc: "Process as many images as you need." },
                    ].map((f, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white border shadow-sm">
                            <f.icon className="w-8 h-8 text-primary mb-4" />
                            <h4 className="font-black text-foreground mb-2">{f.title}</h4>
                            <p className="text-sm text-muted-foreground">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <h3>Why use our Background Remover?</h3>
                <p>
                    Most online tools require sign-ups or credits. Imgverto utilizes <strong>WebAssembly</strong> to run powerful AI models directly in your browser.
                    This means:
                </p>
                <ul>
                    <li><strong>Faster Performance:</strong> No uploading large files to slow servers.</li>
                    <li><strong>Total Privacy:</strong> Your photos never leave your device.</li>
                    <li><strong>High Precision:</strong> Detects hair, fur, and complex edges.</li>
                </ul>

                <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl my-8 flex gap-4 items-start">
                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                    <p className="text-amber-800 m-0 text-sm">
                        <strong>Note:</strong> The first time you use this tool, your browser will download the AI model (~100MB).
                        Subsequent uses will be instant!
                    </p>
                </div>
            </div>

            <FAQSection items={[
                { question: "Is this background remover free?", answer: "Yes, it is completely free forever. No watermarks, no credits." },
                { question: "Does it work on mobile?", answer: "Yes! Modern smartphones handle the AI processing smoothly." },
                { question: "What formats can I upload?", answer: "You can upload JPG, PNG, WebP, and other common image formats." },
                { question: "Is my data secure?", answer: "Absolutely. Since processing happens in your browser, your images are never sent to any external server." }
            ]} />

            <RelatedTools currentPath="/background-remover" />
        </Section>
    );
}
