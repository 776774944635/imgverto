import { Metadata } from "next";
import { PdfCompressorClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Compress PDF Online - Reduce PDF Size for Exam Forms",
    description: "Compress PDF online for free. Reduce file size for NEET, JEE, SSC, and UPSC application forms. Fast, secure, and preserves quality.",
    alternates: {
        canonical: '/pdf-compressor',
    },
    keywords: ["compress pdf online", "reduce pdf size", "pdf compressor free", "ssc chsl pdf size", "upsc form pdf upload", "government job pdf resize", "imgverto"]
};

export default function PdfCompressorPage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="Compress PDF Online Free"
                description="Reduce PDF file size without losing quality for easy sharing."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <PdfCompressorClient />
        </>
    );
}
