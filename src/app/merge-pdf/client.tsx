"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { SortableList, SortableItemType } from "@/components/tools/SortableList";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ArrowRight } from "lucide-react";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";

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

            <ToolExtraContent
                whatDoesItDo={{
                    title: "What this PDF Merger Tool Does",
                    content: `Imgverto's PDF Merger is a heavy-duty document consolidation tool that allows you to join multiple PDF files into one clean, continuous document. Think of it as digital binding. Whether you have several chapters of a book, a collection of monthly reports, or multiple scanned invoices, our merger allows you to stitch them together flawlessly. It doesn't just 'attach' files; it reconstructs the internal PDF tree to ensure that the final document is optimized and maintains all internal elements like links, forms, and formatting.

One of the most powerful features of our merger is the 'Stage and Sort' interface. When you upload your files, you aren't stuck with the order they were selected in. You can visually arrange the sequence of your documents to ensure the final PDF flows exactly as intended. Our backend uses high-performance libraries to handle the complex task of merging large files quickly, ensuring that the fonts are properly embedded and the page dimensions remain consistent across the joined sections.`
                }}
                whoIsItFor={{
                    title: "Who Should Use This Tool",
                    content: `Legal professionals and paralegals find this tool essential for creating 'discovery bundles' or compiling multi-part contracts for signature. Instead of sending clients a dozen separate PDFs, they can provide one comprehensive package. Similarly, administrative assistants and human resource managers use the merger to compile employee handbooks, onboarding materials, or quarterly performance reviews into manageable single-file formats.

Students and researchers also benefit greatly; it enables them to combine various academic papers, reference materials, and their own written chapters into a single submission-ready thesis or project. For anyone managing a cluttered folder of PDF documents that belong together, Imgverto's PDF Merger provides the ultimate organization solution. You no longer need expensive, bloated desktop software like Adobe Acrobat to perform this simple but vital task.`
                }}
                howToUse={{
                    title: "How to Use the Free Online PDF Merger",
                    steps: [
                        "Click 'Upload' or drag your PDF files into the tool's workspace. You can select multiple files at once from your computer or mobile device.",
                        "Review the list of uploaded PDFs. If you need to add more files, you can continue to upload until you have everything you need.",
                        "Arrange the order by clicking and dragging the filenames in the list. The file at the top will be Page 1 of your new document.",
                        "Click the 'Merge PDFs Now' button. Our server-side engine will process the files and bind them together in your specified sequence.",
                        "A download prompt will appear once the merge is complete. Save your new, unified PDF and use it for your professional or personal needs."
                    ]
                }}
                benefits={{
                    title: "Benefits of Using Imgverto",
                    items: [
                        "Seamless Document Flow: Create professional, multi-page PDFs that look like they were originally created as a single file.",
                        "Total Sequence Control: Our drag-and-drop sorter makes organizing even the largest sets of documents simple and fast.",
                        "Preserved Formatting: We guarantee that all fonts, images, and layout settings remain identical to your source files.",
                        "Secure Handling: Your documents are processed using industry-standard security protocols and are never shared or permanently stored.",
                        "No Page Limits: Merge large documents with high page counts without worrying about the tool crashing or timing out.",
                        "Platform Independent: Use the merger on Windows, Mac, Linux, or even your mobile phone's web browser.",
                        "Zero Cost Forever: No subscriptions, no 'pro' features behind paywalls, and absolutely no watermarks on your merged files."
                    ]
                }}
                faqs={[
                    {
                        question: "Can I merge different sized PDF pages together?",
                        answer: "Yes. Our tool is designed to handle varying page dimensions. If you merge an A4 document with a Letter-sized one, each page will maintain its original intended size within the final composite PDF."
                    },
                    {
                        question: "Is there a limit to how many PDFs I can merge at once?",
                        answer: "You can merge up to 20 PDF files in a single operation. This ensures that the processing remains efficient and that the final file size stays within reasonable limits for standard email systems."
                    },
                    {
                        question: "Will the hyperlinks inside my PDFs still work after merging?",
                        answer: "In most cases, yes. Our merger attempts to preserve the internal document metadata and link structures. However, links that point to other external files might need to be verified in the final merged document."
                    },
                    {
                        question: "Do you compress the files during the merge process?",
                        answer: "The merger focuses on joining the files without altering the internal compression. If you find the final merged file is too large, you can run it through our specialized PDF Compressor tool afterwards."
                    },
                    {
                        question: "Is it safe to merge sensitive legal documents here?",
                        answer: "Absolutely. Imgverto prioritizes your privacy. We use secure HTTPS for all transfers, and unlike other services, we do not keep copies of your documents on our servers once the processing is finished."
                    },
                    {
                        question: "Can I merge password-protected PDFs?",
                        answer: "For security reasons, our tool cannot process encrypted or password-protected files. You will need to remove the password protection from your source files before attempting to merge them."
                    }
                ]}
            />

            <RelatedTools currentPath="/merge-pdf" />
        </Section>
    );
}
