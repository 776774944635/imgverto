import { Metadata } from "next";
import { ResizeImageClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: 'Resize Image Online | Change Photo Dimensions for Free | Imgverto',
    description: 'Quickly resize your images online with Imgverto. Change height and width of JPG, PNG, and WebP files with precision and ease. Perfect for social media, web, and print.',
    alternates: {
        canonical: '/resize-image',
    },
    keywords: ["resize image online", "change photo dimensions", "image resizer free", "resize image for instagram", "imgverto"]
};

export default function ResizeImagePage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="Resize Image Online Free"
                description="Change image dimensions and height/width easily for social media and prints."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <ResizeImageClient />
        </>
    );
}
