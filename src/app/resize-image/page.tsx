import { Metadata } from "next";
import { ResizeImageClient } from "./client";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
    title: "Resize Image Online - Change Photo Dimensions for Exam Forms",
    description: "Resize images online for free. Change dimensions for NEET, JEE Main, SSC, and passport photos accurately. Lock aspect ratio for perfect proportions.",
    alternates: {
        canonical: '/resize-image',
    },
    keywords: ["resize image online", "change photo dimensions", "neet photo size", "jee main photo resize", "passport photo dimensions", "government job image resizer", "imgverto"]
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
