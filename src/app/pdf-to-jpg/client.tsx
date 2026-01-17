"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, FileImage } from "lucide-react";

export function PdfToJpgClient() {
    const [file, setFile] = useState<File | null>(null);
    const [zipBlob, setZipBlob] = useState<Blob | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConvert = async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/pdf-to-jpg", { method: "POST", body: formData });
            if (!res.ok) throw new Error("Conversion failed");

            const blob = await res.blob();
            setZipBlob(blob);
        } catch (e) {
            alert("Conversion failed. Ensure PDF is valid.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!zipBlob) return;
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `images-${file?.name}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="PDF to JPG Converter Online"
                description="Extract images from your PDF pages for free. Download your converted JPEG images as a high-quality ZIP file securely."
            />

            <div className="w-full max-w-3xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
                {!file ? (
                    <ImageUploader
                        onUpload={(f) => setFile(f[0])}
                        maxFiles={1}
                        accept={{ 'application/pdf': ['.pdf'] }}
                    />
                ) : (
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-center space-y-2">
                            <FileImage className="w-16 h-16 text-primary mx-auto" />
                            <p className="font-medium text-lg truncate max-w-md">{file.name}</p>
                        </div>

                        {!zipBlob ? (
                            <button
                                onClick={handleConvert}
                                disabled={isProcessing}
                                className="px-10 py-4 bg-primary text-primary-foreground font-black text-lg rounded-full hover:opacity-90 flex items-center gap-2 transition-transform active:scale-95 shadow-xl"
                            >
                                {isProcessing ? "Converting..." : "Convert PDF to JPG Now"}
                            </button>
                        ) : (
                            <div className="space-y-4 w-full max-w-sm">
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center text-green-700 dark:text-green-300 font-medium border border-green-200 dark:border-green-800">
                                    Conversion Complete!
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className="w-full px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:opacity-90 flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl"
                                >
                                    <Download className="w-5 h-5" /> Download ZIP
                                </button>
                                <button onClick={() => { setFile(null); setZipBlob(null); }} className="w-full text-sm text-muted-foreground underline text-center block">
                                    Convert another file
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate dark:prose-invert mb-12">
                <h2>Why convert PDF to JPG?</h2>
                <p>
                    Converting a <strong>PDF to image</strong> format like JPG is essential for displaying document pages on websites, social media, or anywhere that doesn&apos;t support the PDF format directly.
                    Our <strong>PDF to JPG converter online</strong> is designed to be fast, preserving the original resolution of each page while packaging them into a convenient ZIP archive.
                </p>
                <h3>How to Convert PDF to JPG for Free?</h3>
                <ol>
                    <li>Upload your PDF document to the box above.</li>
                    <li>Click &quot;Convert to JPG&quot; to begin processing.</li>
                    <li>Download the ZIP file containing high-quality images of your document pages.</li>
                </ol>
                <h3>Safe & Secure Image Extraction</h3>
                <p>
                    Your security is our priority. When you <strong>convert PDF to JPG</strong> with Imgverto, your files are processed in a secure session and deleted automatically.
                    No permanent storage, no data sharing.
                </p>
            </div>

            <FAQSection items={[
                { question: "Is this PDF to JPG converter free?", answer: "Yes, Imgverto offers a completely free way to turn your PDF pages into JPEG images." },
                { question: "What is the quality of the output JPGs?", answer: "We extract pages at high resolution to ensure your images are crisp and readable." },
                { question: "Can I convert multiple pages?", answer: "Yes, our tool converts every page of your PDF into an individual JPG image." },
                { question: "Do you store my files?", answer: "No, files are processed for conversion and promptly removed from our system." }
            ]} />

            <RelatedTools currentPath="/pdf-to-jpg" />
        </Section>
    );
}
