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

            <div className="w-full max-w-4xl prose prose-slate dark:prose-invert mb-12 bg-white/50 dark:bg-slate-900/50 p-8 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800">
                <h1 className="text-3xl font-black mb-6">Convert JPG to PDF Online Free - High Quality & Secure</h1>

                <p>
                    Are you looking for a reliable way to <strong>convert JPG to PDF online</strong>? Imgverto provides a powerful, user-friendly tool specifically designed for this purpose. Whether you are a student preparing for competitive exams or a professional handling important documents, our converter ensures your images are merged into a professional-grade PDF document in seconds.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">What This Tool Does</h2>
                <p>
                    Our JPG to PDF converter takes your individual JPEG or JPG images and combines them into a single PDF file. This is essential for creating digital portfolios, submitting application forms, or sharing multiple photos in a single, standard format that works on any device.
                    Unlike other tools, Imgverto maintains the original quality of your images while ensuring the final PDF is optimized for easy sharing and printing.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">How to Use the JPG to PDF Converter (Step-by-Step)</h2>
                <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Upload Your Images:</strong> Click the "Upload" button or drag and drop your JPG files into the tool area. You can select multiple images at once.</li>
                    <li><strong>Rearrange Files:</strong> Once uploaded, you can drag and drop the thumbnails to change the order of pages in your final PDF.</li>
                    <li><strong>Click Convert:</strong> After setting the order, hit the "Convert JPG to PDF Now" button.</li>
                    <li><strong>Download:</strong> Your newly created PDF will be ready for download instantly. No sign-up or email is required.</li>
                </ol>

                <h2 className="text-2xl font-bold mt-8 mb-4">Why Use Imgverto Instead of Other Tools?</h2>
                <p>
                    There are many online converters, but Imgverto stands out for several reasons:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Privacy First:</strong> Your files are processed in a secure environment and are never stored on our servers permanently.</li>
                    <li><strong>No Watermarks:</strong> We don't add ugly watermarks to your documents. Your PDFs stay clean and professional.</li>
                    <li><strong>Lightning Fast:</strong> Our optimized processing engine ensures you don't have to wait in long queues.</li>
                    <li><strong>Mobile Friendly:</strong> Use the tool on your smartphone just as easily as on your desktop.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Use Cases for Students & Professionals</h2>
                <p>
                    <strong>For Students:</strong> Combine scanned handwritten notes into a single PDF for submission on Google Classroom or email. Convert multiple certificates into one file for college admissions.
                    <strong>For Professionals:</strong> Convert receipts into a single expense report. Merge scanned identity documents (like Aadhar or Pan Card) into a single PDF for KYC processes.
                </p>

                <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary mt-8">
                    <h2 className="text-2xl font-bold mb-4">Special Guide for Indian Competitive Exam Forms</h2>
                    <p>
                        Applying for government jobs or entrance exams in India often requires specific file types and sizes. Many portals specifically ask for a single PDF containing multiple documents.
                    </p>
                    <ul className="mt-4 space-y-2">
                        <li><strong>NEET Application Form:</strong> Postcard size photos and certificates often need to be merged into a PDF for the NTA portal.</li>
                        <li><strong>JEE Main Photo Upload:</strong> While photos are often JPG, supplementary documents must be in PDF format with strict size requirements.</li>
                        <li><strong>SSC CHSL & CGL:</strong> Use our tool to prepare your documents for SSC recruitment portals, ensuring high clarity and correct formatting.</li>
                        <li><strong>Railway Recruitment (RRB/RRC):</strong> Easily merge your educational certificates into a single PDF for smooth document verification.</li>
                        <li><strong>State Board Exams:</strong> Whether it's UP Board, Bihar Board, or Maharashtra Board, prepare your application files without technical hassle.</li>
                        <li><strong>Government Job Forms (UPSC/BPSC):</strong> Ensure your PDF size meets the typical 200KB to 500KB limits while maintaining readability.</li>
                    </ul>
                    <p className="mt-4 font-semibold italic text-primary">
                        Pro Tip: Check the exact size requirements for your specific exam before uploading. If your final PDF is too large, use our "Compress PDF" tool after conversion.
                    </p>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Maximize Your Productivity with Imgverto</h2>
                <p>
                    Beyond just converting JPG to PDF, we offer a suite of tools to help you manage your digital life. If you have low-quality scans, try our "Upscale Image" tool before converting. If you need to remove the background from a formal photo, our "Background Remover" is perfect for creating professional documents.
                </p>
                <p>
                    Imgverto is built by a team that understands the frustration of complicated software. That's why we've made every tool "one-click." No confusing settings, no annoying pop-ups—just results.
                </p>
            </div>

            <FAQSection items={[
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
            ]} />

            <RelatedTools currentPath="/jpg-to-pdf" />
        </Section>
    );
}
