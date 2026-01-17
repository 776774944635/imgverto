import { Metadata } from "next";
import { ImageToPdfClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Image to PDF Converter Free | Convert JPG to PDF Online",
    description: "Use our free Image to PDF converter to turn your photos into documents. Convert JPG to PDF online securely without watermarks.",
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
