import { Metadata } from "next";
import { CompressImageClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Free Online Image Compressor | Shrink JPG, PNG, WebP",
    description: "Compress images online for free. Reduce file size of JPG, PNG, and WebP images without losing quality using Imgverto's fast and secure compressor.",
    keywords: ["image compressor", "compress image online", "reduce image size", "shrink jpeg", "imgverto"]
};

export default function CompressImagePage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="Free Online Image Compressor"
                description="Reduce file size of JPG, PNG, and WebP images without losing quality."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <CompressImageClient />
        </>
    );
}
