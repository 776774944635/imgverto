import { Metadata } from "next";
import { CompressImageClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Compress Image Online - Reduce Photo Size for Exam Forms",
    description: "Compress images online for free. Reduce photo size for NEET, JEE Main, SSC, and UPSC application forms. Fast, secure, and maintains high quality.",
    keywords: ["compress image online", "reduce photo size", "neet photo compressor", "jee main image resize", "ssc chsl photo upload", "government job image size", "imgverto"],
    alternates: {
        canonical: '/compress-image',
    },
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
