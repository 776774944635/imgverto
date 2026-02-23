import { Metadata } from "next";
import { JpgToPdfClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "JPG to PDF Online - Convert Images to PDF for Exams",
    description: "Convert JPG to PDF online for free. Perfect for NEET, JEE, and SSC application forms. Easy to use, secure, and high-quality image to PDF conversion.",
    alternates: {
        canonical: '/jpg-to-pdf',
    },
    keywords: ["jpg to pdf online", "convert jpg to pdf", "neet photo resize", "jee main photo upload", "ssc chsl photo size", "government job form pdf", "imgverto"]
};

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function JpgToPdfPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <SchemaMarkup
                type="SoftwareApplication"
                name="JPG to PDF Online"
                description="Specially optimized tool to convert JPG and JPEG images to PDF files."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <JpgToPdfClient />
        </div>
    );
}
