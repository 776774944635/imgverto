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

export function MergePdfClient() {
    const [items, setItems] = useState<SortableItemType[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = (files: File[]) => {
        const newItems = files.map(f => ({ id: generateId(), file: f }));
        setItems(prev => [...prev, ...newItems]);
    };

    const handleRemove = (id: string | number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const handleMerge = async () => {
        if (items.length < 2) {
            alert("Please select at least 2 PDF files to merge.");
            return;
        }
        setIsProcessing(true);

        try {
            const formData = new FormData();
            items.forEach(item => formData.append("files", item.file));

            const response = await fetch("/api/merge-pdf", { method: "POST", body: formData });
            if (!response.ok) throw new Error("Merge failed");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "merged-document.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            alert("Merge failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Section className="min-h-[80vh] flex flex-col items-center">
            <ToolHeader
                title="Merge PDF Files Online Free"
                description="Combine multiple PDF files into one document for free. The easiest way to combine PDFs in your browser securely."
            />

            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 space-y-8 mb-12 relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <ImageUploader
                    onUpload={handleUpload}
                    description="Upload PDFs to merge"
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxFiles={20}
                />

                {items.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">PDFs ({items.length})</h3>
                            <button onClick={() => setItems([])} className="text-sm text-destructive hover:underline">Clear All</button>
                        </div>

                        <SortableList items={items} setItems={setItems} onRemove={handleRemove} />

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleMerge}
                                disabled={isProcessing}
                                className="flex items-center gap-2 px-10 py-4 rounded-full font-black bg-primary text-primary-foreground hover:opacity-90 transition-transform active:scale-95 text-lg shadow-xl"
                            >
                                {isProcessing ? "Merging..." : "Merge PDFs Now"}
                                {!isProcessing && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl prose prose-slate dark:prose-invert mb-12">
                <h2>Why Use Our PDF Merger?</h2>
                <p>
                    Managing multiple documents can be a hassle. Our <strong>PDF merger</strong> allows you to <strong>combine PDF</strong> files into a single document without any complicated software.
                    It is a fast, <strong>free online tool</strong> that ensures your files are handled securely.
                </p>
                <h3>Key Benefits</h3>
                <ul>
                    <li><strong>Merge PDF Files Online Free:</strong> No registration, no hidden fees.</li>
                    <li><strong>Simple Interface:</strong> Drag and drop to reorder your PDFs before merging.</li>
                    <li><strong>Privacy Matters:</strong> Your documents are processed in your browser and never permanently stored.</li>
                </ul>
                <h3>How to Combine PDF Files Online?</h3>
                <ol>
                    <li>Upload the PDF files you want to merge.</li>
                    <li>Arrange them in the exact order you need by dragging.</li>
                    <li>Click &quot;Merge PDFs&quot; and download your new file instantly.</li>
                </ol>
            </div>

            <FAQSection items={[
                { question: "Is this PDF merger free to use?", answer: "Yes, Imgverto allows you to merge PDF files online for free without any watermarks." },
                { question: "How many files can I combine at once?", answer: "You can combine up to 20 PDF files into a single document in one go." },
                { question: "Does merging PDFs affect document quality?", answer: "No, our tool preserves the original quality of your text and images within the PDF." },
                { question: "Can I reorder the files after uploading?", answer: "Absolutely! Just drag and drop the files in the list above to set your desired sequence." }
            ]} />

            <RelatedTools currentPath="/merge-pdf" />
        </Section>
    );
}
