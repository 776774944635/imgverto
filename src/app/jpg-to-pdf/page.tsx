import { Metadata } from "next";
import { JpgToPdfClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "JPG to PDF Online | Convert Images to PDF Free",
    description: "Convert JPG to PDF online for free. Imgverto allows you to merge multiple JPG images into a single PDF document instantly.",
    keywords: ["jpg to pdf online", "convert jpg to pdf", "jpeg to pdf", "image to pdf", "imgverto"]
};

export default function JpgToPdfPage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="JPG to PDF Online"
                description="Specially optimized tool to convert JPG and JPEG images to PDF files."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <JpgToPdfClient />
        </>
    );
}
