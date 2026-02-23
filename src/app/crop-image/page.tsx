import { Metadata } from "next";
import { CropImageClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Crop Image Online - Free Image Cropper for Exam Forms",
    description: "Crop your images online for free. Adjust dimensions for SSC, UPSC, and other application forms perfectly. Fast, secure, and preserves quality.",
    keywords: ["crop image online", "image cropper", "ssc photo crop", "upsc image cropper", "resize image for admission", "free online cropper", "imgverto"],
    alternates: {
        canonical: '/crop-image',
    },
};

export default function CropImagePage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="Free Online Image Cropper"
                description="Crop images precisely for official documents and social media."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <CropImageClient />
        </>
    );
}
