import { Metadata } from "next";
import { CompressImageClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: 'Free Online Image Compressor | Reduce JPG, PNG, WebP Size | Imgverto',
    description: 'Compress images online for free without losing quality. Reduce file size of JPG, PNG, and WebP images instantly to boost website speed and save storage.',
    keywords: ["image compressor", "compress image online", "reduce image size", "shrink jpeg", "imgverto"],
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
