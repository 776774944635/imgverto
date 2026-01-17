import { Metadata } from "next";
import { ResizeImageClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Resize Image Online Free | Change Photo Dimensions",
    description: "Resize images online for free. Adjust height and width of JPG, PNG, and WebP photos with our easy-to-use image resizer. Perfect for social media and prints.",
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
