import { Metadata } from "next";
import { MergePdfClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Merge PDF Files Online Free | Combine PDF & PDF Merger",
    description: "Merge PDF files online for free with Imgverto. Combine multiple PDF documents into one easily and securely without registration.",
    keywords: ["merge pdf files online free", "combine pdf", "pdf merger", "join pdf", "imgverto"]
};

export default function MergePdfPage() {
    return (
        <>
            <SchemaMarkup
                type="SoftwareApplication"
                name="Merge PDF Files Online Free"
                description="Combine multiple PDF documents into a single file easily."
                applicationCategory="MultimediaApplication"
                operatingSystem="Universal"
            />
            <MergePdfClient />
        </>
    );
}
