import { Metadata } from "next";
import { MergePdfClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: 'Merge PDF Online | Combine PDF Files Free | Imgverto',
    description: 'Effortlessly merge multiple PDF files into one professional document with Imgverto. Our free online PDF merger is fast, secure, and preserves your formatting perfectly.',
    alternates: {
        canonical: '/merge-pdf',
    },
    keywords: ["merge pdf files online free", "combine pdf", "pdf merger", "join pdf", "imgverto"]
};

export default function MergePdfPage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="Merge PDF Files Online Free"
                description="Combine multiple PDF documents into a single file easily."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <MergePdfClient />
        </>
    );
}
