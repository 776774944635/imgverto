import { Metadata } from "next";
import { ImageToPdfClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: 'Image to PDF Converter | Convert Photos to PDF Online Free | Imgverto',
    description: 'Turn your JPG, PNG, and WebP images into professional PDF documents for free with Imgverto. Our online converter is fast, secure, and preserves image quality flawlessly.',
    alternates: {
        canonical: '/image-to-pdf',
    },
    keywords: ["image to pdf converter free", "jpg to pdf online", "convert image to pdf", "png to pdf", "imgverto"]
};

export default function ImageToPdfPage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="Image to PDF Converter Free"
                description="Convert photos and images into high-quality PDF documents online."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <ImageToPdfClient />
        </>
    );
}
