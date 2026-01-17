import { Metadata } from "next";
import { PdfCompressorClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Compress PDF Online Free | Reduce PDF Size Securely",
    description: "Compress PDF online for free with Imgverto. Reduce PDF file size without losing quality using our fast and secure PDF compressor tool.",
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
