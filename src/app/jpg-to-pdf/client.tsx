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

export function JpgToPdfClient() {
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
                title="Convert JPG to PDF Online"
                description="Specifically designed to turn your JPG images into a high-quality PDF document. Free and secure."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 space-y-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
                <ImageUploader
                    onUpload={handleUpload}
                    description="Upload JPGs to convert"
                    accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }}
                />

                {items.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Selected JPGs ({items.length})</h3>
                            <button onClick={() => setItems([])} className="text-sm text-destructive hover:underline">Clear All</button>
                        </div>

                        <SortableList items={items} setItems={setItems} onRemove={handleRemove} />

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleConvert}
                                disabled={isProcessing}
                                className="flex items-center gap-2 px-10 py-4 rounded-full font-black bg-primary text-primary-foreground hover:opacity-90 transition-transform active:scale-95 text-lg shadow-xl"
                            >
                                {isProcessing ? "Converting..." : "Convert JPG to PDF Now"}
                                {!isProcessing && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate dark:prose-invert mb-12">
                <h2>Fast & Free JPG to PDF Converter</h2>
                <p>
                    Need to quickly <strong>convert JPG to PDF online</strong>? Imgverto provides a streamlined tool specifically for handling JPEG images.
                    Whether you have scans, photos, or screenshots, our tool merges them into a single, clean PDF document.
                </p>
                <h3>Why converting JPG to PDF is useful?</h3>
                <p>
                    PDFs are universally compatible and great for sharing multiple images in one file.
                    Using our <strong>jpg to pdf online</strong> converter ensures your formatting stays consistent across all devices.
                </p>
            </div>

            <FAQSection items={[
                { question: "Is this free?", answer: "Yes, converting JPG to PDF is completely free." },
                { question: "Does it work with PNG?", answer: "This specific tool expects JPGs, but our Image to PDF tool accepts all formats." },
                { question: "Secure?", answer: "Yes, standard secure processing apply." }
            ]} />

            <RelatedTools currentPath="/jpg-to-pdf" />
        </Section>
    );
}
