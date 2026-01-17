import { Metadata } from "next";
import { PdfToJpgClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "PDF to JPG Converter Online | Convert PDF to Image Free",
    description: "Convert PDF to JPG online for free. Imgverto allows you to extract pages from your PDF as high-quality JPEG images instantly and securely.",
    keywords: ["pdf to jpg converter online", "pdf to image", "convert pdf to jpg", "pdf to jpeg", "imgverto"]
};

export default function PdfToJpgPage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="PDF to JPG Converter Online"
                description="Extract pages from PDF files and save them as high-quality images."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <PdfToJpgClient />
        </>
    );
}
