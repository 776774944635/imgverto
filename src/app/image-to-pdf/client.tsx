"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { SortableList, SortableItemType } from "@/components/tools/SortableList";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ArrowRight } from "lucide-react";

const generateId = () => Math.random().toString(36).substring(2, 9);

export function ImageToPdfClient() {
    const [items, setItems] = useState<SortableItemType[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = (files: File[]) => {
        const newItems = files.map(f => ({ id: generateId(), file: f }));
        setItems(prev => [...prev, ...newItems]);
    };

    const handleRemove = (id: string | number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const handleConvert = async () => {
        if (items.length === 0) return;
        setIsProcessing(true);

        try {
            const formData = new FormData();
            items.forEach(item => {
                formData.append("files", item.file);
            });

            const response = await fetch("/api/image-to-pdf", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Conversion failed");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "imgverto-converted.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            alert("Error converting to PDF");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Free Image to PDF Converter"
                description="Convert JPG, PNG, and other images to a PDF for free. The best online tool to convert image to PDF securely."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 space-y-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
                <ImageUploader
                    onUpload={handleUpload}
                    description="Upload multiple images to merge into one PDF"
                />

                {items.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Pages ({items.length})</h3>
                            <button onClick={() => setItems([])} className="text-sm text-destructive hover:underline">Clear All</button>
                        </div>

                        <SortableList items={items} setItems={setItems} onRemove={handleRemove} />

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleConvert}
                                disabled={isProcessing}
                                className="flex items-center gap-2 px-10 py-4 rounded-full font-black bg-primary text-primary-foreground hover:opacity-90 transition-transform active:scale-95 text-lg shadow-xl"
                            >
                                {isProcessing ? "Converting..." : "Convert to PDF Now"}
                                {!isProcessing && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate dark:prose-invert mb-12">
                <h2>Why use our Image to PDF Converter?</h2>
                <p>
                    Imgverto offers a <strong>completely free image to pdf converter</strong> that works entirely in your browser.
                    Unlike other tools, we don&apos;t upload your sensitive documents to a permanent server.
                    Everything handles nicely for those looking to <strong>convert image to PDF</strong> quickly and securely.
                </p>
                <h3>Features</h3>
                <ul>
                    <li><strong>Free Online Tool:</strong> No hidden costs or watermarks.</li>
                    <li><strong>Privacy Focused:</strong> Files are processed securely.</li>
                    <li><strong>Universal Support:</strong> Works with JPG, PNG, WebP, and more.</li>
                </ul>
                <h3>How to Convert Image to PDF Online?</h3>
                <ol>
                    <li>Upload your images (JPG, PNG, etc.) using the box above.</li>
                    <li>Drag and drop to reorder the pages as needed.</li>
                    <li>Click &quot;Convert to PDF&quot; to instantly download your document.</li>
                </ol>
            </div>

            <FAQSection items={[
                { question: "Is this Image to PDF converter free?", answer: "Yes, Imgverto is 100% free to use for turning images into PDFs." },
                { question: "How to rearrange pages?", answer: "After uploading, simply drag and drop the thumbnails to change their order." },
                { question: "Can I convert JPG to PDF?", answer: "Yes, this tool supports JPG, PNG, and WebP conversion seamlessly." },
                { question: "Is there a file limit?", answer: "You can upload up to 20 images at once for free." }
            ]} />

            <RelatedTools currentPath="/image-to-pdf" />
        </Section>
    );
}
