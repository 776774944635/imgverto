"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { Download, FileImage } from "lucide-react";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AdPlaceholder } from "@/components/shared/AdPlaceholder";

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
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0">
                    <Breadcrumbs items={[{ label: "PDF to JPG", href: "/pdf-to-jpg" }
                    ]} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-8">
                    {/* Left Ad */}
                    <div className="hidden lg:block">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center">
                        <div className="w-full text-center mb-1">
                            <ToolHeader
                                title="PDF to JPG Converter Online"
                                description="Extract images from your PDF pages for free as high-quality JPEG files."
                            />
                            <div className="flex justify-center mt-2">
                                <AdPlaceholder className="w-[728px] h-[90px]" />
                            </div>
                        </div>

                        {!file ? (
                            <ImageUploader
                                onUpload={(f) => setFile(f[0])}
                                maxFiles={1}
                                accept={{ 'application/pdf': ['.pdf'] }}
                                toolType="pdf"
                            />
                        ) : (
                            <div className="w-full max-w-3xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 mb-12 relative shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
                                <div className="flex flex-col items-center space-y-8">
                                    <div className="text-center space-y-2">
                                        <FileImage className="w-16 h-16 text-primary mx-auto" />
                                        <p className="font-medium text-lg truncate max-w-md">{file.name}</p>
                                    </div>

                                    {!zipBlob ? (
                                        <button
                                            onClick={handleConvert}
                                            disabled={isProcessing}
                                            className="px-10 py-4 bg-primary text-primary-foreground font-extrabold text-lg rounded-full hover:opacity-90 flex items-center gap-2 transition-transform active:scale-95 shadow-xl"
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
                            </div>
                        )}

                        <div className="w-full max-w-4xl mx-auto">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "What this PDF to JPG Converter Does",
                                    content: `Imgverto's PDF to JPG Converter is a high-fidelity rasterization engine that transforms your static PDF documents into vibrant, high-resolution JPEG images. Unlike traditional screen capture methods, which are limited by your monitor's resolution, our converter processes the internal vector data of the PDF to render each page at professional-level DPI. This means that fine text remains sharp, and embedded graphics maintain their color accuracy.

The tool handles multi-page documents with ease. Each individual page of your PDF is converted into its own dedicated JPG file. Once the conversion engine has processed every page, it neatly packages them into a single, downloadable ZIP archive. This ensures you don't have to download twenty separate images manually; you get everything in one organized folder, ready for immediate use in presentations, on social media, or within your design software.`
                                }}
                                whoIsItFor={{
                                    title: "Who Should Use This Tool",
                                    content: `This utility is a favorite among social media coordinators and digital marketers who frequently need to share snippets of reports, whitepapers, or infographics on platforms like LinkedIn or Instagram, where PDF support is limited or non-existent. By converting these pages to high-quality JPGs, they can easily create carousel posts or eye-catching thumbnails.

Graphic designers also use the PDF to JPG converter as a quick extraction tool. If you have a multi-page brand guide or a portfolio in PDF format but need individual image versions for a project, Imgverto provides them instantly. Furthermore, educators and researchers find it useful for creating presentation slides from PDF textbooks. It's built for anyone who needs to bridge the gap between 'document-style' data and 'image-style' sharing.`
                                }}
                                howToUse={{
                                    title: "How to Use the Free Online PDF to JPG Converter",
                                    steps: [
                                        "Click 'Upload' or drag your PDF file into the primary tool area. We support documents from single-page flyers to multi-page reports.",
                                        "Press the 'Convert PDF to JPG Now' button. Our rendering engine will begin the rasterization of each individual document page.",
                                        "Wait for the progress verification. Our system ensures that every page is clearly rendered before finalizing the package.",
                                        "Review the 'Conversion Complete' status. We create a high-quality ZIP archive containing all your new JPEG images.",
                                        "Click the 'Download ZIP' button to save the assets to your device. Simply extract the ZIP to access each page as an individual image file."
                                    ]
                                }}
                                benefits={{
                                    title: "Benefits of Using Imgverto",
                                    items: [
                                        "DPI Preservation: We extract pages at high resolution, ensuring that even small text remains perfectly legible after conversion.",
                                        "Batch Page Processing: Instantly convert every page of a long document without having to process them one by one.",
                                        "Convenient ZIP Output: Get all your converted images in a single, organized archive for easy file management.",
                                        "Privacy Protected: We use secure, ephemeral sessions. Your PDF data is processed for your eyes only and never stored.",
                                        "Universal Integration: Converted JPGs are 100% compatible with social media, CMS platforms, and presentation software.",
                                        "No Daily Caps: Process as many PDF documents as you need without hitting usage limits or paying for 'pro' time.",
                                        "Zero Branding: We never add watermarks or overlay logos on your images. The output is clean and professional."
                                    ]
                                }}
                                faqs={[
                                    {
                                        question: "Will the text in the resulting JPGs be readable?",
                                        answer: "Yes. Our conversion engine renders the text in your PDF with high precision. As long as the original PDF isn't blurry, the resulting JPG pages will be crisp and easy to read even on mobile screens."
                                    },
                                    {
                                        question: "How do I see the images after downloading the ZIP?",
                                        answer: "Once you download the ZIP file, simply right-click it and select 'Extract All' (on Windows) or double-click it (on Mac). A folder will be created containing all your converted page images as individual files."
                                    },
                                    {
                                        question: "What happens if my PDF has 50 pages?",
                                        answer: "Imgverto's engine will process all 50 pages and package them into the ZIP. For very long documents, the processing might take a few extra seconds, but the tool is designed to handle multi-page files without crashing."
                                    },
                                    {
                                        question: "Does the converter support password-protected PDFs?",
                                        answer: "For your security and ours, we cannot process encrypted files. If your PDF is password-protected, you'll need to save an unprotected copy before uploading it for conversion."
                                    },
                                    {
                                        question: "Are the colors in the JPG the same as the original PDF?",
                                        answer: "Yes. We maintain the original color profiles of the PDF document during the rasterization process, ensuring consistent branding and visual fidelity for your images."
                                    },
                                    {
                                        question: "Is there a limit to the file size I can upload?",
                                        answer: "We support PDF uploads up to 20MB. This covers the vast majority of standard documents, brochures, and reports likely to be used for social media or web extraction."
                                    }
                                ]}
                            />

                            <RelatedTools currentPath="/pdf-to-jpg" />
                        </div>
                    </div>

                    {/* Right Ad */}
                    <div className="hidden lg:block">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>
                </div>
            </div>
        </Section>
    );
}
