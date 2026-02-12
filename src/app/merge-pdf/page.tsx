import { Metadata } from "next";
import { MergePdfClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Merge PDF Online - Combine Multiple PDF Files for Admissions",
    description: "Merge PDF files online for free. Combine academic certificates, marksheets, and documents for college admissions and government job applications instantly.",
    alternates: {
        canonical: '/merge-pdf',
    },
    keywords: ["merge pdf online", "combine pdf files free", "join pdf documents", "neet certificate merge", "jee main document combine", "college admission pdf merger", "imgverto"]
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
