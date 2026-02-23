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
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { AdPlaceholder } from "@/components/shared/AdPlaceholder";

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
        <Section className="min-h-[80vh] p-0">
            <div className="max-w-7xl mx-auto px-4 py-0">
                <div className="mb-0 px-0 lg:px-[160px]">
                    <Breadcrumbs items={[{ label: "Image to PDF", href: "/image-to-pdf" }]} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-8">
                    {/* Left Ad */}
                    <div className="hidden lg:block pt-12">
                        <AdPlaceholder className="w-[160px] h-[600px] sticky top-24" />
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col items-center pt-8">
                        <div className="w-full text-center mb-1">
                            <div className="flex justify-center mb-1">
                                <AdPlaceholder className="w-[728px] h-[90px]" />
                            </div>
                            <ToolHeader
                                title="Free Image to PDF Converter"
                                description="Convert JPG, PNG, and other images to a PDF instantly for free."
                            />
                        </div>

                        {items.length === 0 ? (
                            <ImageUploader
                                onUpload={handleUpload}
                                description="Upload multiple images to merge into one PDF"
                                toolType="image"
                            />
                        ) : (
                            <div className="w-full max-w-4xl premium-card rounded-[2.5rem] bg-white overflow-hidden min-h-[400px] p-8 space-y-8 mb-12 relative shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
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
                                            className="flex items-center gap-2 px-10 py-4 rounded-full font-extrabold bg-primary text-primary-foreground hover:opacity-90 transition-transform active:scale-95 text-lg shadow-xl"
                                        >
                                            {isProcessing ? "Converting..." : "Convert to PDF Now"}
                                            {!isProcessing && <ArrowRight className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="w-full max-w-4xl mx-auto">
                            <ToolExtraContent
                                whatDoesItDo={{
                                    title: "What this Image to PDF Converter Does",
                                    content: `Imgverto's Image to PDF Converter is a powerful document assembler that takes your disparate image files—whether they be JPEGs, PNGs, or WebPs—and neatly packages them into a single, professional PDF document. Unlike simple format converters, this tool allows for 'multi-image merging.' This means you can upload a series of scanned pages, receipts, or portfolio pieces and combine them into one sequential file.

The process involves embedding the raw image data into the PDF's vector-based container. This ensures that the original resolution and color quality of your photos are preserved, while also making the content much easier to share, print, and archive. Our tool also provides a dynamic 'sorting' interface, allowing you to drag and drop your uploaded images to establish the exact page order for your final document. It's more than just a converter; it's a lightweight document preparation suite that runs entirely in your web browser.`
                                }}
                                whoIsItFor={{
                                    title: "Who Should Use This Tool",
                                    content: `This tool is an essential asset for students and educators who need to compile handwritten notes or scanned book pages into a single, readable study guide. Remote workers and business professionals frequently use it to merge multiple photos of paper receipts, contracts, or identification documents into one PDF for easy submission to accounting or legal departments.

Creative professionals, such as photographers and designers, find the Image to PDF converter useful for creating quick, high-quality digital portfolios or 'contact sheets' to share with clients. It's also perfect for anyone who needs to send multiple images via email; instead of attaching twenty separate files, you can send one organized PDF. If you've ever had a folder full of images that needed to be more organized and professional, this tool was built with you in mind.`
                                }}
                                howToUse={{
                                    title: "How to Use the Free Image to PDF Converter",
                                    steps: [
                                        "Click 'Upload' or drag your images (JPG, PNG, JPEG, WebP) into the upload area. You can select multiple files at once.",
                                        "Once uploaded, you'll see thumbnails of each page. Use our drag-and-drop interface to reorder them in your desired sequence.",
                                        "Remove any unwanted pages by clicking the delete icon on individual thumbnails, or use 'Clear All' to start over.",
                                        "Click the 'Convert to PDF Now' button. Our engine will intelligently merge the files into a single document container.",
                                        "Your browser will automatically download the finished PDF. Open it to verify the order and quality—it's ready for any professional use."
                                    ]
                                }}
                                benefits={{
                                    title: "Benefits of Using Imgverto",
                                    items: [
                                        "Pro Merging: Combine dozens of images into a single, organized PDF file with just a few clicks.",
                                        "Dynamic Page Reordering: Total control over the final sequence with our intuitive drag-and-drop sorting tool.",
                                        "Universal Page Sizing: We automatically normalize image dimensions to fit standard PDF page layouts for professional results.",
                                        "No Privacy Risks: Your files stay on your machine. We use client-side libraries to build the PDF within your own browser.",
                                        "Zero Watermarks: Unlike 'freemium' tools, Imgverto never adds branding or watermarks to your personal documents.",
                                        "High Resolution Retention: We don't over-compress your images, ensuring that text and fine details remain legible in the PDF.",
                                        "Multi-Format Support: Mix and match JPG, PNG, and WebP files in the same PDF document without any compatibility issues."
                                    ]
                                }}
                                faqs={[
                                    {
                                        question: "How many images can I convert into a single PDF?",
                                        answer: "You can upload and merge up to 20 images at a time. This limit ensures that the conversion remains fast and doesn't overwhelm your browser's memory, providing a smooth experience for every user."
                                    },
                                    {
                                        question: "Will the quality of my photos decrease in the PDF?",
                                        answer: "No. Imgverto embeds the images at their original resolution. While some PDF readers might apply their own viewing compression, the actual file keeps the detail levels of your source images."
                                    },
                                    {
                                        question: "Can I reorder the pages after I upload them?",
                                        answer: "Absolutely! Our tool is designed for organization. Once your images are uploaded, simply click and drag the thumbnails to move them into the correct page order before you hit convert."
                                    },
                                    {
                                        question: "Does this tool work on mobile devices?",
                                        answer: "Yes. You can take photos of documents with your phone's camera and immediately upload and merge them into a PDF using the Imgverto web app. No app installation is required."
                                    },
                                    {
                                        question: "Is there a file size limit for the images?",
                                        answer: "Individual images can be up to 10MB each. For the best performance, especially when merging many pages, we recommend using images that are already optimized for web or document sharing."
                                    },
                                    {
                                        question: "Why is PDF a better format for images than sending JPEGs?",
                                        answer: "PDF is a 'read-only' standard that looks the same on every device. It's much easier for recipients to scroll through a single document than to open multiple individual image files, making it the preferred choice for business and education."
                                    }
                                ]}
                            />

                            <div className="w-full border-t pt-16 mt-8">
                                <RelatedTools currentPath="/image-to-pdf" />
                            </div>
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
