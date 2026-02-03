import { Metadata } from "next";
import { PdfCompressorClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: 'Compress PDF Online | Reduce PDF Size for Free | Imgverto',
    description: 'Shrink your PDF files without losing quality with Imgverto. Our free online PDF compressor optimizes your documents for faster sharing and easier uploads. Secure and private.',
    alternates: {
        canonical: '/pdf-compressor',
    },
    keywords: ["compress pdf online free", "reduce pdf size", "pdf compressor", "shrink pdf", "imgverto"]
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
