import { Metadata } from "next";
import { PdfToJpgClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
    title: 'PDF to JPG Converter | Convert PDF Pages to Images for Free | Imgverto',
    description: 'Instantly transform your PDF document pages into high-resolution JPG images with Imgverto. Our free online converter is perfect for social media sharing and design work.',
    alternates: {
        canonical: '/pdf-to-jpg',
    },
    keywords: ["pdf to jpg converter online", "pdf to image", "convert pdf to jpg", "pdf to jpeg", "imgverto"]
};

export default function PdfToJpgPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <SchemaMarkup
                type="SoftwareApplication"
                name="PDF to JPG Converter Online"
                description="Extract pages from PDF files and save them as high-quality images."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <PdfToJpgClient />
        </div>
    );
}
