import { Metadata } from "next";
import { CropImageClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
    title: 'Free Online Image Cropper | Crop JPG, PNG, WebP for Free | Imgverto',
    description: 'Crop your images online with precision for free. Define exact dimensions for SSC, UPSC, and other exam forms. Fast, secure, and privacy-focused image cropping by Imgverto.',
    alternates: {
        canonical: '/crop-image',
    },
    keywords: ["image cropper free", "crop photo online", "ssc photo crop tool", "online image crop", "crop png online", "imgverto"]
};

export default function CropImagePage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="Free Online Image Cropper"
                description="High-precision online tool to crop images and photos for documents and social media."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <CropImageClient />
        </>
    );
}
