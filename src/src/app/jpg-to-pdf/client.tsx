"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ImageUploader } from "@/components/tools/ImageUploader";
import { SortableList, SortableItemType } from "@/components/tools/SortableList";
import { FAQSection } from "@/components/tools/FAQSection";
import { Section } from "@/components/shared/Section";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolExtraContent } from "@/components/tools/ToolExtraContent";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AdPlaceholder } from "@/components/shared/AdPlaceholder";
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
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0">
                    <Breadcrumbs items={[{ label: "JPG to PDF", href: "/jpg-to-pdf" }
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
                            <div className="flex justify-center mb-1">
                                <AdPlaceholder className="w-[728px] h-[90px]" />
                            </div>
                            <ToolHeader
                                title="Convert JPG to PDF Online"
                                description="Convert your JPG images into a high-quality PDF document instantly for free."
                            />
                        </div>

                        {items.length === 0 ? (
                            <ImageUploader
                                onUpload={handleUpload}
                                description="Upload JPGs to convert"
                                accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }}
                                toolType="image"
                            />
                        ) : (
                            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 space-y-8 mb-12 relative shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
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
                                            className="flex items-center gap-2 px-10 py-4 rounded-full font-extrabold bg-primary text-primary-foreground hover:opacity-90 transition-transform active:scale-95 text-lg shadow-xl"
                                        >
                                            {isProcessing ? "Converting..." : "Convert JPG to PDF Now"}
                                            {!isProcessing && <ArrowRight className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="w-full border-t pt-16 mt-8">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "Convert JPG to PDF Online Free - High Quality & Secure",
                                    content: `Are you looking for a reliable way to convert JPG to PDF online? Imgverto provides a powerful, user-friendly tool specifically designed for this purpose. Whether you are a student preparing for competitive exams or a professional handling important documents, our converter ensures your images are merged into a professional-grade PDF document in seconds.

Our JPG to PDF converter takes your individual JPEG or JPG images and combines them into a single PDF file. This is essential for creating digital portfolios, submitting application forms, or sharing multiple photos in a single, standard format that works on any device. Unlike other tools, Imgverto maintains the original quality of your images while ensuring the final PDF is optimized for easy sharing and printing.`
                                }}
                                whoIsItFor={{
                                    title: "Use Cases for Students & Professionals",
                                    content: `For Students: Combine scanned handwritten notes into a single PDF for submission on Google Classroom or email. Convert multiple certificates into one file for college admissions.

For Professionals: Convert receipts into a single expense report. Merge scanned identity documents (like Aadhar or Pan Card) into a single PDF for KYC processes.

Applying for government jobs or entrance exams in India often requires specific file types and sizes. Many portals specifically ask for a single PDF containing multiple documents like NEET, JEE Main, SSC, Railway Recruitment, and UPSC.`
                                }}
                                howToUse={{
                                    title: "How to Use the JPG to PDF Converter (Step-by-Step)",
                                    steps: [
                                        "Upload Your Images: Click the 'Upload' button or drag and drop your JPG files into the tool area. You can select multiple images at once.",
                                        "Rearrange Files: Once uploaded, you can drag and drop the thumbnails to change the order of pages in your final PDF.",
                                        "Click Convert: After setting the order, hit the 'Convert JPG to PDF Now' button.",
                                        "Download: Your newly created PDF will be ready for download instantly. No sign-up or email is required."
                                    ]
                                }}
                                benefits={{
                                    title: "Why Use Imgverto Instead of Other Tools?",
                                    items: [
                                        "Privacy First: Your files are processed in a secure environment and are never stored on our servers permanently.",
                                        "No Watermarks: We don't add ugly watermarks to your documents. Your PDFs stay clean and professional.",
                                        "Lightning Fast: Our optimized processing engine ensures you don't have to wait in long queues.",
                                        "Mobile Friendly: Use the tool on your smartphone just as easily as on your desktop.",
                                        "Zero Cost: Convert as many JPGs as you need without any hidden charges or account creation."
                                    ]
                                }}
                                faqs={[
                                    {
                                        question: "Is this JPG to PDF converter free?",
                                        answer: "Yes, Imgverto offers this tool completely for free. There are no hidden charges, and you don't need to create an account to start converting your images."
                                    },
                                    {
                                        question: "Will I lose image quality after conversion?",
                                        answer: "No, our tool is designed to preserve the maximum quality of your JPG images. We pack the original bytes into the PDF container so your documents look sharp and clear."
                                    },
                                    {
                                        question: "Can I convert multiple JPGs into one PDF?",
                                        answer: "Absolutely! You can upload multiple JPG or JPEG files at once. You can also reorder them using our drag-and-drop feature to ensure they appear in the correct sequence in your PDF."
                                    },
                                    {
                                        question: "Is it safe to upload my personal documents?",
                                        answer: "Privacy is our priority. All processing is done securely, and your files are automatically deleted from our temporary workspace once the conversion is complete. We never share your data with third parties."
                                    },
                                    {
                                        question: "Does it work on mobile phones?",
                                        answer: "Yes, Imgverto is fully responsive. You can upload photos directly from your mobile gallery (Android or iPhone) and convert them to PDF on the go."
                                    },
                                    {
                                        question: "Can I use this for NEET or JEE application forms?",
                                        answer: "Yes, many Indian competitive exams like NEET, JEE, and SSC require documents in PDF format. This tool helps you create those files accurately according to their submission standards."
                                    },
                                    {
                                        question: "Is there a limit to how many files I can upload?",
                                        answer: "Currently, you can upload up to 20 images in a single session to ensure the fastest processing speed. For more files, you can perform multiple conversions and then use our 'Merge PDF' tool."
                                    }
                                ]}
                            />
                            <RelatedTools currentPath="/jpg-to-pdf" />
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
